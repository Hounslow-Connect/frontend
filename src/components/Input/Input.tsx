import React, { ChangeEvent } from 'react';
import './Input.scss';

interface IProps {
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<IProps> = ({ placeholder, onChange }) => (
  <input className="input" type=" text" placeholder={placeholder} onChange={onChange} />
);

export default Input;
