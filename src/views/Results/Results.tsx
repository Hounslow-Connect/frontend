import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { History } from 'history';
import cx from 'classnames';
import get from 'lodash/get';

import './Results.scss';
import ResultStore from '../../stores/resultsStore';
import Category from './Filters/Category';
import Keyword from './Filters/Keyword';
import ViewFilters from './Filters/ViewFilter/ViewFilter';
import ListView from './ListView';
import MapView from './MapView';
import Select from '../../components/Select';
import Breadcrumb from '../../components/Breadcrumb';
import map from 'lodash/map';
import SideboxCard from './SideboxCard';
import { ISidebox } from '../../types/types';

interface IProps {
  location: Location;
  resultsStore: ResultStore;
  history: History;
}

class Results extends Component<IProps> {
  componentDidMount() {
    const { resultsStore } = this.props;

    resultsStore.getSearchTerms();
  }

  hasCategories = () => {
    const { resultsStore } = this.props;

    if (resultsStore.category) {
      return get(resultsStore, 'category.sideboxes', []);
    }

    if (resultsStore.persona) {
      return get(resultsStore, 'persona.sideboxes', []);
    }

    return null;
  };

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const { resultsStore } = this.props;
      resultsStore.getSearchTerms();
    }
  }

  componentWillUnmount() {
    const { resultsStore } = this.props;

    resultsStore.clear();
  }

  render() {
    const { resultsStore, history } = this.props;
    return (
      <section>
        <Breadcrumb crumbs={[{ text: 'Home', url: '/' }, { text: 'Search', url: '' }]} />
        <div className="results__search-box">
          {resultsStore.isKeywordSearch ? <Keyword /> : <Category />}
        </div>

        <div className="results__list">
          {this.hasCategories() && (
            <div className="results__category-sidebar">
              <div className="flex-container flex-container--mobile-no-padding">
                {map(this.hasCategories(), (sidebox: ISidebox) => {
                  return <SideboxCard sidebox={sidebox} />;
                })}
              </div>
            </div>
          )}
          <div className="flex-container flex-container results__filter-bar">
            <div className="flex-col flex-col--12 results__container-count">
              {!!resultsStore.results.length && !resultsStore.loading && (
                <p>
                  <strong>
                    {resultsStore.view === 'grid'
                      ? `${
                          resultsStore.totalItems > 25 ? 'Over 25' : resultsStore.totalItems
                        } services found`
                      : `${resultsStore.serviceWithLocations} services shown. Some services are only available online or by phone`}
                  </strong>
                </p>
              )}
            </div>
            {resultsStore.isKeywordSearch && (
              <div className="flex-col flex-col--8 flex-col--tablet-large--12 flex-col--medium--12 flex-container--tablet--12">
                <div
                  className={cx(
                    'flex-container flex-container--align-center results__keyword-container',
                    {
                      'results__keyword-container--end': !resultsStore.postcode,
                    }
                  )}
                >
                  <ViewFilters resultsSwitch={true} />
                  {resultsStore.view === 'grid' && resultsStore.postcode && (
                    <div
                      className={cx(
                        'flex-col flex-col--7 flex-col--tablet-large--6 flex-col--mobile--5 flex-col--medium--5 flex-col--mobile-small--12 flex-container--mobile-no-padding results__sort-by-container',
                        {
                          'flex-col--medium--6': !resultsStore.postcode,
                        }
                      )}
                    >
                      <label htmlFor="orderBy" className="results__sort-by-label">
                        Sort by:
                      </label>
                      <Select
                        className="results__sort-by-select"
                        options={[
                          { value: 'relevance', text: 'Relevance' },
                          { value: 'distance', text: 'Location' },
                        ]}
                        placeholder={resultsStore.order === 'distance' ? 'Location' : 'Relevance'}
                        id="orderBy"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          resultsStore.orderResults(e)
                        }
                        disabled={!resultsStore.postcode}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {resultsStore.view === 'grid' ? (
            <ListView resultsStore={resultsStore} history={history} />
          ) : (
            <MapView />
          )}
        </div>
      </section>
    );
  }
}

export default inject('resultsStore')(observer(Results));
