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
      <div>
        <div>
          <h2 className="mobile-hide results__keyword-heading">Filter results by</h2>
        </div>
        <form className="flex-container flex-container--align-bottom results__filters">
          <div className="flex-col flex-col--4 flex-col--tablet--4 flex-col--mobile--4 flex-container--mobile-no-padding">
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
          <div className="flex-col flex-col--3 flex-col--tablet--4 flex-col--mobile--3 flex-container--mobile-no-padding">
            <p className="results__keyword-filters--heading--cost">Cost</p>
            <Checkbox
              id="is_free"
              label="Free"
              checked={get(resultsStore, 'is_free', false)}
              onChange={() => {
                resultsStore.toggleIsFree();
              }}
            />
          </div>
          <div className="flex-col flex-col--4 flex-col--tablet--4 flex-col--mobile--4 flex-container--mobile-no-padding results__amend">
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
