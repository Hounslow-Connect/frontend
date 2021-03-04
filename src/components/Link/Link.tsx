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
  className?: string;
  target?: string;
  rel?: string;
}

const Link: React.FunctionComponent<ILinkProps> = ({
  text,
  href,
  size,
  inline,
  icon,
  iconPosition,
  header,
  className,
  target,
  rel,
}) => (
  <a
    href={href}
    className={cx('link', `link--${size}`, {
      link__inline: inline,
      link__header: header,
      [className as string]: className,
    })}
    target={target}
    rel={rel}
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
