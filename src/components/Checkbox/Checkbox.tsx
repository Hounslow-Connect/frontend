import React, { ReactNode, FormEvent } from 'react';

import './Checkbox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';

interface IProps {
  label: string;
  id: string;
  onChange?: any;
  checked: boolean;
}

const Checkbox: React.FunctionComponent<IProps> = ({ label, id, onChange, checked }) => (
  <div className="checkbox">
    {console.log(checked)}
    <input type="checkbox" id={id} name={id} checked={checked} onChange={onChange} />
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
