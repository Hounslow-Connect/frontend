import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import React from 'react';

import './Link.scss';

interface ILinkProps {
  text: string;
  href: string;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  size: 'large' | 'medium';
  inline?: boolean;
  header?: boolean;
}

const Link: React.FunctionComponent<ILinkProps> = ({
  text,
  href,
  size,
  inline,
  icon,
  iconPosition,
  header,
}) => (
  <a
    href={href}
    className={cx('link', `link--${size}`, {
      link__inline: inline,
      link__header: header,
    })}
  >
    {icon && iconPosition === 'left' && (
      <FontAwesomeIcon icon={icon} className="link__icon--left" />
    )}
    {text}
    {icon && iconPosition === 'right' && (
      <FontAwesomeIcon icon={icon} className="link__icon--right" />
    )}
  </a>
);

export default Link;
