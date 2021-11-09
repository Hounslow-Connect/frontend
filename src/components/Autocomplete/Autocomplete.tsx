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
  storeValueField?: string;
  defaultValue?: string;
  defaultText?: string;
  storeTextField?: string;
  store: any;
  multiSelect?: boolean;
}

const Autocomplete: React.FunctionComponent<IProps> = ({
  endpointEntity,
  filterKey = 'name',
  store,
  storeValueField = '',
  defaultValue = '',
  defaultText = '',
  storeTextField = '',
  multiSelect = false,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, toggleLoading] = useState(false);
  const [value, setAutocompleKeywordValue] = useState('');
  const autocompeleteInputField = useRef<HTMLInputElement>(null);

  const onSuggestionsFetchRequested = (inputValue: any, callback: any) => {
    console.log('[onSuggestionsFetchRequested] --> inputValue: ', inputValue);
    toggleLoading(true);

    const suggestions: any = getSuggestions(inputValue);

    suggestions
      .then((res: any) => {
        console.log('[onSuggestionsFetchRequested] --> suggestions then:', res);
        toggleLoading(false);
        setSuggestions(res);
        callback(res);
      })
      .catch(() => {
        toggleLoading(false);
      });
  };

  const getSuggestions = (value: string) => {
    return new Promise<void>((resolve, reject) => {
      const inputValue = value
        .toString()
        .trim()
        .toLowerCase();
      const inputLength = inputValue.length;

      axios
        .get(`${apiBase}/${endpointEntity}?filter[${filterKey}]=${inputValue}`)
        .then(res => {
          const suggestions = get(res, 'data.data', '');
          let result = [] as any;

          if (suggestions.length) {
            let filteredList = [] as any;

            filteredList = suggestions.map((item: any) => ({
              value: item.id,
              label: item.name,
            }));

            result = inputLength === 0 ? [] : filteredList;
          }
          resolve(result);
        })
        .catch(err => {
          reject();
        });
    });
  };

  const resetStoredAutocompleteData = () => {
    console.log('[resetStoredAutocompleteData] -->');

    if (storeValueField) {
      store.handleInput(storeValueField, null);
    }
    store.handleInput(storeTextField, null);
    setAutocompleKeywordValue('');
    if (autocompeleteInputField.current) {
      autocompeleteInputField.current.disabled = false;
    }
    if (autocompeleteInputField.current) {
      autocompeleteInputField.current.focus();
    }
    if (defaultValue) {
      defaultValue = '';
    }
  };

  // Runs once on render
  useEffect(() => {
    const suggestions: any = getSuggestions(value);

    suggestions
      .then((res: any) => {
        setSuggestions(res);
      })
      .catch(() => {});

    // If an option was perviously selected and stored, then retrieve the option and show
    if (defaultValue && value === '') {
      setAutocompleKeywordValue(defaultValue);
      if (defaultText) {
        setAutocompleKeywordValue(defaultText);
      }
      if (defaultText) {
        store.handleInput(storeTextField, defaultText);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (newValue: any, { action }: any) => {
    console.log(
      '[handleInputChange] --> newValue',
      newValue,
      'action type:',
      action.toString(),
      'value: ',
      value
    );

    if (action && action === 'select-option') {
      if (storeValueField) {
        setAutocompleKeywordValue(newValue.value);
      } else {
        if (storeTextField) {
          setAutocompleKeywordValue(newValue.label);
        }
      }

      if (storeValueField) {
        store.handleInput(storeValueField, newValue.value);
      }
      if (storeTextField) {
        store.handleInput(storeTextField, newValue.label);
      }
    }

    if (action && action === 'clear') {
      resetStoredAutocompleteData();
    }
  };

  const handleInputStates = (newValue: any, { action }: any) => {
    console.log(
      '[handleInputStates] --> newValue',
      newValue,
      'action type:',
      action.toString(),
      'defaultText value:',
      defaultText,
      'value: ',
      value
    );

    if (action && (action === 'input-blur' || action === 'input-change') && value === '') {
      resetStoredAutocompleteData();
      return;
    }
    if (action && action === 'input-change' && newValue === '') {
      resetStoredAutocompleteData();
      return;
    }
  };

  return (
    <div className={cx('autocomplete__wrapper relative')}>
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
        classNamePrefix="react-select"
        className="react-select-container"
      />
    </div>
  );
};

export default observer(Autocomplete);
