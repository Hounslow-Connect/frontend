import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import '../CTAButton/CTAButton.scss';

interface IProps extends RouteComponentProps {
  text: string;
  to?: string;
  size?: string;
  icon?: IconName;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  alt?: boolean;
  onClick?: () => void;
  name?: string;
  href?: string;
}

/* tslint:disable */
const ButtonCTA: React.FC<IProps> = ({
  text,
  to,
  size = 'medium',
  icon,
  disabled = false,
  alt = false,
  type = 'button',
  name,
  href,
  onClick,
}) => (
  <a href={href}>
    <button
      className={cx('button', 'button__CTA', `button__CTA--${name}`)}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={cx('button__CTA__icon', {
            [`button__CTA__icon--${size}`]: !alt,
          })}
        />
      )}
      {text}
    </button>
  </a>
);

/* tslint:enable */
export default withRouter(observer(ButtonCTA));
