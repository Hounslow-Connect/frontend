import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import Select from 'react-select';
import cx from 'classnames';
import _first from 'lodash/first';

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
        let inputValue:any = _first(newValue)
        if (action && action === 'select-option') {
            if(storeValueField) {
                setAutocompleKeywordValue(inputValue.value)
            } else {
                if(storeTextField) setAutocompleKeywordValue(inputValue.label)
            }
            
            if(storeValueField)  store.handleInput(storeValueField, inputValue.value)
            if(storeTextField) store.handleInput(storeTextField, inputValue.label)
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
                onChange={handleInputChange}
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
