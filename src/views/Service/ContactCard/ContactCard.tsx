import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import find from 'lodash/find';

import { IService } from '../../../types/types';

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
        'service__accordian-inner': accordian,
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
      <a href={service.url}>{service.url}</a>
    </div>
    <div className="flex-col flex-col--12">
      <h4
        className={cx({
          'service__contact-card--row': !accordian,
        })}
      >
        <FontAwesomeIcon icon="phone" /> Telephone
      </h4>
      <p>{service.contact_phone}</p>
    </div>
    <div className="flex-col flex-col--12">
      <h4
        className={cx({
          'service__contact-card--row': !accordian,
        })}
      >
        <FontAwesomeIcon icon="envelope" /> Email
      </h4>
      <a href={`mailto:${service.contact_email}`}>{service.contact_email}</a>
    </div>
    <div
      className={cx('flex-col flex-col--12 service__social-icon-container', {
        'service__contact-card--row': !accordian,
      })}
    >
      {find(service.social_medias, { type: 'facebook' }) && (
        <a href={getSocialUrl(find(service.social_medias, { type: 'facebook' }))}>
          <FontAwesomeIcon icon={['fab', 'facebook-f']} className="service__social-icon" />
        </a>
      )}
      {find(service.social_medias, { type: 'twitter' }) && (
        <a href={getSocialUrl(find(service.social_medias, { type: 'twitter' }))}>
          <FontAwesomeIcon icon={['fab', 'twitter']} className="service__social-icon" />
        </a>
      )}
      {find(service.social_medias, { type: 'intstagram' }) && (
        <a href={getSocialUrl(find(service.social_medias, { type: 'intstagram' }))}>
          <FontAwesomeIcon icon={['fab', 'instagram']} className="service__social-icon" />
        </a>
      )}
      {find(service.social_medias, { type: 'instagram' }) && (
        <a href={getSocialUrl(find(service.social_medias, { type: 'instagram' }))}>
          <FontAwesomeIcon icon={['fab', 'youtube']} className="service__social-icon" />
        </a>
      )}
    </div>
  </div>
);

export default ContactCard;
