import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import ResultsStore from '../../../stores/resultsStore';
import CategoryFilter from '../Filters/CategoryFilter';
import '../Results.scss';

interface IProps {
  resultsStore?: ResultsStore;
}

const Category: React.FunctionComponent<IProps> = ({ resultsStore }) => (
  <Fragment>
    <div className="results__search-left">
      <h4>Results for</h4>
      <div className="results__search-box-info">
        <h5>
          {resultsStore && resultsStore.category
            ? get(resultsStore, 'category.name')
            : get(resultsStore, 'persona.name')}
        </h5>
        <div>
          <p>
            {resultsStore && resultsStore.category
              ? get(resultsStore, 'category.intro')
              : get(resultsStore, 'persona.intro')}
          </p>
        </div>
      </div>
    </div>
    <div className="results__search-right">
      <CategoryFilter />
    </div>
  </Fragment>
);

export default inject('resultsStore')(observer(Category));
