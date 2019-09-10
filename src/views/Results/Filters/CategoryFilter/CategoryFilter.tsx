import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import Checkbox from '../../../../components/Checkbox';
import Button from '../../../../components/Button';
import ResultsStore from '../../../../stores/resultsStore';

import './CategoryFilter.scss';

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
        <div className="category_filters__search--layout">
          <p className="results__category-search--header">View As</p>
          <Button text="Grid" icon="th-large" size="small" />
          <Button text="Map" icon="map" size="small" light={true} />
        </div>
      </div>
    );
  }
}

export default withRouter(CategoryFilter);
