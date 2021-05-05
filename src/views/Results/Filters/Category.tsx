import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import ResultsStore from '../../../stores/resultsStore';
import '../Results.scss';

const requestImageFile = require.context("../../../assets/images/category-images/", true, /^\.\/.*\.svg$/);

interface IProps {
  resultsStore?: ResultsStore;
}

const Category: React.FunctionComponent<IProps> = ({ resultsStore }) => {
  if (!resultsStore) {
    return null;
  }

  return (
    <Fragment>
      {(resultsStore.category || resultsStore.persona) && (
        <div className="results__overview__content">
          {resultsStore &&
            <div className="results__overview__image">
              <img
                src={requestImageFile(`./${resultsStore.category
                  ? get(resultsStore, 'category.name').replace(/\s+/g, '-').toLowerCase()
                  : get(resultsStore, 'persona.name').replace(/\s+/g, '-').toLowerCase()}.svg`).default}
                alt={resultsStore && resultsStore.category
                  ? get(resultsStore, 'category.name').replace('COVID-19:', '')
                  : get(resultsStore, 'persona.name')} />
            </div>
          }
          <div className="results__overview__info">
            <h2>
              {resultsStore && resultsStore.category
                ? get(resultsStore, 'category.name').replace('COVID-19:', '')
                : get(resultsStore, 'persona.name')}
            </h2>
            <div>
              <p className="results__overview__intro">
                {resultsStore && resultsStore.category
                  ? get(resultsStore, 'category.intro')
                  : get(resultsStore, 'persona.intro')}
              </p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default inject('resultsStore')(observer(Category));
