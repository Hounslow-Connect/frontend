import React from 'react';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import capitalize from 'lodash/capitalize';
import first from 'lodash/first';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { apiBase } from '../../config/api';
import { IService, IOrganisation } from '../../types/types';

import './SearchResultCard.scss';

import Accordian from '../Accordian';
import { getLocationName } from '../../utils/utils';
import FallBackLogo from '../../assets/images/logo-fallback.png';
import ResultsStore from '../../stores/resultsStore';

interface IProps extends RouteComponentProps {
  resultsStore: ResultsStore;
  result: IService;
  organisation?: IOrganisation | null;
  isActive?: boolean;
  activeMarkerId?: boolean;
  activeIdHandler: any;
}

@inject('resultsStore', 'result', 'organisation', 'isActive')
@observer
class SearchResultCard extends React.Component<IProps> {
  getIcon = (type: string) => {
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

  render() {
    const { resultsStore, history, result, organisation, isActive } = this.props;
    const locations = getLocationName(result.service_locations);

    if (!result) {
      return null;
    }

    return (
      <article
        className={cx('search-result-card', {
          'is-active': isActive,
        })}
        onClick={() => {
          resultsStore.view === 'map'
            ? this.props.activeIdHandler(result.id)
            : history.push(`/services/${result.slug}`);
        }}
        tabIndex={0}
      >
        <div className="search-result-card__content">
          <div className="search-result-card__top-row">
            <div className="search-result-card__title">
              <h3>{result.name}</h3>
              {organisation && (
                <h4 className="search-result-card__organisation">
                  <span className="sr-only">{`This ${result.type} is ran by`}</span>
                  {organisation.name}
                </h4>
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
          <div className="search-result-card__meta">
            <div className="search-result-card__tags">
              <div
                className={cx('search-result-card__tag', `search-result-card__tag--type`)}
                aria-label={`This is a ${result.type}`}
              >
                <FontAwesomeIcon
                  icon={this.getIcon(result.type) as IconProp}
                  className="search-result-card__tag--icon"
                />
                {capitalize(result.type)}
              </div>
              <div
                className={cx('search-result-card__tag', `search-result-card__tag--cost`)}
                aria-label={`This ${result.type} ${result.is_free ? 'is free' : 'has a cost'}`}
              >
                <FontAwesomeIcon icon="pound-sign" className="search-result-card__tag--icon" />

                {result.is_free ? 'Free' : 'Cost'}
              </div>
            </div>
            {!!locations.length && (
              <div
                className="search-result-card__location"
                onClick={(e: any) => e.stopPropagation()}
              >
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
          {result.intro && (
            <div className="search-result-card__intro">
              <p className="body--s">{result.intro}</p>
            </div>
          )}
        </div>
        <div
          className="search-result-card__footer"
          role="navigation"
          aria-label={`View more information on ${result.name}`}
        >
          <Link to={`/services/${result.slug}`}>
            <span>View more</span>
            <FontAwesomeIcon icon="arrow-right" />
          </Link>
        </div>
      </article>
    );
  }
}

export default withRouter(SearchResultCard);
