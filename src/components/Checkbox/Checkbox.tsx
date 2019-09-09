import React, { ReactNode } from 'react';

import './Checkbox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  label: string;
  id: string;
}

const Checkbox: React.FunctionComponent<IProps> = ({ label, id }) => (
  <div className="checkbox">
    <input type="checkbox" id={id} />
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

export default Checkbox;
