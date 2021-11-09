import React, { useState, useEffect, useRef } from 'react';
import { EventEmitter } from '../../utils/events';
import { observer } from 'mobx-react';
import Select from 'react-select';
import cx from 'classnames';
import _first from 'lodash/first';

import '../Autocomplete/Autocomplete.scss';
interface IProps {
  storeValueField?: string;
  defaultValues?: any;
  defaultText?: string;
  options?: [];
  storeTextField?: string;
  store: any;
  multiSelect?: boolean;
  clickHandler: () => void;
}

const StaticAutocomplete: React.FunctionComponent<IProps> = ({
  options,
  store,
  storeValueField = '',
  defaultValues = [],
  defaultText = '',
  storeTextField = '',
  multiSelect = false,
  clickHandler,
}) => {
  // @ts-ignore
  EventEmitter.subscribe('filtersCleared', () => resetStoredAutocompleteData());

  const [suggestions, setSuggestions] = useState([]);
  const [value, setAutocompleKeywordValue] = useState([]);
  const autocompeleteInputField = useRef<HTMLInputElement>(null);

  const resetStoredAutocompleteData = () => {
    if (storeValueField) {
      store.handleInput(storeValueField, null);
    }
    if (storeTextField) {
      store.handleInput(storeTextField, null);
    }

    setAutocompleKeywordValue([]);
    if (autocompeleteInputField.current) {
      autocompeleteInputField.current.disabled = false;
    }
    if (autocompeleteInputField.current) {
      autocompeleteInputField.current.focus();
    }
    if (defaultValues) {
      defaultValues = [];
    }
  };

  // Runs once on render
  useEffect(() => {
    if (options && options.length) {
      const refactoredOptions: any = options.map((option: any) => ({
        value: option.value,
        label: option.text,
      }));
      if (refactoredOptions.length) {
        setSuggestions(refactoredOptions);
      }
    }

    // @ts-ignore
    setAutocompleKeywordValue(defaultValues);

    return () => {
      setAutocompleKeywordValue([]);
      setSuggestions([]);
      // @ts-ignore
      EventEmitter.unsubscribe('filtersCleared');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (newValue: any, { action }: any) => {
    let inputValue: any = {};

    setAutocompleKeywordValue(newValue);

    if (multiSelect) {
      if (newValue.length) {
        inputValue.value = newValue.map((value: any) => value.value).join(',');
        inputValue.label = newValue.map((value: any) => value.label).join(',');
      }
    } else {
      inputValue = _first(newValue);
    }

    if (action && (action === 'select-option' || action === 'remove-value')) {
      if (storeValueField) {
        store.handleInput(storeValueField, inputValue.value);
      }
      if (storeTextField) {
        store.handleInput(storeTextField, inputValue.label);
      }
    }

    if (action && action === 'clear') {
      resetStoredAutocompleteData();
    }

    clickHandler();
  };

  const getInputName = () => {
    return storeTextField && storeTextField[0]
      ? storeTextField[0].toUpperCase() + storeTextField.substr(1)
      : 'option';
  };

  return (
    <div className={cx('autocomplete__wrapper relative')}>
      <Select
        value={value}
        isMulti={multiSelect}
        options={suggestions}
        onChange={handleInputChange}
        isClearable={true}
        placeholder={`Select ${getInputName()}`}
        classNamePrefix="react-select"
        className="react-select-container"
      />
    </div>
  );
};

export default observer(StaticAutocomplete);
