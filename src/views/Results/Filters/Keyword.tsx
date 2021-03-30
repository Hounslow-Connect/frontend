import React, { Fragment, Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import { withRouter, RouteComponentProps } from 'react-router';
import queryString from 'query-string';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import ResultsStore from '../../../stores/resultsStore';
import KeywordFilter from './KeywordFilter';
import WindowSizeStore from '../../../stores/windowSizeStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UIStore from '../../../stores/uiStore';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
  windowSizeStore?: WindowSizeStore;
  uiStore?: UIStore;
}

interface IState {
  keyword: string;
  postcode: string;
  errors: any;
}

@inject('resultsStore', 'windowSizeStore', 'uiStore')
@observer
class Keyword extends Component<IProps, IState> {
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
    const { resultsStore, windowSizeStore, uiStore, history } = this.props;

    if (!resultsStore || !windowSizeStore || !uiStore) {
      return null;
    }
    return (
      <Fragment>
        {/* Mobile Dropdown */}
        {uiStore.keywordEditOpen && (
          <div className="results__overview">
            <div className="flex-col">
              <div
                role="button"
                aria-label="Close edit popup"
                onClick={() => {
                  window.scrollTo(0, 0);
                  uiStore.toggleKeywordEdit();
                }}
              >
                <span className="results__overview__edit-toggle">
                  <FontAwesomeIcon icon="chevron-left" /> Back
                </span>
              </div>
            </div>
            <div className="flex-col">
              <h1>Search Results</h1>
            </div>
            <form>
              <div className="flex-col">
                <label htmlFor="keyword">
                  <h2>I'm looking for</h2>
                </label>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleInputChange(e.target.value, 'keyword')
                  }
                  id="keyword"
                  value={this.state.keyword}
                  fullWidth={true}
                  className="results__overview__edit-input"
                  error={this.state.errors.keyword}
                  errorMessage="Please enter a search term"
                />
              </div>
              <div className="flex-col">
                <h2>Filter results by</h2>
                <div className="flex-container flex-container--mobile-no-padding results__overview__edit-filters">
                  <div className="flex-col flex-col--mobile--6">
                    <label htmlFor="location" className="results__overview__filters-heading">
                      Location
                    </label>
                    <Input
                      id="location"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        this.handleInputChange(e.target.value, 'postcode')
                      }
                      className="results__overview__filter-location"
                      placeholder="Postcode"
                      value={this.state.postcode}
                    />
                  </div>
                  <div className="flex-col flex-col--mobile--4">
                    <p className="results__overview__filters-heading--heading">Cost</p>
                    <Checkbox
                      id="is_free"
                      label="Free"
                      checked={get(resultsStore, 'is_free', false)}
                      onChange={() => {
                        resultsStore.toggleIsFree();
                      }}
                      className="results__overview__edit-checkbox"
                    />
                  </div>
                </div>
                <div className="flex-col results__overview__edit-submit">
                  <Button
                    icon="search"
                    text="Search"
                    onClick={() => {
                      this.handleAmend(() => {
                        resultsStore.postcodeChange(this.state.postcode);
                        uiStore.toggleKeywordEdit();
                        history.push({ search: resultsStore.amendSearch(this.state.keyword) });
                      });
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
        <div className="flex-container">
          {/* Mobile Edit  */}
          <div className="mobile-show tablet-show tablet--large-show flex-col flex-col--mobile--7">
            <h1>Search results</h1>
            <p>{this.state.keyword}</p>
          </div>
          <div className="mobile-show tablet-show tablet--large-show  flex-col flex-col--mobile--5 results__mobile-edit">
            <Button text="Edit Search" size="small" onClick={() => uiStore.toggleKeywordEdit()} />
          </div>

          {/* Desktop */}

          <div className="flex-col flex-col--12 mobile-hide tablet-hide tablet--large-hide">
            <h1 className="results__overview__heading">Search results</h1>
          </div>
          <form
            className="flex-container mobile-hide tablet-hide tablet--large-hide results__overview__search-container"
            onSubmit={e => {
              e.preventDefault();
              history.push({
                search: resultsStore.updateQueryStringParameter('search_term', this.state.keyword),
              });
            }}
          >
            <div className="flex-col flex-col--6 results__overview__input-box">
              <label htmlFor="keyword">
                <h2>I'm looking for</h2>
              </label>
              <div className="flex-container flex-container--align-center" style={{ padding: 0 }}>
                <div className="flex-col--8 flex-col--medium--7">
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
                <div className="flex-col--4 flex-col--medium--4" style={{ textAlign: 'right' }}>
                  <Button
                    icon={windowSizeStore.isMobile ? undefined : 'search'}
                    text="Search"
                    onClick={() => {
                      history.push({
                        search: resultsStore.updateQueryStringParameter(
                          'search_term',
                          this.state.keyword
                        ),
                      });
                    }}
                    disabled={!this.state.keyword}
                  />
                </div>
              </div>
            </div>
            <div className="flex-col flex-col--6">
              <KeywordFilter />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Keyword);
