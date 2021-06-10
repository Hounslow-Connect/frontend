import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import _first from 'lodash/first';
import queryString from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
// import { IEligibilityFilters } from '../../../../types/types';

import StaticAutocomplete from '../../../../components/StaticAutocomplete';
import Checkbox from '../../../../components/Checkbox';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import ResultsStore from '../../../../stores/resultsStore';
import SearchStore from '../../../../stores/searchStore';
import searchStore from '../../../../stores/searchStore';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
}

/**
 * TODO:
 * - replace search button with auto search functionality each time search term or filters are changed
 * - populate filter options from api endpoint
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
      }
    };
  }

  // componentWillUnmount() {
  //   SearchStore.clear();
  // }

  componentDidMount() {
    const { search_term, location } = queryString.parse(this.props.location.search);

    // console.log('[componentDidMount()] --> SearchStore.filters', SearchStore.filters);
    
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

  componentDidUpdate(prevProps: any) {
    console.log('[componentDidUpdate] --> prevProps', prevProps,  'SearchStore.filters', SearchStore.filters);
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
    // This will be called each time a search is triggered
   console.log('%c [search] -->', 'color: green;');
   console.log('[search] --> url query: ', JSON.stringify(SearchStore.filters));
   
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
    if(e) e.preventDefault()
    console.log('[toggleFilters] -->e ', e);
    
    this.setState({
      showFilters: !this.state.showFilters
    });
  }

  resetFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(e) e.preventDefault()
    console.log('[resetFilters] -->');
    searchStore.clearFilters()
  }

  getFilterOptions = (name: string) => { 
    if(!name) return
    const { serviceEligibilityOptions } = SearchStore
    let options = null

    let group:any = _first(serviceEligibilityOptions.filter((eligibility: any) => name.toLowerCase() === eligibility.name.split(' ')[0].toLowerCase()))

    if(group && group.children) {
      options = group.children.map((item: any) => { return { text: item.name, value: item.id } } )
    }
    
    return options
  }

  render() {
    const { resultsStore, history } = this.props;

    console.log('[getFilterOptions] age --> ', this.getFilterOptions('age'));

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
  
              <div
                className=""
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <label className="results__filters--primary__label" htmlFor="location" aria-label="Location">in</label>
                
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

              <div
                className=""
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <label className="results__filters--primary__label" htmlFor="proximityFilter" aria-label="Choose search radius">within</label>
                  <Select
                    options={[{value: '5', text: '5 miles'}]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      this.search()
                    }
                     
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
              <div className={'flex-container flex-container--align-top flex-container--no-padding'}>
                <div className={'flex-col-12 flex-col-medium-8 flex-col--gutter'}>
                  <h3>Filter your results</h3>
                  <p>You can get more personalised results by providing some extra information</p>
                </div>
                <div className={'flex-col-12 flex-col-medium-2 flex-col--gutter'}>
                  <button onClick={this.toggleFilters} className={'button button__alt--small'}>{this.state.showFilters ? 'Hide' : 'Show' } filters</button>
                </div>
              </div>

              { this.state.showFilters && (
                <div>
                  <div className={'results__filters--group flex-col--gutter'}>
                    {/* column */ }
                    { this.getFilterOptions('age') && <div className={'results__filters--group__item'}>
                      <label>Age</label>
                      <StaticAutocomplete options={this.getFilterOptions('age')} storeValueField="age" storeTextField="age" multiSelect={true} store={SearchStore} />
                    </div>}
                    {/* ./column */ }

                    {/* column */ }
                    { this.getFilterOptions('income') && <div className={'results__filters--group__item'}>
                      <label htmlFor="incomeFilter">Income</label>

                      <Select
                        options={this.getFilterOptions('income')}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          SearchStore.handleInput('income', e.target.value)
                          this.search()
                        }}
                        placeholder="Select" id="incomeFilter"
                      />
                    </div>}
                    {/* ./column */ }

                    {/* column */ }
                    { this.getFilterOptions('disability') && <div className={'results__filters--group__item'}>
                      <label htmlFor="disabilityFilter">Disability</label>

                      <Select
                        options={this.getFilterOptions('disability')}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          SearchStore.handleInput('disability', e.target.value)
                          this.search()
                        }}
                        placeholder="Select" id="disabilityFilter"
                      />
                    </div>}
                    {/* ./column */ }

                    {/* column */ }
                    { this.getFilterOptions('language') && <div className={'results__filters--group__item'}>
                      <label htmlFor="languageFilter">Language</label>

                      <Select
                        options={this.getFilterOptions('language')}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          SearchStore.handleInput('language', e.target.value)
                          this.search()
                        }}
                        placeholder="Select" id="languageFilter"
                      />
                    </div>}
                    {/* ./column */ }

                    {/* column */ }
                    { this.getFilterOptions('gender') && <div className={'results__filters--group__item'}>
                      <label htmlFor="genderFilter">Gender</label>

                      <Select
                        options={this.getFilterOptions('gender')}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          SearchStore.handleInput('gender', e.target.value)
                          this.search()
                        }}
                        placeholder="Select" id="genderFilter"
                      />
                    </div>}
                    {/* ./column */ }
                    
                    {/* column */ }
                    { this.getFilterOptions('ethnicity') && <div className={'results__filters--group__item'}>
                      <label htmlFor="ethnicityFilter">Ethnicity</label>

                      <Select
                        options={this.getFilterOptions('ethnicity')}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          SearchStore.handleInput('ethnicity', e.target.value)
                          this.search()
                        }}
                        placeholder="Select" id="ethnicityFilter"
                      />
                    </div>}
                    {/* ./column */ }

                    {/* column */ }
                    { this.getFilterOptions('housing') && <div className={'results__filters--group__item'}>
                      <label htmlFor="housingFilter">Housing</label>

                      <Select
                        options={this.getFilterOptions('housing')}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          SearchStore.handleInput('housing', e.target.value)
                          this.search()
                        }}
                        placeholder="Select" id="housingFilter"
                      />
                    </div> }
                    {/* ./column */ }
                    
                  </div>

                  <div className={'flex-container flex-container--align-bottom flex-container--no-padding flex-container--right'}>
                    <button onClick={this.resetFilters} className={'link'}>Remove all filters</button>
                  </div>
                  
                </div>
              )}
            </div>
          </div>
          {/* <div
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
          </div> */}
        </form>
      </div>
    );
  }
}

export default withRouter(Filter);
