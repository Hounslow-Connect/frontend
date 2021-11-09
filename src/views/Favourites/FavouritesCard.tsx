import React from 'react';
import first from 'lodash/first';
import find from 'lodash/find';
import capitalize from 'lodash/capitalize';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { IService, IServiceLocation } from '../../types/types';
import { getLocationName } from '../../utils/utils';
import Accordian from '../../components/Accordian';

import { apiBase } from '../../config/api';
import { observer, inject } from 'mobx-react';
import FavouritesStore from '../../stores/favouritesStore';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import FallBackLogo from '../../assets/images/logo-fallback.png';

interface IProps extends RouteComponentProps {
  service: IService;
  locations: IServiceLocation[];
  removeFavourite: (id: string) => void;
  favouritesStore?: FavouritesStore;
}

const FavouritesCard: React.FunctionComponent<IProps> = ({
  service,
  locations,
  removeFavourite,
  favouritesStore,
  history,
}) => {
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

  const serviceLocations = getLocationName(locations);

  if (!favouritesStore) {
    return null;
  }

  const organisation = find(favouritesStore.organisations, ['id', service.organisation_id]);

  return (
    <article className="search-result-card favourites__card">
      <div className="search-result-card__content">
        <div className="search-result-card__top-row">
          <div className="search-result-card__title">
            <h3>{service.name}</h3>
            {organisation && (
              <h4 className="search-result-card__organisation">
                <span className="sr-only">{`This ${service.type} is ran by`}</span>
                {organisation.name}
              </h4>
            )}
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

        {serviceLocations.length > 0 && (
          <div className="search-result-card__location favourites__card--location">
            <FontAwesomeIcon icon="map-marker-alt" />
            {serviceLocations.length === 1 ? (
              <p>{first(serviceLocations)}</p>
            ) : (
              <Accordian
                title={`${serviceLocations.length} locations`}
                className={'search-result-card__location-list'}
              >
                {serviceLocations.map(location => (
                  <p key={`${location.id}-${location}`}>{location}</p>
                ))}
              </Accordian>
            )}
          </div>
        )}

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
        {service.intro && (
          <div className="search-result-card__intro">
            <p className="body--s">{service.intro}</p>
          </div>
        )}

        <div className="flex-container  flex-container--no-padding favourites__card--contact">
          {service.contact_phone && (
            <div className="flex-col flex-col--12">
              <p className="favourites__card--contact--heading">
                <FontAwesomeIcon icon="phone" /> Telephone
              </p>
              <a href={`tel:${service.contact_phone}`} className="body--s">
                {service.contact_phone}
              </a>
            </div>
          )}
          {service.contact_email && (
            <div className="flex-col flex-col--12">
              <p className="favourites__card--contact--heading">
                <FontAwesomeIcon icon="envelope" /> Email
              </p>
              <a href={`mailto:${service.contact_email}`} className="body--s">
                {service.contact_email}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="favourites__card--footer">
        <div>
          <Link to={`/services/${service.slug}`}>
            <span>View more</span>
            <FontAwesomeIcon icon="arrow-right" />
          </Link>
        </div>
        <div>
          <Button
            text="Remove"
            key={`key_remove_favourite_${service.id}`}
            size="small"
            icon="times"
            onClick={() => {
              removeFavourite(service.id);
            }}
          />
        </div>
      </div>
    </article>
  );
};

export default inject('favouritesStore')(withRouter(observer(FavouritesCard)));
