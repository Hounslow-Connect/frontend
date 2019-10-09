import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import capitalize from 'lodash/capitalize';
import first from 'lodash/first';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { apiBase } from '../../config/api';
import { IService, IOrganisation } from '../../types/types';

import './SearchResultCard.scss';

import Accordian from '../Accordian';
import { getLocationName } from '../../utils/utils';
import FallBackLogo from '../../assets/images/logo-fallback.png';

interface IProps extends RouteComponentProps {
  result: IService;
  organisation?: IOrganisation | null;
  mapView?: boolean;
}

const SearchResultCard: React.FunctionComponent<IProps> = ({
  result,
  organisation,
  mapView,
  history,
}) => {
  const locations = getLocationName(result.service_locations);

  return (
    <article
      className={cx('search-result-card', {
        'search-result-card--full-width': mapView,
      })}
      onClick={() => history.push(`/services/${result.slug}`)}
      tabIndex={0}
    >
      <div className="search-result-card__top-row">
        <div className="search-result-card__title">
          <h3>{result.name}</h3>
          {organisation && (
            <h4 className="search-result-card__organisation">
              <span className="sr-only">{`This ${result.type} is ran by`}</span>
              {organisation.name}
            </h4>
          )}
          <div
            className={cx('search-result-card__tag', `search-result-card__tag--${result.type}`)}
            aria-label={`This ${result.type} ${result.is_free ? 'is free' : 'has a cost'}`}
          >
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
            <div className="search-result-card__location" onClick={(e: any) => e.stopPropagation()}>
              <span className="sr-only">{`This ${result.type} is located at`}</span>

              <FontAwesomeIcon icon="map-marker-alt" />
              {locations.length === 1 ? (
                <h4>{first(locations)}</h4>
              ) : (
                <Accordian
                  title={`${locations.length} locations`}
                  className={'search-result-card__location-list'}
                >
                  {locations.map(location => (
                    <h4 key={`${result.id}-${location}`}>{location}</h4>
                  ))}
                </Accordian>
              )}
            </div>
          )}
        </div>
        <div className="search-result-card__logo">
          <img
            src={
              result.has_logo
                ? `${apiBase}/services/${result.id}/logo.png?v=${result.updated_at}`
                : `${apiBase}/organisations/${result.organisation_id}/logo.png?v=${result.updated_at}`
            }
            alt={result.name}
            onError={(ev: any) => (ev.target.src = FallBackLogo)}
          />
        </div>
      </div>
      <div className="search-result-card__intro">
        <p className="body--s">{result.intro}</p>
      </div>
      <div
        className="search-result-card__footer"
        role="navigation"
        aria-label={`View more information on ${result.name}`}
      >
        <Link to={`/services/${result.slug}`}>
          <span>View More</span>
          <FontAwesomeIcon icon="chevron-right" />
        </Link>
      </div>
    </article>
  );
};

export default withRouter(SearchResultCard);
