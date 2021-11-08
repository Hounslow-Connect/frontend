import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { EventEmitter } from '../../../../utils/events';
import get from 'lodash/get';
import _first from 'lodash/first';
import _isEmpty from 'lodash/isEmpty';
import { withRouter, RouteComponentProps } from 'react-router';

import StaticAutocomplete from '../../../../components/StaticAutocomplete';
import Checkbox from '../../../../components/Checkbox';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import ResultsStore from '../../../../stores/resultsStore';

interface IProps extends RouteComponentProps {
  resultsStore?: ResultsStore;
}

interface IState {
  errors: any;
  showFilters: boolean;
  typingTimeoutId: any;
}

@inject('resultsStore')
@observer
class Filter extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      showFilters: false,
      typingTimeoutId: undefined,
      errors: {
        keyword: false,
      },
    };
  }

  componentWillUnmount() {
    const { resultsStore } = this.props;
    if (resultsStore) {
      resultsStore.clear();
    }
  }

  validate = async () => {
    const { resultsStore } = this.props;
    return this.setState({
      errors: {
        keyword: !(resultsStore && resultsStore.keyword),
      },
    });
  };

  // This will be called each time a search is triggered
  search = () => {
    const { resultsStore, history } = this.props;
    if (resultsStore) {
      // @ts-ignore
      resultsStore.setParams();
      history.push({
        search: resultsStore.getQueryParamsString(),
      });
    }
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
    if (e) {
      e.preventDefault();
    }

    this.setState({
      showFilters: !this.state.showFilters,
    });
  };

  resetFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { resultsStore } = this.props;
    if (e) {
      e.preventDefault();
    }
    if (resultsStore) {
      resultsStore.clearFilters();
    }
    this.toggleFilters(e);
    // @ts-ignore
    EventEmitter.dispatch('filtersCleared', e);
    this.search();
  };

  getFilterOptions = (name: string) => {
    const { resultsStore } = this.props;

    if (!name || !resultsStore) {
      return;
    }

    const { serviceEligibilityOptions } = resultsStore;
    let options: any = [];

    const group: any = _first(
      serviceEligibilityOptions.filter(
        (eligibility: any) => name.toLowerCase() === eligibility.name.split(' ')[0].toLowerCase()
      )
    );

    if (group && group.children) {
      const eligibilityOptions = [{ text: 'Any', value: '' }];
      group.children.forEach((item: any) => {
        eligibilityOptions.push({ text: item.name, value: item.name });
      });

      options = eligibilityOptions;
    }

    return options;
  };

  render() {
    const { resultsStore } = this.props;

    if (!resultsStore) {
      return null;
    }

    return (
      <div className="results__filters">
        {resultsStore.isKeywordSearch && (
          <h2 className="results__filters__heading">Search results</h2>
        )}
        <form
          onSubmit={e => {
            e.preventDefault();
            this.search();
          }}
        >
          <div className={resultsStore.isKeywordSearch ? 'flex-col' : 'flex-col flex-col--12'}>
            <div className="results__filters--primary">
              {resultsStore.isKeywordSearch && (
                <div className="">
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const target = e.target || null;
                      if (resultsStore) {
                        resultsStore.setKeyword(target.value);
                      }

                      if (this.state.typingTimeoutId) {
                        clearTimeout(this.state.typingTimeoutId);
                      }

                      this.setState({
                        typingTimeoutId: setTimeout(() => {
                          this.search();
                        }, 500),
                      });
                    }}
                    id="keyword"
                    value={resultsStore.keyword || ''}
                    placeholder="Search using a keyword"
                    className="results__search-box-keyword"
                    error={this.state.errors.keyword}
                  />
                </div>
              )}

              <div
                className=""
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <label
                  className="results__filters--primary__label"
                  htmlFor="location"
                  aria-label="Location"
                >
                  in
                </label>

                <Input
                  id="location"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const target = e.target || null;

                    if (resultsStore) {
                      resultsStore.setPostcode(target.value);
                    }

                    if (this.state.typingTimeoutId) {
                      clearTimeout(this.state.typingTimeoutId);
                    }

                    this.setState({
                      typingTimeoutId: setTimeout(() => {
                        this.search();
                      }, 500),
                    });
                  }}
                  className="results__search-filter-location"
                  placeholder="Postcode"
                  value={resultsStore.postcode}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label
                  className="results__filters--primary__label"
                  htmlFor="proximityFilter"
                  aria-label="Choose search radius"
                >
                  within
                </label>
                <Select
                  disabled={!resultsStore.postcode}
                  options={[
                    { value: '1', text: '1 Mile' },
                    { value: '3', text: '3 Miles' },
                    { value: '5', text: '5 Miles' },
                    { value: '10', text: '10 Miles' },
                    { value: '20', text: '20 Miles' },
                  ]}
                  value={`${resultsStore.distance || '1'}`}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    resultsStore.setDistance(e.target.value);
                    this.search();
                  }}
                  className=""
                  placeholder="Mile radius"
                  id="proximityFilter"
                />
              </div>

              <div className="">
                <Checkbox
                  id="is_free"
                  label="Only show free"
                  checked={get(resultsStore, 'is_free', false)}
                  onChange={() => {
                    resultsStore.toggleIsFree();
                    this.search();
                  }}
                  aria="Filter free services"
                />
              </div>
            </div>

            <div className="results__filters--secondary">
              <div
                className={'flex-container flex-container--align-top flex-container--no-padding'}
              >
                <div className={'flex-col-12 flex-col-medium-8 flex-col--gutter'}>
                  <h3>Filter your results</h3>
                  <p>You can get more personalised results by providing some extra information</p>
                </div>
                <div className={'flex-col-12 flex-col-medium-2 flex-col--gutter'}>
                  <button onClick={this.toggleFilters} className={'button button__alt--small'}>
                    {this.state.showFilters ? 'Hide' : 'Show'} filters
                  </button>
                </div>
              </div>

              {this.state.showFilters && (
                <div>
                  <div className={'results__filters--group flex-col--gutter'}>
                    {/* column */}
                    {!_isEmpty(this.getFilterOptions('age')) && (
                      <div className={'results__filters--group__item'}>
                        <label>Age</label>
                        <StaticAutocomplete
                          defaultValues={resultsStore.filters.age
                            ?.split(',')
                            .map((item: string) => ({ value: item, label: item }))}
                          clickHandler={this.search}
                          options={this.getFilterOptions('age')}
                          storeTextField="age"
                          multiSelect={true}
                          store={resultsStore}
                        />
                      </div>
                    )}
                    {/* ./column */}

                    {/* column */}
                    {!_isEmpty(this.getFilterOptions('income')) && (
                      <div className={'results__filters--group__item'}>
                        <label htmlFor="incomeFilter">Income</label>

                        <StaticAutocomplete
                          defaultValues={resultsStore.filters.income
                            ?.split(',')
                            .map((item: string) => ({ value: item, label: item }))}
                          clickHandler={this.search}
                          options={this.getFilterOptions('income')}
                          storeTextField="income"
                          multiSelect={true}
                          store={resultsStore}
                        />
                      </div>
                    )}
                    {/* ./column */}

                    {/* column */}
                    {!_isEmpty(this.getFilterOptions('disability')) && (
                      <div className={'results__filters--group__item'}>
                        <label htmlFor="disabilityFilter">Disability</label>

                        <StaticAutocomplete
                          defaultValues={resultsStore.filters.disability
                            ?.split(',')
                            .map((item: string) => ({ value: item, label: item }))}
                          clickHandler={this.search}
                          options={this.getFilterOptions('disability')}
                          storeTextField="disability"
                          multiSelect={true}
                          store={resultsStore}
                        />
                      </div>
                    )}
                    {/* ./column */}

                    {/* column */}
                    {!_isEmpty(this.getFilterOptions('language')) && (
                      <div className={'results__filters--group__item'}>
                        <label htmlFor="languageFilter">Language</label>
                        <StaticAutocomplete
                          defaultValues={resultsStore.filters.language
                            ?.split(',')
                            .map((item: string) => ({ value: item, label: item }))}
                          clickHandler={this.search}
                          options={this.getFilterOptions('language')}
                          storeTextField="language"
                          multiSelect={true}
                          store={resultsStore}
                        />
                      </div>
                    )}
                    {/* ./column */}

                    {/* column */}
                    {!_isEmpty(this.getFilterOptions('gender')) && (
                      <div className={'results__filters--group__item'}>
                        <label htmlFor="genderFilter">Gender</label>

                        <StaticAutocomplete
                          defaultValues={resultsStore.filters.gender
                            ?.split(',')
                            .map((item: string) => ({ value: item, label: item }))}
                          clickHandler={this.search}
                          options={this.getFilterOptions('gender')}
                          storeTextField="gender"
                          multiSelect={true}
                          store={resultsStore}
                        />
                      </div>
                    )}
                    {/* ./column */}

                    {/* column */}
                    {!_isEmpty(this.getFilterOptions('ethnicity')) && (
                      <div className={'results__filters--group__item'}>
                        <label htmlFor="ethnicityFilter">Ethnicity</label>

                        <StaticAutocomplete
                          defaultValues={resultsStore.filters.ethnicity
                            ?.split(',')
                            .map((item: string) => ({ value: item, label: item }))}
                          clickHandler={this.search}
                          options={this.getFilterOptions('ethnicity')}
                          storeTextField="ethnicity"
                          multiSelect={true}
                          store={resultsStore}
                        />
                      </div>
                    )}
                    {/* ./column */}

                    {/* column */}
                    {!_isEmpty(this.getFilterOptions('housing')) && (
                      <div className={'results__filters--group__item'}>
                        <label htmlFor="housingFilter">Housing</label>

                        <StaticAutocomplete
                          defaultValues={resultsStore.filters.housing
                            ?.split(',')
                            .map((item: string) => ({ value: item, label: item }))}
                          clickHandler={this.search}
                          options={this.getFilterOptions('housing')}
                          storeTextField="housing"
                          multiSelect={true}
                          store={resultsStore}
                        />
                      </div>
                    )}
                    {/* ./column */}
                  </div>

                  <button onClick={this.resetFilters} className={'link results__filters--remove'}>
                    Remove all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Filter);
