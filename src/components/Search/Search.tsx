import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import map from 'lodash/map';
import { withRouter, RouteComponentProps } from 'react-router';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchStore from './store';

import './Search.scss';
import CategoryList from '../CategoryList';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Personas from '../Personas';
import WindowSizeStore from '../../stores/windowSizeStore';
import CMSStore from '../../stores/CMSStore';
import get from 'lodash/get';

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
        <section className="flex-container flex-container--justify search__container">
          <form className="flex--col--12 search__inner-container">
            <div className="flex-container flex-container--mobile-no-padding">
              <div
                className={cx('flex-col--12 search__input flex-col--mobile--12', {
                  'flex-col--mobile--12': isMobile,
                })}
              >
                <div className="flex-container flex-container--align-center flex-container--mobile-no-padding search__input--row">
                  <div className="flex-col--12">
                    <label htmlFor="search">
                      <h1 className="search__heading">{get(cmsStore, 'home.search_title')}</h1>
                    </label>
                  </div>
                  <div
                    className="flex-container flex-container--align-center flex-container--mobile-no-padding"
                    style={{
                      width: '100%',
                      padding: 0,
                      justifyContent: 'start',
                      marginBottom: 24,
                    }}
                  >
                    <div
                      className={cx('flex-col--6 flex-col--tablet-large--6', {
                        'flex-col--mobile--12': isMobile,
                      })}
                    >
                      <Input
                        placeholder="Search for services, groups and activities"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          SearchStore.onChange(e)
                        }
                        id="search"
                        value={SearchStore.search}
                      />
                    </div>
                    {!isMobile && (
                      <div className="flex-col--3 flex-col--tablet-large--5">
                        <Button
                          text="Search"
                          icon="search"
                          type="submit"
                          onClick={(e: React.FormEvent) => {
                            e.preventDefault();
                            history.push({
                              pathname: '/results',
                              search: `?search_term=${SearchStore.search}`,
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-col--12">
                {!!SearchStore.covidCategories.length && (
                  <Fragment>
                    <label className="search__heading" htmlFor="category">
                      COVID-19 <FontAwesomeIcon icon="virus" />
                    </label>
                    <div className="flex-col--6 flex-col--mobile--12">
                      <p className="search__category-subtitle">
                        The government has now stated that everyone must stay at home to help stop
                        the spread of coronavirus. Here you can find out what you can do to take
                        care of yourself and your community whilst staying at home.
                      </p>
                    </div>
                    {!isMobile && (
                      <div className="search__cateogry-list" style={{ marginBottom: 24 }}>
                        <CategoryList categories={SearchStore.covidCategories} covid={true} />
                      </div>
                    )}

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
                )}

                <label className="search__heading" htmlFor="category">
                  {get(cmsStore, 'home.categories_title')}
                </label>
                {isMobile && (
                  <Fragment>
                    <p className="search__category-subtitle">
                      {get(cmsStore, 'home.personas_content')}
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
                    <Button
                      text="Search"
                      icon="search"
                      size="small"
                      type="submit"
                      onClick={() =>
                        SearchStore.categoryId
                          ? history.push({
                              pathname: '/results',
                              search: `?category=${SearchStore.categoryId}`,
                            })
                          : history.push({
                              pathname: '/results',
                              search: `?search_term=${SearchStore.search}`,
                            })
                      }
                    />
                  </Fragment>
                )}
                {!isMobile && (
                  <div className="search__cateogry-list">
                    <CategoryList categories={SearchStore.categories} />
                  </div>
                )}
              </div>
            </div>
          </form>
        </section>
        <section>
          <Personas personas={SearchStore.personas} />
        </section>
      </Fragment>
    );
  }
}

export default withRouter(Search);
