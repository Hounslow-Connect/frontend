import React, { ReactChildren, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import './Accordian.scss';

interface IProps {
  children: ReactChildren | JSX.Element[];
  title: string;
  className?: string;
}

export default class Accordian extends Component<IProps> {
  state = {
    open: false,
  };

  toggleAccordian = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { children, title, className } = this.props;
    const { open } = this.state;
    return (
      <div className={className}>
        <button
          className="flex"
          onClick={() => this.toggleAccordian()}
          aria-expanded={open}
          aria-controls="accordian-content"
          id="accordian-header"
        >
          {title}
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
  }
}
