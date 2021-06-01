import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import cx from 'classnames';
import get from 'lodash/get';
import { apiBase } from '../../config/api';

import './Autocomplete.scss';
interface IProps {
  endpointEntity: string;
  filterKey?: string;
  hiddenField?: string;
  defaultValue?: string;
  defaultText?: string;
  defaultTextStoreField?: string;
  store: any;
  multiSelect?: boolean
}


const Autocomplete: React.FunctionComponent<IProps> = ({ endpointEntity, filterKey = 'name', store, hiddenField = '', defaultValue = '',  defaultText = '', defaultTextStoreField = '', multiSelect = false}) => {
    
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, toggleLoading] = useState(false);
    const [value, setAutocompleKeywordValue] = useState('');
    const hiddenInputField = useRef<HTMLInputElement>(null);
    const autocompeleteInputField = useRef<HTMLInputElement>(null);


    const onSuggestionsFetchRequested =  (inputValue: any, callback: any) => {
        console.log('[onSuggestionsFetchRequested] --> inputValue: ', inputValue);
        toggleLoading(true)
        
        const suggestions: any = getSuggestions(inputValue)

        suggestions.then((res: any) => {
            console.log('[onSuggestionsFetchRequested] --> suggestions then:', res);
            toggleLoading(false)
            setSuggestions(res)
            callback(res);
        }).catch(() => {
            toggleLoading(false)
        })
    };

    const getSuggestions = (value: string) => {
        return new Promise<void>((resolve, reject) => {
            const inputValue = value.toString().trim().toLowerCase();
            const inputLength = inputValue.length;

            axios.get(`${apiBase}/${endpointEntity}?filter[${filterKey}]=${inputValue}`).then(res => {
                const suggestions = get(res, 'data.data', '');
                let result = [] as any;
                
                if(suggestions.length) {
                    let filteredList = [] as any;
                
                    filteredList = suggestions.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                    }));

                    result = (inputLength === 0 ? [] : filteredList)
                }
                resolve(result)
            }).catch(err => {
                reject()
            })
        })
    };

    const resetStoredAutocompleteData = () => {
        console.log('[resetStoredAutocompleteData] -->');
        
        store.handleInput(hiddenField, null)
        store.handleInput(defaultTextStoreField, null)
        if(hiddenInputField.current) hiddenInputField.current.value = ''
        setAutocompleKeywordValue('')
        if(autocompeleteInputField.current) autocompeleteInputField.current.disabled = false
        if(autocompeleteInputField.current) autocompeleteInputField.current.focus()
        if(defaultValue) defaultValue = ''
    }
 
     //Runs once on render
     useEffect(() => {
        const suggestions: any = getSuggestions(value)

        suggestions.then((res: any) => {
            setSuggestions(res)
        }).catch(() => {})

        // If an option was perviously selected and stored, then retrieve the option and show
        if(defaultValue && value === '') {
            if(defaultText) setAutocompleKeywordValue(defaultText)
            if(defaultText) store.handleInput(defaultTextStoreField, defaultText)
        }     
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     const handleInputChange = (newValue: any, {action}: any) => {
         console.log('[handleInputChange] --> newValue', newValue, 'action type:', action.toString());

        if (action && action === 'select-option' && hiddenField && hiddenInputField.current) {
            setAutocompleKeywordValue(newValue.value)
            hiddenInputField.current.value = newValue.value
            store.handleInput(hiddenField, hiddenInputField.current.value)
            store.handleInput(defaultTextStoreField, newValue.label)
        }

        if(action && action === 'clear') {
            resetStoredAutocompleteData()
        }
     }

     const handleInputStates = (newValue: any, {action}: any) => {
         console.log('[handleInputStates] --> newValue', newValue, 'action type:', action.toString(), 'defaultText value:', defaultText);
        
        if(action && action === 'input-blur' && value === '') {
           resetStoredAutocompleteData()
           return
        }
     }

      
    return (
        <div className={cx('autocomplete__wrapper relative')} >
            <AsyncSelect
                defaultInputValue={defaultText}
                isMulti={multiSelect}
                cacheOptions={true}
                loadOptions={onSuggestionsFetchRequested}
                defaultOptions={suggestions}
                onChange={handleInputChange}
                onInputChange={handleInputStates}
                isLoading={isLoading}
                isClearable={true}
                placeholder={`Type to search ${endpointEntity}`}
                classNamePrefix='react-select'
                className='react-select-container'
            />

            {hiddenField !== '' && <input type="hidden" name={hiddenField} id={hiddenField} ref={hiddenInputField} value={get(store, 'referral.organisation_taxonomy_id') || ''} />}
        </div>
      );
}

export default observer(Autocomplete);
