import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import Checkbox from '../../../../components/Checkbox';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ResultsStore from '../../../../stores/resultsStore';
import { withRouter, RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
}

@inject('resultsStore')
@observer
class KeywordFilter extends Component<IProps> {
  render() {
    const { resultsStore, history } = this.props;

    if (!resultsStore) {
      return null;
    }

    return (
      <div className="results__search-right results__location-filters">
        <h4>Filter results by</h4>
        <form className="flex results__filters">
          <div className="column">
            <label htmlFor="location" className="results__keyword-filters--heading">
              Location
            </label>
            <Input
              id="location"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => resultsStore.postcodeChange(e)}
              className="results__search-filter-location"
              placeholder="Postcode"
              value={resultsStore.postcode}
            />
          </div>
          <div>
            <p className="results__keyword-filters--heading--cost">Cost</p>
            <Checkbox
              id="is_free"
              label="Free"
              checked={get(resultsStore, 'is_free', false)}
              className="results__keyword-cost-filter"
              onChange={() => {
                resultsStore.toggleIsFree();
              }}
            />
          </div>
          <div className="results__keyword-amend">
            <Button
              alt={true}
              text="Amend"
              icon="sync-alt"
              onClick={() => {
                history.push({ search: resultsStore.amendSearch() });
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(KeywordFilter);
