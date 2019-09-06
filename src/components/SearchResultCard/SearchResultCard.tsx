import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import capitalize from 'lodash/capitalize';
import first from 'lodash/first';

import { apiBase } from '../../config/api';

import './SearchResultCard.scss';
import get from 'lodash/get';
import Accordian from '../Accordian';

interface IProps {
  result: any;
  organisation: any;
}

const getLocationName = (locations: []) =>
  locations.map((location: any) =>
    location.name ? location.name : get(location, 'location.address_line_1', '')
  );

const SearchResultCard: React.FunctionComponent<IProps> = ({ result, organisation }) => {
  const locations = getLocationName(result.service_locations);

  return (
    <article className="search-result-card">
      <div className="search-result-card__top-row">
        <div className="search-result-card__title">
          <h2>{result.name}</h2>
          <p className="search-result-card__organisation">{organisation.name}</p>
          <div className={cx('search-result-card__tag', `search-result-card__tag--${result.type}`)}>
            <FontAwesomeIcon icon="users" className="search-result-card__tag--icon" />
            {capitalize(result.type)}
            <FontAwesomeIcon
              icon={result.is_free ? 'circle' : 'pound-sign'}
              className={cx('search-result-card__tag--cost', {
                'search-result-card__tag--cost--free': result.is_free,
              })}
            />

            {result.is_free ? 'Free' : 'Cost'}
          </div>
          {!!locations.length && (
            <div className="flex search-result-card__location">
              <FontAwesomeIcon icon="map-marker-alt" />
              {locations.length === 1 ? (
                <p>{first(locations)}</p>
              ) : (
                <Accordian
                  title={`${locations.length} locations`}
                  className={'search-result-card__location-list'}
                >
                  {locations.map(location => (
                    <p key={`${result.id}-${location}`}>{location}</p>
                  ))}
                </Accordian>
              )}
            </div>
          )}
        </div>
        <div>
          <img
            src={
              result.has_logo
                ? `${apiBase}/services/${result.id}/logo.png?v=${result.updated_at}`
                : `${apiBase}/organisations/${result.organisation_id}/logo.png?v=${result.updated_at}`
            }
            alt={result.name}
            className="search-result-card__logo"
          />
        </div>
      </div>
      <div className="search-result-card__intro">
        <p>{result.intro}</p>
      </div>
    </article>
  );
};

export default SearchResultCard;
