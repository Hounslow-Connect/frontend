import React, { ReactChildren, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import './Accordian.scss';

interface IProps {
  children: ReactChildren | JSX.Element[];
  title: string;
  className?: string;
}

const Accordian: React.FunctionComponent<IProps> = ({ children, title, className }) => {
  const [open, toggleAccordian] = useState(false);

  return (
    <div className={className}>
      <button
        className="flex"
        onClick={() => toggleAccordian(!open)}
        aria-expanded={open}
        aria-controls="accordian-content"
        id="accordian-header"
      >
        <h4>{title}</h4>
        <FontAwesomeIcon
          icon="chevron-down"
          className={cx('accordian-icon', {
            'accordian-icon--open': open,
          })}
        />
      </button>
      {open && (
        <div
          className="accordian-content"
          id="accordian-content"
          aria-labelledby="accordian-header"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordian;
