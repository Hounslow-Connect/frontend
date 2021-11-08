import React from 'react';

import './Checkbox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';

interface IProps {
  label: string;
  id: string;
  onChange?: () => void;
  checked: boolean;
  className?: string;
  aria?: string;
}

const Checkbox: React.FunctionComponent<IProps> = (props: IProps) => {
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      if (props.onChange) {
        props.onChange();
      }
    }
  };

  return (
    <div className={`checkbox ${props.className}`}>
      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        checked={props.checked}
        onChange={props.onChange}
        tabIndex={-1}
        aria-label={props.aria}
      />
      <label htmlFor={props.id} tabIndex={0} onKeyPress={handleKeyPress}>
        <span>
          <span>
            <FontAwesomeIcon icon="check" />
          </span>
        </span>
        {props.label}
      </label>
    </div>
  );
};

export default observer(Checkbox);
