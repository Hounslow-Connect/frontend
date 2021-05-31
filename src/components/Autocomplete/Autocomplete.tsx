import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import Fuse from 'fuse.js'
import axios from 'axios';
import cx from 'classnames';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { apiBase } from '../../config/api';
import Autosuggest from 'react-autosuggest'; //docs: https://www.npmjs.com/package/react-autosuggest

import './Autocomplete.scss';
interface IProps {
  endpointEntity: string;
  filterKey?: string;
  hiddenField?: string;
  defaultValue?: string;
  defaultText?: string;
  defaultTextStoreField?: string;
  store: any;
}


const Autocomplete: React.FunctionComponent<IProps> = ({ endpointEntity, filterKey = 'name', store, hiddenField = '', defaultValue = '',  defaultText = '', defaultTextStoreField = '' }) => {
    
    const [suggestions, setSuggestions] = useState([]);
    const [value, setAutocompleKeywordValue] = useState('');
    const hiddenInputField = useRef<HTMLInputElement>(null);
    const autocompeleteInputField = useRef<HTMLInputElement>(null);

    const fuseOptions = {
        keys: [ filterKey ]
    };

    const fuse = new Fuse(suggestions, fuseOptions);

    // Autosuggest will call this function every time you need to update suggestions.
    const onSuggestionsFetchRequested =  async (value: any): Promise<void> => {
        const suggestions: any = await getSuggestions(value)
        setSuggestions(suggestions)
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    const getSuggestionValue = ((suggestion: any) => {
        if(suggestion && suggestion.item.value) {
            if(hiddenField && hiddenInputField.current) {
                hiddenInputField.current.value = suggestion.item.value
            }
        }

        return suggestion.item.name
    });

    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = ({value} :  {value: string}) => {
        return new Promise<void>((resolve, reject) => {
            const inputValue = value.toString().trim().toLowerCase();
            const inputLength = inputValue.length;

            axios.get(`${apiBase}/${endpointEntity}?filter[${filterKey}]=${inputValue}`).then(res => {
                const suggestions = get(res, 'data.data', '');
                const orderedList = orderBy(suggestions, 'name', 'asc');
    
                let filteredList = [] as any;
            
                filteredList = orderedList.map((item: any) => ({
                    value: item.id,
                    name: item.name,
                }));
                
                fuse.setCollection(filteredList)
    
                let result = [] as any;
                result = (inputLength === 0 ? [] : fuse.search(inputValue))
                resolve(result)
            }).catch(err => {
                reject()
            })
        })
    };

    const renderSuggestion = (suggestion: any) => (
        <div>{suggestion.item.name}</div>
    );

    const resetAutocompleteField = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('resetAutocompleteField');
        if(e) e.preventDefault()
        
        store.handleInput(hiddenField, null)
        store.handleInput(defaultTextStoreField, null)
        if(hiddenInputField.current) hiddenInputField.current.value = ''
        setAutocompleKeywordValue('')
        if(autocompeleteInputField.current) autocompeleteInputField.current.disabled = false
        if(autocompeleteInputField.current) autocompeleteInputField.current.focus()
        if(defaultValue) defaultValue = ''
    }
 
     //Runs on render and update and skips if suggestions variable hasnt changed
     useEffect(() => {
        // If an option was perviously selected and stored, then retrieve the option and show the 'display' value
        if(defaultValue && value === '') {
            if(autocompeleteInputField.current) autocompeleteInputField.current.disabled = true

            if(defaultText) setAutocompleKeywordValue(defaultText)
            if(defaultText) store.handleInput(defaultTextStoreField, defaultText)
            // console.log('get default value from endpoint');
            
            // axios.get(`${apiBase}/${endpointEntity}?filter[id]=${defaultValue}`).then(res => {
            //     const data = get(res, 'data.data', '');
            //     setAutocompleKeywordValue(data[0].name)
            // }).catch(() => {
            //     if(autocompeleteInputField.current) autocompeleteInputField.current.disabled = false
            // })
        }     
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
 
     const inputProps: any = {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>, newValue: any) => {
            setAutocompleKeywordValue(newValue.newValue)
            if (newValue.newValue !== '' && hiddenField && hiddenInputField.current && hiddenInputField.current.value !== '') {
                if(autocompeleteInputField.current) autocompeleteInputField.current.disabled = true
                
                store.handleInput(hiddenField, hiddenInputField.current.value)
                store.handleInput(defaultTextStoreField, newValue.newValue)
                return
            }

            store.handleInput(hiddenField, null)
            store.handleInput(defaultTextStoreField, null)
        },
        onBlur: () => {
            if(hiddenField && hiddenInputField.current && hiddenInputField.current.value === '') {
                setAutocompleKeywordValue('')
                return
            }
        },
        className: 'input__autocomplete input',
        placeholder: `Type to search ${endpointEntity}`,
        type: 'text',
        ref: autocompeleteInputField
    };
      
    return (
        <div className={cx('relative')} >
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                
            />
            {hiddenInputField.current && hiddenInputField.current.value !== '' && <button onClick={resetAutocompleteField} className={'react-autosuggest__toggle-btn'}>Change</button>}
            {hiddenField !== '' && <input type="hidden" name={hiddenField} id={hiddenField} ref={hiddenInputField} value={get(store, 'referral.organisation_taxonomy_id') || ''} />}
        </div>
      );
}

export default observer(Autocomplete);
