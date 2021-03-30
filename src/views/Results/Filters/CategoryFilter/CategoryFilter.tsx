import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import Checkbox from '../../../../components/Checkbox';
import ResultsStore from '../../../../stores/resultsStore';
import Button from '../../../../components/Button';

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
      <div
        className="results__filters"
        aria-label={`${resultsStore.results.length} services found. Refine results`}
      >
        <p
          className="results__filters__header"
          aria-label={resultsStore.is_free ? 'View paid services' : 'View free services'}
        >
          Cost
        </p>
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
    );
  }
}

export default withRouter(CategoryFilter);
