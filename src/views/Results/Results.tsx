import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { History } from 'history';

import './Results.scss';
import ResultStore from '../../stores/resultsStore';
import Category from './Filters/Category';
import Keyword from './Filters/Keyword';
import ViewFilters from './Filters/ViewFilter/ViewFilter';
import ListView from './ListView';
import MapView from './MapView';
import Select from '../../components/Select';

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
        <div className="results__search-box">
          {resultsStore.isKeywordSearch ? <Keyword /> : <Category />}
        </div>

        <div className="results__list">
          <div className="flex-container flex-container results__filter-bar">
            <div className="flex-col flex-col--4 flex-col--tablet-large--2 flex-col--mobile--12 results__container-count">
              {!!resultsStore.results.length && (
                <p>{`${resultsStore.results.length} services found`}</p>
              )}
            </div>
            {resultsStore.isKeywordSearch && (
              <div className="flex-col flex-col--7 flex-col--tablet-large--12">
                <div className="flex-container flex-container--align-center results__keyword-container">
                  <ViewFilters resultsSwitch={true} />
                  {resultsStore.view === 'grid' && (
                    <div className="flex-col flex-col--7 flex-col--tablet-large--6 flex-col--mobile--5 flex-container--mobile-no-padding results__sort-by-container">
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
            <MapView resultsStore={resultsStore} />
          )}
        </div>
      </section>
    );
  }
}

export default inject('resultsStore')(observer(Results));
