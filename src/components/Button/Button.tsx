import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import React from 'react';

import './Button.scss';

interface IProps {
  text: string;
  size?: string;
  icon?: IconName;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  alt?: boolean;
  category?: boolean;
  header?: boolean;
  burgerMenu?: boolean;
  light?: boolean;
  onClick?: () => void;
}

const Button: React.FunctionComponent<IProps> = ({
  text,
  size = 'medium',
  icon,
  disabled = false,
  alt = false,
  type = 'button',
  category = false,
  header = false,
  burgerMenu = false,
  light = false,
  onClick,
}) => (
  <button
    className={cx('button', `button--${size}`, {
      button__alt: alt,
      [`button__alt--${size}`]: alt,
      'button__category button__alt button__alt--medium': category,
      button__header: header,
      'buton__burger-menu': burgerMenu,
      'button--light': light,
    })}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >
    {text}
    {icon && (
      <FontAwesomeIcon
        icon={icon}
        className={cx('button__icon', {
          [`button__icon--${size}`]: !alt,
        })}
      />
    )}
  </button>
);

export default Button;
