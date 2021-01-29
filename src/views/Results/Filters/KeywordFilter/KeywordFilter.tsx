import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import queryString from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';

import Checkbox from '../../../../components/Checkbox';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ResultsStore from '../../../../stores/resultsStore';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
}

interface IState {
  postcode: string;
}

@inject('resultsStore')
@observer
class KeywordFilter extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      postcode: '',
    };
  }

  handleInputChange = (postcode: string) => {
    this.setState({
      postcode,
    });
  };

  componentDidMount() {
    const { location } = queryString.parse(this.props.location.search);

    if (location) {
      this.setState({
        postcode: location as string,
      });
    }
  }

  render() {
    const { resultsStore, history } = this.props;

    if (!resultsStore) {
      return null;
    }

    return (
      <div className="results__filters">
        <h2 className="mobile-hide results__keyword-heading">Filter results by</h2>

        <form className="flex-container flex-container--align-bottom flex-container--no-padding">
          <div className="flex-col flex-col--4 flex-col--tablet--4 flex-col--mobile--4 flex-col--tablet-large--5 flex-col--medium--3 flex-container--mobile-no-padding">
            <label
              htmlFor="location"
              className="results__keyword-filters--heading"
              aria-label="Enter a postcode to filter results"
            >
              Location
            </label>
            <Input
              id="location"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.handleInputChange(e.target.value)
              }
              className="results__search-filter-location"
              placeholder="Postcode"
              value={this.state.postcode}
            />
          </div>
          <div className="flex-col flex-col--3 flex-col--tablet--4 flex-col--mobile--3 flex-col--tablet-large--3 flex-container--mobile-no-padding">
            <p className="results__keyword-filters--heading">Cost</p>
            <Checkbox
              id="is_free"
              label="Free"
              checked={get(resultsStore, 'is_free', false)}
              onChange={() => {
                resultsStore.toggleIsFree();
              }}
              aria="Filter free services"
            />
          </div>
          <div className="flex-col flex-col--4 flex-col--tablet--4 flex-col--mobile--4 flex-col--tablet-large--3 flex-col--medium--5 flex-container--mobile-no-padding results__amend">
            <Button
              alt={true}
              text="Refresh"
              icon="sync-alt"
              onClick={() => {
                resultsStore.postcodeChange(this.state.postcode);
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
