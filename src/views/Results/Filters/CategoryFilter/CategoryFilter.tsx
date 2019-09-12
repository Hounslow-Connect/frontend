import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import Checkbox from '../../../../components/Checkbox';
import ResultsStore from '../../../../stores/resultsStore';

import './CategoryFilter.scss';
import ViewFilters from '../ViewFilter/ViewFilter';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
}

@inject('resultsStore')
@observer
class CategoryFilter extends Component<IProps> {
  render() {
    const { resultsStore, history } = this.props;

    if (!resultsStore || !history) {
      return null;
    }

    return (
      <div className="category_filters__container">
        <div className="column category_filters__filter-cost">
          <p className="category_filters--header--cost">Cost</p>
          <Checkbox
            id="is_free"
            label="Free"
            checked={resultsStore.is_free}
            onChange={() => {
              resultsStore.toggleIsFree();
              history.push({
                search: resultsStore.updateQueryStringParameter('is_free', resultsStore.is_free),
              });
            }}
          />
        </div>
        <ViewFilters />
      </div>
    );
  }
}

export default withRouter(CategoryFilter);
