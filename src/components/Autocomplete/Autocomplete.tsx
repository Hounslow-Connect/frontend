import React, { useState, useEffect } from 'react';
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
}

const Autocomplete: React.FunctionComponent<IProps> = ({ endpoint, filterKey = 'name' }) => {
    
    const [suggestions, setSuggestions] = useState([]);
    const [value, setAutocompleKeywordValue] = useState('');
    
    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        keys: [ filterKey ]
      };

    const fuse = new Fuse(suggestions, fuseOptions);

    // Autosuggest will call this function every time you need to update suggestions.
    const onSuggestionsFetchRequested =  async (value: any): Promise<void> => {
        console.log('[onSuggestionsFetchRequested] value:', value);
        const suggestions: any = await getSuggestions(value)

        console.log('suggestions', suggestions)
        
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
        return suggestion.item.name
    });

    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = ({value} :  {value: string}) => {
        return new Promise<void>((resolve, reject) => {
            console.log('[getSuggestions] value', value);
            const inputValue = value.toString().trim().toLowerCase();
            const inputLength = inputValue.length;

            axios.get(`${apiBase}/organisations?filter[name]=${inputValue}`).then(res => {
                const suggestions = get(res, 'data.data', '');
                const orderedList = orderBy(suggestions, 'name', 'asc');
    
                let filteredList = [] as any;
                filteredList = orderedList.filter((org: any) => org.name !== 'Family/Friend');
            
                filteredList = filteredList.map((org: any) => ({
                  value: org.id,
                  name: org.name,
                }));
                console.log('filteredList', filteredList)
                
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
        onChange: (e: any, newValue: any) => {
            console.log('newValue', newValue)
            if(newValue.newValue) setAutocompleKeywordValue(newValue.newValue)
        },
        className: 'react-input',
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
        </div>
      );
}

export default observer(Autocomplete);
