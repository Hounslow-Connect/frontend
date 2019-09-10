import React, { ChangeEvent } from 'react';
import './Input.scss';

interface IProps {
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  className?: string;
}

const Input: React.FunctionComponent<IProps> = ({ placeholder, onChange, id, className }) => (
  <input
    className={`input ${className}`}
    type=" text"
    placeholder={placeholder}
    onChange={onChange}
    id={id}
  />
);

export default Input;
