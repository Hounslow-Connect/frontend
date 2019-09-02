import React from 'react';
import './Input.scss';

interface IProps {
  placeholder?: string;
}

const Input: React.FunctionComponent<IProps> = ({ placeholder }) => (
  <input className="input" type=" text" placeholder={placeholder} />
);

export default Input;
