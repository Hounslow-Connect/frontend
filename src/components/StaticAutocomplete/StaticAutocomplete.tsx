import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import Select from 'react-select';
import cx from 'classnames';
import _first from 'lodash/first';

import './Autocomplete.scss';
interface IProps {
  storeValueField?: string;
  defaultValues?: any;
  defaultText?: string;
  options?: [];
  storeTextField?: string;
  store: any;
  multiSelect?: boolean;
  clickHandler: () => void
}


const StaticAutocomplete: React.FunctionComponent<IProps> = ({ options, store, storeValueField = '', defaultValues = [],  defaultText = '', storeTextField = '', multiSelect = false, clickHandler}) => {
    
    const [suggestions, setSuggestions] = useState([]);
    const [value, setAutocompleKeywordValue] = useState([]);
    const autocompeleteInputField = useRef<HTMLInputElement>(null);

    const resetStoredAutocompleteData = () => {
        console.log('[resetStoredAutocompleteData] -->');
        
        if(storeValueField) store.handleInput(storeValueField, null)
        if(storeTextField) store.handleInput(storeTextField, null)

        setAutocompleKeywordValue([])
        if(autocompeleteInputField.current) autocompeleteInputField.current.disabled = false
        if(autocompeleteInputField.current) autocompeleteInputField.current.focus()
        if(defaultValues) defaultValues = []
    }
 
     //Runs once on render
     useEffect(() => {
        if(options && options.length) {
            let refactoredOptions: any = options.map((option: any) => { return { value: option.value, label: option.text } })
            if(refactoredOptions.length) {
                setSuggestions(refactoredOptions)
            }
        }

        console.log('defaultValues:', defaultValues);
        
        // @ts-ignore
        setAutocompleKeywordValue(defaultValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

     const handleInputChange = (newValue: any, {action}: any) => {
         console.log('[handleInputChange] --> newValue', newValue, 'action type:', action.toString(), 'value: ');
        let inputValue:any = {}

        setAutocompleKeywordValue(newValue)

        if(multiSelect) {
            if(newValue.length){
                inputValue.value = newValue.map((value: any) => { return value.value  } ).join(',')
                inputValue.label = newValue.map((value: any) => { return value.label  } ).join(',')
            }
        } else {
            inputValue = _first(newValue)
        }


        // console.log('[handleInputChange] --> final inputValue', inputValue);
        
        if (action && (action === 'select-option' || action === 'remove-value')) {
            if(storeValueField)  store.handleInput(storeValueField, inputValue.value)
            if(storeTextField) store.handleInput(storeTextField, inputValue.label)
        }

        if(action && action === 'clear') {
            resetStoredAutocompleteData()
        }

        clickHandler()
     }

     
    return (
        <div className={cx('autocomplete__wrapper relative')} >
            <Select
                value={value}
                isMulti={multiSelect}
                options={suggestions}
                onChange={handleInputChange}
                isClearable={true}
                placeholder={`Type to search`}
                classNamePrefix='react-select'
                className='react-select-container'
            />
        </div>
      );
}

export default observer(StaticAutocomplete);
