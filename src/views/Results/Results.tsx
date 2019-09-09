import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import queryString from 'query-string';
import find from 'lodash/find';
import get from 'lodash/get';

import './Results.scss';
import ResultStore from '../../stores/resultsStore';
import SearchResultCard from '../../components/SearchResultCard';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';

interface IProps {
  location: Location;
  resultsStore: ResultStore;
}

class Results extends Component<IProps> {
  componentDidMount() {
    const { resultsStore, location } = this.props;
    const searchTerms = queryString.parse(location.search);

    resultsStore.setSearchTerms(searchTerms);
  }

  componentWillUnmount() {
    const { resultsStore } = this.props;

    resultsStore.clear();
  }

  render() {
    const { resultsStore } = this.props;
    return (
      <section>
        <div className="results__search-box">
          <div className="results__search-left">
            <h4>Results for</h4>
            <div className="results__search-box-info">
              <h5>{get(resultsStore, 'category.name')}</h5>
              <div>
                <p>{get(resultsStore, 'category.intro')}</p>
              </div>
            </div>
          </div>
          <div className="results__search-right">
            {resultsStore.isKeywordSearch ? null : <CategoryFilter />}
          </div>
        </div>

        <div className="results__container">
          {resultsStore.loading ? (
            'Loading'
          ) : (
            <Fragment>
              <div className="results__container-count">
                {!!resultsStore.results.length && (
                  <p>{`${resultsStore.results.length} services found`}</p>
                )}
              </div>
              {resultsStore.results.map((result: any) => {
                const organisation = find(resultsStore.organisations, [
                  'id',
                  result.organisation_id,
                ]);

                return (
                  <SearchResultCard key={result.id} result={result} organisation={organisation} />
                );
              })}
            </Fragment>
          )}
        </div>
      </section>
    );
  }
}

const CategoryFilter = () => (
  <div className="results__search-box-filters">
    <div className="results__search-filter result__search-filter-cost">
      <p className="results__category-search--header--cost">Cost</p>
      <Checkbox id="free" label="Free" />
    </div>
    <div className="results__search--layout">
      <p className="results__category-search--header">View As</p>
      <Button text="Grid" icon="th-large" size="small" />
      <Button text="Map" icon="map" size="small" light={true} />
    </div>
  </div>
);

export default inject('resultsStore')(observer(Results));
