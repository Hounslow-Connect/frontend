import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';

import './Select.scss';

interface IOption {
  value: string;
  text: string;
}

interface IProps {
  options: IOption[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  placeholder: string;
  id: string;
  disabled?: boolean;
  value?: string | '';
  showDefaultValue?: boolean;
}
/* tslint:disable */
const Select: React.FunctionComponent<IProps> = ({
  options,
  onChange,
  className,
  placeholder,
  id,
  disabled,
  value,
  showDefaultValue = true,
}) => (
  <select
    className={`select ${className}`}
    onChange={onChange}
    id={id}
    disabled={disabled}
    value={value}
  >
    <option value={placeholder} disabled={showDefaultValue} hidden={showDefaultValue}>
      {placeholder}
    </option>
    {options.map(({ value, text }) => (
      <option key={value} value={value}>
        {text}
      </option>
    ))}
  </select>
);
/* tslint:enable */

export default observer(Select);
