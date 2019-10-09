import React from 'react';
import first from 'lodash/first';
import find from 'lodash/find';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IService, IServiceLocation } from '../../types/types';
import { getLocationName } from '../../utils/utils';
import Accordian from '../../components/Accordian';

import { apiBase } from '../../config/api';
import { observer, inject } from 'mobx-react';
import FavouritesStore from '../../stores/favouritesStore';
import get from 'lodash/get';
import { withRouter, RouteComponentProps } from 'react-router';
import { gaEvent } from '../../utils/gaEvent';

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
  const serviceLocations = getLocationName(locations);

  if (!favouritesStore) {
    return null;
  }

  const organisation = find(favouritesStore.organisations, ['id', service.organisation_id]);

  return (
    <article className="flex-col flex-col--mobile--12 flex-col--4 flex-col--tablet-large--5 flex-col--tablet--8 favourites__card--outer">
      <div className="favourites__card">
        <div className="flex-container favourites__card--inner flex-container--mobile-no-padding">
          <div className="flex-col flex-col--12">
            <div className="flex-container favourites__card--no-padding">
              <div className="flex-col flex-col--8 flex-col--mobile--8">
                <h3>{service.name}</h3>
                <p className="body--s favourites__card--organisation">
                  {get(organisation, 'name')}
                </p>
                <div className="search-result-card__location favourites__card--location">
                  <FontAwesomeIcon icon="map-marker-alt" />
                  {serviceLocations.length === 1 ? (
                    <h4>{first(serviceLocations)}</h4>
                  ) : (
                    <Accordian
                      title={`${serviceLocations.length} locations`}
                      className={'search-result-card__location-list'}
                    >
                      {serviceLocations.map(location => (
                        <h4 key={`${location.id}-${location}`}>{location}</h4>
                      ))}
                    </Accordian>
                  )}
                </div>
              </div>
              {service.has_logo && (
                <div className="flex-col flex-col--4 favourites__logo">
                  <img
                    src={
                      service.has_logo
                        ? `${apiBase}/services/${service.id}/logo.png?v=${service.updated_at}`
                        : `${apiBase}/organisations/${service.organisation_id}/logo.png?v=${service.updated_at}`
                    }
                    alt={service.name}
                  />
                </div>
              )}
            </div>
            <div className="flex-col flex-col--12">
              <p className="body--s favourites__card--intro">{service.intro}</p>
            </div>
            <div className="flex-container favourites__card--contact">
              <div className="flex-col flex-col--12">
                <p className="favourites__card--contact--heading">
                  <FontAwesomeIcon icon="phone" /> Telephone
                </p>
                <p
                  className="body--s"
                  onClick={() => gaEvent(service.name, 'Phone', service.contact_phone)}
                >
                  {service.contact_phone}
                </p>
              </div>
              <div className="flex-col flex-col--12">
                <p className="favourites__card--contact--heading">
                  <FontAwesomeIcon icon="envelope" /> Email
                </p>
                <p
                  className="body--s"
                  onClick={() => gaEvent(service.name, 'Email', service.contact_email)}
                >
                  {service.contact_email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col flex-col--12 favourites__card--button-row">
          <div className="flex-container favourites__card--no-padding">
            <div
              className="flex-col flex-col--6 flex-col--mobile--6 favourites__card--button"
              role="button"
              aria-label="Remove favourite"
              onClick={() => removeFavourite(service.id)}
              onKeyPress={e => (e.key === 'Enter' ? removeFavourite(service.id) : null)}
              tabIndex={0}
            >
              <p>
                Remove <FontAwesomeIcon icon="times" />
              </p>
            </div>
            <div
              className="flex-col flex-col--6 flex-col--mobile--6 favourites__card--button favourites__card--button--more"
              role="navigation"
              aria-label={`View more information about ${service.name}`}
              onClick={() => history.push(`/services/${service.slug}`)}
              onKeyPress={e =>
                e.key === 'Enter' ? history.push(`/services/${service.slug}`) : null
              }
              tabIndex={0}
            >
              <p>
                View More <FontAwesomeIcon icon="chevron-right" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default inject('favouritesStore')(withRouter(observer(FavouritesCard)));
