import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ResultsStore from '../../../stores/resultsStore';
import KeywordFilter from './KeywordFilter';

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
            value={get(resultsStore, 'keyword', '') || ''}
          />
          <Button icon="search" text="Search" />
        </div>
      </form>
    </div>
    <KeywordFilter />
  </Fragment>
);

export default inject('resultsStore')(observer(Keyword));
