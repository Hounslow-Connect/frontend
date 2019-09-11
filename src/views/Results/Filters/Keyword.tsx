import React, { Fragment, Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ResultsStore from '../../../stores/resultsStore';
import KeywordFilter from './KeywordFilter';
import { withRouter, RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
}

@inject('resultsStore')
@observer
class Keyword extends Component<IProps> {
  render() {
    const { resultsStore, history } = this.props;

    if (!resultsStore) {
      return null;
    }
    return (
      <Fragment>
        <div className="results__search-left">
          <h4>Search results</h4>
          <form className="results__search-box-info">
            <label htmlFor="keyword">I'm looking for</label>
            <div>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  resultsStore.handleKeywordChange(e)
                }
                id="keyword"
                placeholder={get(resultsStore, 'keyword', '') || ''}
                className="results__search-box-keyword"
                value={get(resultsStore, 'keyword', '') || ''}
              />
              <Button
                icon="search"
                text="Search"
                onClick={() => {
                  history.push({
                    search: resultsStore.updateQueryStringParameter(
                      'search_term',
                      resultsStore.keyword
                    ),
                  });
                }}
              />
            </div>
          </form>
        </div>
        <KeywordFilter />
      </Fragment>
    );
  }
}

export default withRouter(Keyword);
