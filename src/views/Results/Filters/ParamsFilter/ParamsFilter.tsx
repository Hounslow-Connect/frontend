import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import queryString from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';

import Autocomplete from '../../../../components/Autocomplete';
import Checkbox from '../../../../components/Checkbox';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import ResultsStore from '../../../../stores/resultsStore';
import searchStore from '../../../../stores/searchStore';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
}

/**
 * TODO:
 * - replace search button with auto search functionality each time search term or filters are changed
 * - push filters into the url as parms and auto-search on page refresh using those filters
 */

interface IState {
  keyword: string;
  postcode: string;
  errors: any;
  showFilters: boolean;
}

@inject('resultsStore')
@observer
class Filter extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      keyword: '',
      postcode: '',
      showFilters: false,
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

  search = () => {
   console.log('%c [search] -->', 'color: green;');
   
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

  toggleFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('[toggleFilters] -->e ', e);
    
    this.setState({
      showFilters: !this.state.showFilters
    });
  }

  render() {
    const { resultsStore, history } = this.props;

    if (!resultsStore) {
      return null;
    }

    return (
      <div className="results__filters">
        {/* {resultsStore.isKeywordSearch && 
          <h2 className="results__filters__heading">Results found for</h2>
        } */ }
         <h2 className="results__filters__heading">Search results</h2>
        <form
          className={"flex-container flex-container--align-bottom flex-container--no-padding"}
          onSubmit={e => {
            e.preventDefault();
            history.push({
              search: resultsStore.updateQueryStringParameter('search_term', this.state.keyword),
            });
          }}>
          <div className={resultsStore.isKeywordSearch ? "flex-col" : "flex-col flex-col--12"}>
            <div className="results__filters--primary">
              {!resultsStore.isKeywordSearch &&
                <div className="">
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      this.handleInputChange(e.target.value, 'keyword')
                    }
                    id="keyword"
                    value={this.state.keyword}
                    placeholder="Search using a keyword"
                    className="results__search-box-keyword"
                    error={this.state.errors.keyword}
                  />
                </div>
              }
              <div>
                <label className="results__search-filter-location--label" htmlFor="location" aria-label="Location">in</label>
              </div>
              <div
                className=""
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                
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

              <div>
                <label className="results__search-filter-location--label" htmlFor="proximityFilter" aria-label="Choose search radius">within</label>
              </div>

              <div
                className=""
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Select
                    options={[{value: '5', text: '5 miles'}]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      this.search()
                    }
                    className=""
                    placeholder="Mile radius"
                    id="proximityFilter"
                  />
                </div>
              
              <div className="">
                {/* <Button
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
                /> */}
                 <Checkbox
                  id="is_free"
                  label="Only show free"
                  checked={get(resultsStore, 'is_free', false)}
                  onChange={() => {
                    resultsStore.toggleIsFree();
                    resultsStore.setParams();
                  }}
                  aria="Filter free services"
                />
              </div>
            </div>

            <div className="results__filters--secondary">
              <div className={'flex-container flex-container--align-bottom flex-container--no-padding'}>
                <div className={'flex-col--8'}>
                  <h3>Filter your results</h3>
                  <p>You can get more personalised results by providing some extra information</p>
                </div>
                <div className={'flex-col--2'}>
                  <button onClick={this.toggleFilters} className={'button button__alt--small'}>{this.state.showFilters ? 'Hide' : 'Show' } filters</button>
                </div>
                
              </div>



              { this.state.showFilters && (
                <div className={'results__filters--group'}>
                {/* column */ }
                <div className={'results__filters--group__item'}>
                  <label>Age</label>
                  <Autocomplete hiddenField="organisation_taxonomy_id" multiSelect={true} store={ResultsStore} endpointEntity='age' />
                </div>
                {/* ./column */ }

                {/* column */ }
                <div className={'results__filters--group__item'}>
                  <label htmlFor="incomeFilter">Income</label>

                  <Select
                    options={[{value: '5', text: '5 miles'}]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      this.search()
                    }
                    className=""
                    placeholder="Select"
                    id="incomeFilter"
                  />
                </div>
                 {/* ./column */ }

                {/* column */ }
                <div className={'results__filters--group__item'}>
                  <label htmlFor="disabilityFilter">Disability</label>

                  <Select
                    options={[{value: '5', text: '5 miles'}]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      this.search()
                    }
                    className=""
                    placeholder="Select"
                    id="disabilityFilter"
                  />
                </div>
                 {/* ./column */ }

                {/* column */ }
                <div className={'results__filters--group__item'}>
                  <label htmlFor="languageFilter">Language</label>

                  <Select
                    options={[{value: 'english', text: 'English'}]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      this.search()
                    }
                    className=""
                    placeholder="Select"
                    id="languageFilter"
                  />
                </div>
                 {/* ./column */ }

                {/* column */ }
                <div className={'results__filters--group__item'}>
                  <label htmlFor="genderFilter">Gender</label>

                  <Select
                    options={[{value: 'male', text: 'Male'}, {value: 'female', text: 'Female'}]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      this.search()
                    }
                    className=""
                    placeholder="Select"
                    id="genderFilter"
                  />
                </div>
                 {/* ./column */ }
                
                {/* column */ }
                <div className={'results__filters--group__item'}>
                  <label htmlFor="ethnicityFilter">Ethnicity</label>

                  <Select
                    options={[{value: 'male', text: 'Male'}, {value: 'female', text: 'Female'}]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      this.search()
                    }
                    className=""
                    placeholder="Select"
                    id="ethnicityFilter"
                  />
                </div>
                 {/* ./column */ }

                {/* column */ }
                <div className={'results__filters--group__item'}>
                  <label htmlFor="housingFilter">Housing</label>

                  <Select
                    options={[{value: 'male', text: 'Male'}, {value: 'female', text: 'Female'}]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      this.search()
                    }
                    className=""
                    placeholder="Select"
                    id="housingFilter"
                  />
                </div>
                 {/* ./column */ }

                {/* column */ }
                <div className={'results__filters--group__item'}>
                  <label htmlFor="accessibilityFilter">Accessibility</label>

                  <Select
                    options={[{value: 'male', text: 'Male'}, {value: 'female', text: 'Female'}]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      this.search()
                    }
                    className=""
                    placeholder="Select"
                    id="accessibilityFilter"
                  />
                </div>
                 {/* ./column */ }
                
              </div>
              )}
                

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
