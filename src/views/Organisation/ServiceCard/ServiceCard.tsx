import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import FallBackLogo from '../../../assets/images/logo-fallback.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import capitalize from 'lodash/capitalize';

import { apiBase } from '../../../config/api';
import { IService } from '../../../types/types';

import './ServiceCard.scss';

interface IProps {
  service: IService;
}

const ServiceCard: React.FunctionComponent<IProps> = ({ service }) => {
  const getIcon = (type: string) => {
    switch (true) {
      case type === 'activity':
        return 'paper-plane';
      case type === 'advice':
        return 'people-arrows';
      case type === 'app':
        return 'tablet-alt';
      case type === 'club':
        return 'tshirt';
      case type === 'group':
        return 'users';
      case type === 'helpline':
        return 'phone-alt';
      case type === 'information':
        return 'info';
      case type === 'service':
        return 'clipboard';
      default:
        break;
    }
  };

  return (
    <article className="service-card">
      <div className="search-result-card__content">
        <div className="search-result-card__top-row">
          <div className="search-result-card__title">
            <h3>{service.name}</h3>
          </div>

          <div className="search-result-card__logo">
            <img
              src={
                service.has_logo
                  ? `${apiBase}/services/${service.id}/logo.png?v=${service.updated_at}`
                  : `${apiBase}/organisations/${service.organisation_id}/logo.png?v=${service.updated_at}`
              }
              alt={service.name}
              onError={(ev: any) => (ev.target.src = FallBackLogo)}
            />
          </div>
        </div>
        <div className="search-result-card__meta">
          <div className="search-result-card__tags">
            <div
              className={cx('search-result-card__tag', `search-result-card__tag--type`)}
              aria-label={`This is a ${service.type}`}
            >
              <FontAwesomeIcon
                icon={getIcon(service.type) as IconProp}
                className="search-result-card__tag--icon"
              />
              {capitalize(service.type)}
            </div>
            <div
              className={cx('search-result-card__tag', `search-result-card__tag--cost`)}
              aria-label={`This ${service.type} ${service.is_free ? 'is free' : 'has a cost'}`}
            >
              <FontAwesomeIcon icon="pound-sign" className="search-result-card__tag--icon" />

              {service.is_free ? 'Free' : 'Cost'}
            </div>
          </div>
        </div>
        {service.intro && <p className="body--s">{service.intro}</p>}
      </div>
      <div
        className="search-result-card__footer"
        role="navigation"
        aria-label={`View more information on ${service.name}`}
      >
        {service.slug && (
          <Link to={`/services/${service.slug}`}>
            <span>See details</span>
            <FontAwesomeIcon icon="arrow-right" />
          </Link>
        )}
      </div>
    </article>
  );
};

export default observer(ServiceCard);
