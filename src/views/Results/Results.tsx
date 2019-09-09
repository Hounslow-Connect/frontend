import React, { Component, Fragment, ReactFragment } from 'react';
import { observer, inject } from 'mobx-react';
import find from 'lodash/find';
import get from 'lodash/get';
import { History } from 'history';

import './Results.scss';
import ResultStore from '../../stores/resultsStore';
import SearchResultCard from '../../components/SearchResultCard';
import CategoryFilter from './CategoryFilter';

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

  componentDidUpdate(prevProps: any) {
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
    const { resultsStore } = this.props;
    return (
      <section>
        <div className="results__search-box">
          <div className="results__search-left">
            <h4>Results for</h4>
            <div className="results__search-box-info">
              <h5>
                {resultsStore.category
                  ? get(resultsStore, 'category.name')
                  : get(resultsStore, 'persona.name')}
              </h5>
              <div>
                <p>
                  {resultsStore.category
                    ? get(resultsStore, 'category.intro')
                    : get(resultsStore, 'persona.intro')}
                </p>
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

export default inject('resultsStore')(observer(Results));
