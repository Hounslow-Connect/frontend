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
  keyword: string;
  postcode: string;
  errors: any;
}

@inject('resultsStore')
@observer
class Filter extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      keyword: '',
      postcode: '',
      errors: {
        keyword: false,
      },
    };
  }

  componentDidMount() {
    const { search_term, location } = queryString.parse(this.props.location.search);

    if (search_term) {
      this.setState({
        keyword: search_term as string,
      });
    }

    if (location) {
      this.setState({
        postcode: location as string,
      });
    }
  }

  handleInputChange = (string: string, field: string) => {
    // @ts-ignore
    this.setState({
      [field]: string,
    });
  };

  validate = async () => {
    return this.setState({
      errors: {
        keyword: !this.state.keyword,
      },
    });
  };

  handleAmend = async (callback: () => void) => {
    await this.validate();

    const canSubmit = Object.values(this.state.errors).every(error => error === false);

    if (canSubmit) {
      return callback();
    } else {
      return;
    }
  };

  render() {
    const { resultsStore, history } = this.props;

    if (!resultsStore) {
      return null;
    }

    return (
      <div className="results__filters">
        {resultsStore.isKeywordSearch && 
          <h2 className="results__filters__heading">Results found for</h2>
        }
        <form
          className={"flex-container flex-container--align-bottom flex-container--no-padding" + (!resultsStore.isKeywordSearch ? " flex-container--column-reverse" : "")}
          onSubmit={e => {
            e.preventDefault();
            history.push({
              search: resultsStore.updateQueryStringParameter('search_term', this.state.keyword),
            });
          }}>
          <div className={resultsStore.isKeywordSearch ? "flex-col" : "flex-col flex-col--12"}>
            <div className="flex-container flex-container--no-padding flex-container--no-space">
              {resultsStore.isKeywordSearch &&
                <div className="flex-col">
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleInputChange(e.target.value, 'keyword')
                    }
                    id="keyword"
                    value={this.state.keyword}
                    className="results__search-box-keyword"
                    error={this.state.errors.keyword}
                  />
                </div>
              }
              <div className="flex-col">
                <label className="results__search-filter-location--label" htmlFor="location" aria-label="Location">in</label>
                <Input
                  id="location"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleInputChange(e.target.value, 'postcode')
                  }
                  className="results__search-filter-location"
                  placeholder="Postcode"
                  value={this.state.postcode}
                />
              </div>
              <div className="flex-col">
                <Button
                  icon="search"
                  text="Search"
                  onClick={() => {
                    history.push({
                      search: resultsStore.updateQueryStringParameter(
                        'search_term',
                        this.state.keyword
                      ),
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className={"results__filters__checkboxes " + (resultsStore.isKeywordSearch ? "flex-col" : "flex-col flex-col--12")}
            style={{
              marginBottom: !resultsStore.isKeywordSearch ? 24 : 0
            }}>
            <h3 className="results__filters__heading">Filter by</h3>
            <div className="flex-container flex-container--no-padding flex-container--no-space">
              <Checkbox
                id="is_free"
                label="Free"
                checked={get(resultsStore, 'is_free', false)}
                onChange={() => {
                  resultsStore.toggleIsFree();
                }}
                aria="Filter free services"
              />
              <Checkbox
                id="open_now"
                label="Open now"
                checked={get(resultsStore, 'open_now', false)}
                onChange={() => {
                  resultsStore.toggleOpenNow();
                }}
                aria="Filter services that are open now"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Filter);
