import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import Select from 'react-select';
import cx from 'classnames';

import './Autocomplete.scss';
interface IProps {
  storeValueField?: string;
  defaultValue?: string;
  defaultText?: string;
  options?: [];
  storeTextField?: string;
  store: any;
  multiSelect?: boolean
}


const StaticAutocomplete: React.FunctionComponent<IProps> = ({ options, store, storeValueField = '', defaultValue = '',  defaultText = '', storeTextField = '', multiSelect = false}) => {
    
    const [suggestions, setSuggestions] = useState([]);
    const [value, setAutocompleKeywordValue] = useState('');
    const autocompeleteInputField = useRef<HTMLInputElement>(null);

    // const onSuggestionsFetchRequested =  (inputValue: any, callback: any) => {
    //     console.log('[onSuggestionsFetchRequested] --> inputValue: ', inputValue);
    //     toggleLoading(true)
        
    //     const suggestions: any = getSuggestions(inputValue)

    //     suggestions.then((res: any) => {
    //         console.log('[onSuggestionsFetchRequested] --> suggestions then:', res);
    //         toggleLoading(false)
    //         setSuggestions(res)
    //         callback(res);
    //     }).catch(() => {
    //         toggleLoading(false)
    //     })
    // };

    // const getSuggestions = (value: string) => {
    //     return new Promise<void>((resolve, reject) => {
    //         const inputValue = value.toString().trim().toLowerCase();
    //         const inputLength = inputValue.length;

    //         axios.get(`${apiBase}/${endpointEntity}?filter[${filterKey}]=${inputValue}`).then(res => {
    //             const suggestions = get(res, 'data.data', '');
    //             let result = [] as any;
                
    //             if(suggestions.length) {
    //                 let filteredList = [] as any;
                
    //                 filteredList = suggestions.map((item: any) => ({
    //                     value: item.id,
    //                     label: item.name,
    //                 }));

    //                 result = (inputLength === 0 ? [] : filteredList)
    //             }
    //             resolve(result)
    //         }).catch(err => {
    //             reject()
    //         })
    //     })
    // };

    const resetStoredAutocompleteData = () => {
        console.log('[resetStoredAutocompleteData] -->');
        
        if(storeValueField) store.handleInput(storeValueField, null)
        store.handleInput(storeTextField, null)
        setAutocompleKeywordValue('')
        if(autocompeleteInputField.current) autocompeleteInputField.current.disabled = false
        if(autocompeleteInputField.current) autocompeleteInputField.current.focus()
        if(defaultValue) defaultValue = ''
    }
 
     //Runs once on render
     useEffect(() => {
        if(options && options.length) {
            let refactoredOptions: any = options.map((option: any) => { return { value: option.value, label: option.text } })

            if(refactoredOptions.length) {
                setSuggestions(refactoredOptions)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     const handleInputChange = (newValue: any, {action}: any) => {
         console.log('[handleInputChange] --> newValue', newValue, 'action type:', action.toString(), 'value: ', value);

        if (action && action === 'select-option') {
            if(storeValueField) {
                setAutocompleKeywordValue(newValue.value)
            } else {
                if(storeTextField) setAutocompleKeywordValue(newValue.label)
            }
            
            if(storeValueField)  store.handleInput(storeValueField, newValue.value)
            if(storeTextField) store.handleInput(storeTextField, newValue.label)
        }

        if(action && action === 'clear') {
            resetStoredAutocompleteData()
        }
     }

     const handleInputStates = (newValue: any, {action}: any) => {
         console.log('[handleInputStates] --> newValue', newValue, 'action type:', action.toString(), 'defaultText value:', defaultText, 'value: ', value);
        
        if(action && (action === 'input-blur' || action === 'input-change') && value === '') {
           resetStoredAutocompleteData()
           return
        }
        if(action &&  action === 'input-change' && newValue === '') {
           resetStoredAutocompleteData()
           return
        }
     }

     console.log('suggestions', suggestions);
     
      
    return (
        <div className={cx('autocomplete__wrapper relative')} >
            <Select
                // defaultInputValue={defaultText}
                isMulti={multiSelect}
                // loadOptions={onSuggestionsFetchRequested}
                options={suggestions}
                // onChange={handleInputChange}
                // onInputChange={handleInputStates}
                isClearable={true}
                placeholder={`Type to search`}
                classNamePrefix='react-select'
                className='react-select-container'
            />
        </div>
      );
}

export default observer(StaticAutocomplete);
