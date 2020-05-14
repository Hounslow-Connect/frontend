import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import React from 'react';

import './Button.scss';

interface IProps {
  text: string;
  icon?: IconName;
  href: string;
}

const ButtonLink: React.FunctionComponent<IProps> = ({ text, icon, href }) => (
  <a className={cx('button', 'button__link')} href={href} target="__blank">
    <span>{text}</span>
    {icon && <FontAwesomeIcon icon={icon} className={cx('button__icon')} />}
  </a>
);

export default ButtonLink;
