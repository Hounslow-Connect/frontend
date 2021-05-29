import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import Fuse from 'fuse.js'
import axios from 'axios';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import { apiBase } from '../../config/api';
import Autosuggest from 'react-autosuggest'; //docs: https://www.npmjs.com/package/react-autosuggest

import './Autocomplete.scss';
interface IProps {
  endpoint: string;
  filterKey?: string;
  hiddenField?: string;
  defaultValue?: string;
  store: any;
}


const Autocomplete: React.FunctionComponent<IProps> = ({ endpoint, filterKey = 'name', store, hiddenField = '', defaultValue = '' }) => {
    
    const [suggestions, setSuggestions] = useState([]);
    const [value, setAutocompleKeywordValue] = useState('');
    const hiddenInputField = useRef<HTMLInputElement>(null);

    // If an option was perviously selected and stored, then retrieve the option and show the 'display' value
    if(defaultValue !== '') {
        axios.get(`${apiBase}${endpoint}?filter[id]=${defaultValue}`).then(res => {
            const data = get(res, 'data.data', '');
            setAutocompleKeywordValue(data[0].name)
        }).catch(err => {})
    }
    
    
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
        if(hiddenField && hiddenInputField.current) {
            hiddenInputField.current.value = suggestion.item.value
        }
        
        return suggestion.item.name
    });

    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = ({value} :  {value: string}) => {
        return new Promise<void>((resolve, reject) => {
            const inputValue = value.toString().trim().toLowerCase();
            const inputLength = inputValue.length;

            axios.get(`${apiBase}${endpoint}?filter[${filterKey}]=${inputValue}`).then(res => {
                const suggestions = get(res, 'data.data', '');
                const orderedList = orderBy(suggestions, 'name', 'asc');
    
                let filteredList = [] as any;
                filteredList = orderedList.filter((org: any) => org.name !== 'Family/Friend');
            
                filteredList = filteredList.map((org: any) => ({
                  value: org.id,
                  name: org.name,
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
 
     //Runs on render and update and skips if suggestions variable hasnt changed
     useEffect(() => {
         
     }, [suggestions]);
 
     const inputProps: any = {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>, newValue: any) => {
            console.log('onchange');
            
            setAutocompleKeywordValue(newValue.newValue)

            if (newValue.newValue !== '' && hiddenField && hiddenInputField.current && hiddenInputField.current.value !== '') {
                store.handleInput(hiddenField, hiddenInputField.current.value)
            }
        },
        onBlur: () => {
            console.log('onBlur, hiddenInputField.current', hiddenInputField.current);
            if(hiddenField && hiddenInputField.current && hiddenInputField.current.value === '') {
                console.log('resetkeywordstae ');
                
                setAutocompleKeywordValue('')
            }
        },
        className: 'input',
        placeholder: 'Type to search',
        type: 'text'
    };
      
    return (
        <div>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                
            />
            {hiddenField !== '' && <input type="hidden" name={hiddenField} id={hiddenField} ref={hiddenInputField} value={get(store, 'referral.organisation_taxonomy_id') || ''} />}
        </div>
      );
}

export default observer(Autocomplete);
