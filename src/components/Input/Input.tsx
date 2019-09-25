import React, { ChangeEvent } from 'react';
import './Input.scss';
import cx from 'classnames';

interface IProps {
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: any;
  id: string;
  value: string;
  className?: string;
  fullWidth?: boolean;
  required?: boolean;
  type?: 'text' | 'email' | 'tel';
  pattern?: string;
  error?: boolean;
  errorMessage?: string;
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
  onBlur,
  error,
  errorMessage,
}) => (
  <div className={cx({ 'input--error': error })}>
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
      onBlur={onBlur}
    />
    <p
      className={cx('input__error-message', {
        'input__error-message--show': error,
      })}
    >
      {errorMessage}
    </p>
  </div>
);

export default Input;
