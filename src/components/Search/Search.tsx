import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import map from 'lodash/map';
import { withRouter, RouteComponentProps } from 'react-router';
import cx from 'classnames';
import get from 'lodash/get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchStore from '../../stores/searchStore';

import './Search.scss';
import CategoryList from '../CategoryList';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import WindowSizeStore from '../../stores/windowSizeStore';
import CMSStore from '../../stores/CMSStore';

interface IProps extends RouteComponentProps {
  windowSizeStore?: WindowSizeStore;
  cmsStore?: CMSStore;
}

@inject('windowSizeStore', 'cmsStore')
@observer
class Search extends React.Component<IProps> {
  componentWillUnmount() {
    SearchStore.clear();
  }

  render() {
    const { windowSizeStore, cmsStore, history } = this.props;

    // injected stores must be typed as optional, but will always be there if injected. Allows workound for destructuring values from store
    if (!windowSizeStore || !cmsStore) {
      return null;
    }

    const { isMobile } = windowSizeStore;
    const options = map(SearchStore.categories, ({ name, id }) => ({ value: id, text: name }));
    const covidOptions = map(SearchStore.covidCategories, ({ name, id }) => ({
      value: id,
      text: name,
    }));

    return (
      <Fragment>
        <section className="search__container">
          <div className="flex-container flex-container--justify">
            <form className="flex--col--12 search__inner-container">
              <div className="flex-container flex-container--no-padding">
                <div
                  className={cx('flex-col--12 search__input flex-col--mobile--12', {
                    'flex-col--mobile--12': isMobile,
                  })}
                >
                  <div className="flex-container flex-container--align-center flex-container--mobile-no-padding search__input--row">
                    <div className="flex-col--12">
                      <label htmlFor="search">
                        <h2 className="search__heading">{get(cmsStore, 'home.search_title')}</h2>
                      </label>
                    </div>
                    <div
                      className="flex-container flex-container--no-padding flex-container--justify"
                      style={{
                        margin: 0
                      }}
                    >
                      <div className="flex-col--mobile--12">
                        <Input
                          placeholder="Search for services, groups and activities"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            SearchStore.onChange(e, 'search')
                          }
                          className="results__search-box-keyword"
                          id="search"
                          value={SearchStore.search}
                        />
                      </div>
                      <div className="flex-col results__search-filter">
                        <label className="results__search-filter-location--label" htmlFor="location" aria-label="Location">in</label>
                        <Input
                          id="location"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            SearchStore.onChange(e, 'location')
                          }
                          className="results__search-filter-location"
                          placeholder="Postcode or town"
                          value={SearchStore.location}
                        />
                      </div>
                      {isMobile && (
                        <Fragment>
                          <p className="search__category-subtitle">
                            {get(cmsStore, 'home.categories_title')}
                          </p>
                          <Select
                            options={options}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                              SearchStore.setCategory(e)
                            }
                            className="search__category--mobile"
                            placeholder="Category List"
                            id="category"
                          />
                        </Fragment>
                      )}
                      <div className="flex-col--mobile--12">
                        <Button
                          text="Search"
                          icon="search"
                          type="submit"
                          onClick={(e: React.FormEvent) => {
                            e.preventDefault();
                            history.push({
                              pathname: '/results',
                              search: `?search_term=${SearchStore.search}&location=${SearchStore.location}`,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {!!SearchStore.covidCategories.length && (
                  <div className="flex-col--12">
                    <Fragment>
                      <label className="search__heading" htmlFor="category">
                        <h2>
                          COVID-19 <FontAwesomeIcon icon="virus" />
                        </h2>
                      </label>
                      <div className="flex-col--6 flex-col--mobile--12">
                        <p className="search__category-subtitle">
                          Find up to date information and support in Hounslow to help you take care
                          of yourself and your community.
                        </p>
                      </div>

                      {isMobile && (
                        <Fragment>
                          <Select
                            options={covidOptions}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                              SearchStore.setCategory(e)
                            }
                            className="search__category--mobile"
                            placeholder="Category List"
                            id="category"
                          />
                        </Fragment>
                      )}
                    </Fragment>
                  </div>
                )}
              </div>
            </form>
            
            {!isMobile &&
              <CategoryList categories={SearchStore.categories} title={get(cmsStore, 'home.categories_title')} />
            }
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(Search);
