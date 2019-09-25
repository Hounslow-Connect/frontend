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
  required?: boolean;
  type?: 'text' | 'email' | 'tel';
  pattern?: string;
}

const Input: React.FunctionComponent<IProps> = ({
  placeholder,
  onChange,
  id,
  className,
  value,
  fullWidth,
  required,
  type = 'text',
  pattern,
}) => (
  <input
    className={cx(
      {
        'input--full-width': fullWidth,
      },
      `input ${className}`
    )}
    placeholder={placeholder}
    onChange={onChange}
    id={id}
    value={value}
    required={required}
    type={type}
    pattern={pattern}
  />
);

export default Input;
