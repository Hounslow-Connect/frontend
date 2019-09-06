import React, { ReactChildren, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    return (
      <div className={className}>
        <div className="flex" onClick={() => this.toggleAccordian()}>
          {title}
          <FontAwesomeIcon icon="chevron-down" className="accordian-icon" />
        </div>
        {this.state.open && <div className="accordian-content">{children}</div>}
      </div>
    );
  }
}
