import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import find from 'lodash/find';

import { IService } from '../../../types/types';
import { gaEvent } from '../../../utils/gaEvent';

interface IProps {
  service: IService;
  accordian?: boolean;
}

const getSocialUrl = (socialObj: any) => socialObj.url;

const ContactCard: React.FunctionComponent<IProps> = ({ service, accordian }) => (
  <div
    className={cx(
      'flex-container flex-container--align-center flex-container--mobile-no-padding service__section',
      {
        'service__accordian-inner service__contact-card--accordian': accordian,
        'service__contact-card': !accordian,
      }
    )}
  >
    <div className={cx('flex-col flex-col--12 service__accordian--no-overflow')}>
      <h4
        className={cx({
          'service__contact-card--row': !accordian,
        })}
      >
        <FontAwesomeIcon icon="globe" /> Website
      </h4>
      <a
        href={service.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${service.name} website`}
        onClick={() => gaEvent(service.url, 'Website', service.url)}
      >
        {service.url}
      </a>
    </div>
    <div className="flex-col flex-col--12 service__accordian--no-overflow">
      <h4
        className={cx({
          'service__contact-card--row': !accordian,
        })}
      >
        <FontAwesomeIcon icon="phone" /> Telephone
      </h4>
      <a
        onClick={() => gaEvent(service.name, 'Phone', service.contact_phone)}
        href={`tel:${service.contact_phone}`}
      >
        {service.contact_phone}
      </a>
    </div>
    <div className="flex-col flex-col--12 service__accordian--no-overflow">
      <h4
        className={cx({
          'service__contact-card--row': !accordian,
        })}
      >
        <FontAwesomeIcon icon="envelope" /> Email
      </h4>
      <a
        href={`mailto:${service.contact_email}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Email ${service.name}`}
        onClick={() => gaEvent(service.name, 'Email', service.contact_email.replace('@', '(at)'))}
      >
        {service.contact_email}
      </a>
    </div>
    <div
      className={cx('flex-col flex-col--12 service__social-icon-container', {
        'service__contact-card--row': !accordian,
      })}
    >
      {find(service.social_medias, { type: 'facebook' }) && (
        <a
          href={getSocialUrl(find(service.social_medias, { type: 'facebook' }))}
          aria-label={`Link to ${service.name} Facebook`}
        >
          <FontAwesomeIcon icon={['fab', 'facebook-f']} className="service__social-icon" />
        </a>
      )}
      {find(service.social_medias, { type: 'twitter' }) && (
        <a
          href={getSocialUrl(find(service.social_medias, { type: 'twitter' }))}
          aria-label={`Link to ${service.name} Twitter`}
        >
          <FontAwesomeIcon icon={['fab', 'twitter']} className="service__social-icon" />
        </a>
      )}
      {find(service.social_medias, { type: 'intstagram' }) && (
        <a
          href={getSocialUrl(find(service.social_medias, { type: 'intstagram' }))}
          aria-label={`Link to ${service.name} Instagram`}
        >
          <FontAwesomeIcon icon={['fab', 'instagram']} className="service__social-icon" />
        </a>
      )}
      {find(service.social_medias, { type: 'youtube' }) && (
        <a
          href={getSocialUrl(find(service.social_medias, { type: 'youtube' }))}
          aria-label={`Link to ${service.name} Youtube`}
        >
          <FontAwesomeIcon icon={['fab', 'youtube']} className="service__social-icon" />
        </a>
      )}
    </div>
  </div>
);

export default ContactCard;