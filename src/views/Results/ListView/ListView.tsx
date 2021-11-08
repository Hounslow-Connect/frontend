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
        <List resultsList={resultsStore.results} resultsStore={resultsStore} />
      ) : (
        <div className="esults__container flex-container results__container--no-results">
          <div className={'results__container--no-results__suggestions'}>
            <h2>No results found</h2>
            <p>Take a look at the tips below which may help in getting more results</p>

            <ul className={'info-cards'}>
              <li>
                <strong>Increase your distance from your location - </strong> E.g. from 5 miles to
                10 miles
              </li>
              <li>
                <strong>Try using a different word or term -</strong> E.g. Instead of care homes try
                nursing home
              </li>
              <li>
                <strong>Remove some of the filters</strong>{' '}
              </li>
              <li>
                <strong>Browse the categories to discover relevant services</strong>
              </li>
            </ul>
          </div>

          <div className={'results__container results__container--no-results__categories'}>
            <h2>You might also find searching by category might be helpful:</h2>
            <CategoryList categories={SearchStore.categories} />
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
            activeLinkClass="pagination__link--active"
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
