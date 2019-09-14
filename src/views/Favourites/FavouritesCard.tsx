import React from 'react';
import first from 'lodash/first';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IService, IOrganisation } from '../../types/types';
import { getLocationName } from '../../utils/utils';
import Accordian from '../../components/Accordian';

import { apiBase } from '../../config/api';

interface IProps {
  service: IService;
  organisation: IOrganisation;
  locations: [];
  removeFavourite: (id: string) => void;
}
const FavouritesCard: React.FunctionComponent<IProps> = ({
  service,
  locations,
  removeFavourite,
}) => {
  const serviceLocations = getLocationName(locations);
  return (
    <article>
      <div>
        <div>
          <h2>{service.name}</h2>
          {!!serviceLocations.length && (
            <div className="flex search-result-card__location">
              <FontAwesomeIcon icon="map-marker-alt" />
              {serviceLocations.length === 1 ? (
                <p>{first(serviceLocations)}</p>
              ) : (
                <Accordian
                  title={`${serviceLocations.length} locations`}
                  className={'search-result-card__location-list'}
                >
                  {serviceLocations.map(location => (
                    <p key={`${service.id}-${location}`}>{location}</p>
                  ))}
                </Accordian>
              )}
            </div>
          )}
        </div>
        <div>
          <img
            src={
              service.has_logo
                ? `${apiBase}/services/${service.id}/logo.png?v=${service.updated_at}`
                : `${apiBase}/organisations/${service.organisation_id}/logo.png?v=${service.updated_at}`
            }
            alt={service.name}
          />
        </div>
      </div>
      <div>{service.intro}</div>
      <div>
        <p>
          <FontAwesomeIcon icon="phone" /> Telephone
        </p>
        <p> {service.contact_phone}</p>
        <p>
          <FontAwesomeIcon icon="envelope" /> Email
        </p>
        <p>{service.contact_email}</p>
      </div>
      <div>
        <div role="button" onClick={() => removeFavourite(service.id)}>
          <p>
            Remove <FontAwesomeIcon icon="times" />
          </p>
        </div>
        <div>
          <p>
            Remove <FontAwesomeIcon icon="chevron-right" />
          </p>
        </div>
      </div>
    </article>
  );
};

export default FavouritesCard;
