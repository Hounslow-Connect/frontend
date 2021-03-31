import React, { Fragment } from 'react';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';

import List from './List';
import CategoryList from '../../../components/CategoryList';

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
      {!!resultsStore.results.length ? (
        <List
          resultsList={resultsStore.results}
          resultsStore={resultsStore}
        />
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

      {resultsStore.totalItems > resultsStore.itemsPerPage && (
        <div className="flex-container flex-container--justify">
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
                <FontAwesomeIcon icon="arrow-left" /> Prev page
              </span>
            }
            nextPageText={
              <span>
                Next page <FontAwesomeIcon icon="arrow-right" />
              </span>
            }
            innerClass="pagination"
            activeClass="pagination__item--active"
            itemClass="pagination__item"
            linkClass="pagination__link"
            linkClassPrev="pagination__link"
            linkClassNext="pagination__link"
            itemClassPrev="pagination__nav-prev"
            itemClassNext="pagination__nav-next"
            hideFirstLastPages={true}
          />
        </div>
      )}
    </Fragment>
  );
};

export default observer(ListView);
