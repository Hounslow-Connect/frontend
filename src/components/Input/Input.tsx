import React, { ChangeEvent } from 'react';
import './Input.scss';
import cx from 'classnames';

interface IProps {
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value: string;
  className?: string;
  fullWidth?: boolean;
}

const Input: React.FunctionComponent<IProps> = ({
  placeholder,
  onChange,
  id,
  className,
  value,
  fullWidth,
}) => (
  <input
    className={cx(
      {
        'input--full-width': fullWidth,
      },
      `input ${className}`
    )}
    type=" text"
    placeholder={placeholder}
    onChange={onChange}
    id={id}
    value={value}
  />
);

export default Input;
