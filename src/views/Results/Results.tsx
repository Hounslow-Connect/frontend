import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import find from 'lodash/find';
import get from 'lodash/get';
import { History } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

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
    const { resultsStore, history } = this.props;
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

        <div className="results__list">
          {resultsStore.loading ? (
            'Loading'
          ) : (
            <Fragment>
              <div className="results__container-count">
                {!!resultsStore.results.length && (
                  <p>{`${resultsStore.results.length} services found`}</p>
                )}
              </div>
              <main className="results__container">
                {resultsStore.results.map((result: any) => {
                  const organisation = find(resultsStore.organisations, [
                    'id',
                    result.organisation_id,
                  ]);

                  return (
                    <SearchResultCard key={result.id} result={result} organisation={organisation} />
                  );
                })}
              </main>

              <div className="flex pagnation__container">
                {resultsStore.totalItems > resultsStore.itemsPerPage && (
                  <Pagination
                    activePage={resultsStore.currentPage}
                    itemsCountPerPage={resultsStore.itemsPerPage}
                    totalItemsCount={resultsStore.totalItems}
                    pageRangeDisplayed={10}
                    onChange={(pageNumber: number) => {
                      resultsStore.paginate(pageNumber);
                      history.push({
                        search: resultsStore.updateQueryStringParameter('page', pageNumber),
                      });
                    }}
                    prevPageText={
                      <span>
                        <FontAwesomeIcon icon="chevron-left" /> Prev
                      </span>
                    }
                    nextPageText={
                      <span>
                        Next <FontAwesomeIcon icon="chevron-right" />
                      </span>
                    }
                    innerClass="pagination"
                    activeClass="pagination--active"
                    itemClass="pagination--number-container"
                    linkClass="pagination--text-number-link"
                    linkClassPrev="pagination--text-nav-link"
                    linkClassNext="pagination--text-nav-link"
                    itemClassPrev="pagination--text-nav-container"
                    itemClassNext="pagination--text-nav-container"
                    hideFirstLastPages={true}
                  />
                )}
              </div>
            </Fragment>
          )}
        </div>
      </section>
    );
  }
}

export default inject('resultsStore')(observer(Results));
