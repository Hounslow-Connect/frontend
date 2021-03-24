import React, { Fragment } from 'react';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import find from 'lodash/find';
import { observer } from 'mobx-react';

import SearchResultCard from '../../../components/SearchResultCard';
import CategoryList from '../../../components/CategoryList';

import { IService } from '../../../types/types';
import ResultsStore from '../../../stores/resultsStore';
import SearchStore from '../../../stores/searchStore';
import { History } from 'history';
import Loading from '../../../components/Loading';

interface IProps {
  resultsStore: ResultsStore;
  history: History;
}

const ListView: React.FunctionComponent<IProps> = ({ resultsStore, history }) => {
  if (resultsStore.loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <main className="results__container">
        {!!resultsStore.results.length ? (
          resultsStore.results.map((result: IService) => {
            const organisation =
              find(resultsStore.organisations, ['id', result.organisation_id]) || null;

            return <SearchResultCard key={result.id} result={result} organisation={organisation} />;
          })
        ) : (
          <div className="results__container--no-results">
            <h1>Your search for "{resultsStore.keyword}" didn't return any results.</h1>
            <p>You could try searching for a slightly different but related keyword. For example, "nursing home" instead of "care home".</p>
            <div className="results__container__category-list">
              <h2>You might also find searching by category might be helpful:</h2>
              <CategoryList categories={SearchStore.categories} covid={true} />
            </div>
          </div>
        )}
      </main>

      <div className="flex-container flex-container--justify pagnation__container">
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
  );
};

export default observer(ListView);
