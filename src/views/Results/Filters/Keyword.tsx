import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import ResultsStore from '../../../stores/resultsStore';

interface IProps {
  resultsStore?: ResultsStore;
}

const Keyword: React.FunctionComponent<IProps> = ({ resultsStore }) => (
  <Fragment>
    <div className="results__search-left">
      <h4>Search results</h4>
      <form className="results__search-box-info">
        <label htmlFor="keyword">I'm looking for</label>
        <div>
          <Input
            onChange={() => console.log('on change')}
            id="keyword"
            placeholder={get(resultsStore, 'keyword', '') || ''}
            className="results__search-box-keyword"
          />
          <Button icon="search" text="Search" />
        </div>
      </form>
    </div>
    <div className="results__search-right results__location-filters">
      <h4>Filter results by</h4>
      <form className="flex results__filters">
        <div className="column">
          <label htmlFor="location" className="results__keyword-filters--heading">
            Location
          </label>
          <Input
            id="location"
            onChange={() => console.log('on change')}
            className="results__search-filter-location"
          />
        </div>
        <div>
          <p className="results__keyword-filters--heading--cost">Cost</p>
          <Checkbox
            id="is_free"
            label="Free"
            checked={get(resultsStore, 'is_free', false)}
            className="results__keyword-cost-filter"
            //   onChange={() => {
            //     history.push({ search: resultsStore.updateQueryStringParameter('is_free', true) });
            //     resultsStore.toggleIsFree();
            //   }}
          />
        </div>
        <div className="results__keyword-amend">
          <Button alt={true} text="Amend" icon="sync-alt" />
        </div>
      </form>
    </div>
  </Fragment>
);

export default inject('resultsStore')(observer(Keyword));
