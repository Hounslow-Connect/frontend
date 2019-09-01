import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import React from 'react';

import './Button.scss';

interface IProps {
  text: string;
  size?: string;
  icon?: string;
  disabled?: boolean;
  secondary?: boolean;
  secondaryType?: string;
}

const Button: React.FunctionComponent<IProps> = ({
  text,
  size = 'medium',
  icon,
  disabled = false,
  secondary = false,
  secondaryType = 'light',
}) => (
  <button
    className={cx('button', `button--${size}`, {
      ['button__secondary']: secondary,
      ['button--disabled']: disabled,
    })}
  >
    {text}
    {icon && (
      <FontAwesomeIcon icon="search" className={cx('button__icon', `button__icon--${size}`)} />
    )}
  </button>
);

export default Button;
