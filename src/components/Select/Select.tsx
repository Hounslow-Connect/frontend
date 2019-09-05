import React from 'react';
import { observer } from 'mobx-react';

import './Select.scss';

interface IOption {
  value: string;
  text: string;
}

interface IProps {
  options: IOption[];
  onChange?: any;
  className?: any;
  placeholder: string;
  id: string;
}

const Select: React.FunctionComponent<IProps> = ({
  options,
  onChange,
  className,
  placeholder,
  id,
}) => (
  <select className={`select ${className}`} onChange={onChange} id={id}>
    <option value="" disabled={true} selected={true} hidden={true}>
      {placeholder}
    </option>
    {options.map(({ value, text }) => (
      <option key={value} value={value}>
        {text}
      </option>
    ))}
  </select>
);

export default observer(Select);
