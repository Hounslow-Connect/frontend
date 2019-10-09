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

const Checkbox: React.FunctionComponent<IProps> = ({
  label,
  id,
  onChange,
  checked,
  className,
  aria,
}) => (
  <div className={`checkbox ${className}`}>
    <input
      type="checkbox"
      id={id}
      name={id}
      checked={checked}
      onChange={onChange}
      aria-label={aria}
    />
    <label htmlFor={id}>
      <span>
        <span>
          <FontAwesomeIcon icon="check" />
        </span>
      </span>
      {label}
    </label>
  </div>
);

export default observer(Checkbox);
