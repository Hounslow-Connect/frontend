import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { History } from 'history';
import get from 'lodash/get';

import './Results.scss';
import ResultStore from '../../stores/resultsStore';
import Category from './Filters/Category';
import ParamsFilter from './Filters/ParamsFilter/ParamsFilter';
import ViewFilters from './Filters/ViewFilter/ViewFilter';
import ListView from './ListView';
import MapView from './MapView';
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
      <section className="results">
        <Breadcrumb crumbs={[{ text: 'Home', url: '/' }, { text: 'Search results', url: '' }]} />
        <div className="results__search-box">
          <div className="flex-container">
            {!resultsStore.isKeywordSearch && 
              <h1 className="results__heading">Results for</h1>
            }
            <div className={"results__overview " + (!resultsStore.isKeywordSearch ? 'results__overview--category' : 'results__overview--keyword')}>
              {!resultsStore.isKeywordSearch &&
                <Category />
              }
              <ParamsFilter />
            </div>
          </div>
        </div>
        <div className="results__info">
          <div className="flex-container">
            <div className="results__info__wrapper">
              <div className="results__count">
                {!!resultsStore.results.length && !resultsStore.loading && (
                  <p>
                    Your search: {resultsStore.view === 'grid'
                      ? `${
                          resultsStore.totalItems > 25 ? 'Over 25' : resultsStore.totalItems
                        } results found`
                      : `${resultsStore.serviceWithLocations} results are shown on the map. Some results are not shown because they are only available online or by phone and not at a physical location.`}
                  </p>
                )}
              </div>
              <ViewFilters resultsSwitch={true} />
            </div>
          </div>
        </div>

        <div className="results__list">
          {(this.hasCategories() && this.hasCategories().length !== 0) && (
            <div className="results__category-sidebar">
              {map(this.hasCategories(), (sidebox: ISidebox, index) => {
                return <SideboxCard sidebox={sidebox} key={index} />;
              })}
            </div>
          )}
          {/* {(!!resultsStore.results.length && resultsStore.isKeywordSearch) &&
            <div className="flex-container flex-container--wrap results__filter-bar">
              <div className="flex-col flex-col--6">
                <div
                  className={cx(
                    'flex-container flex-container--align-center results__keyword-container',
                    {
                      'results__keyword-container--end': !resultsStore.postcode,
                    }
                  )}
                >
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
            </div>
          } */}

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
