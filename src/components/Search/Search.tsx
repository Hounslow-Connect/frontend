import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import map from 'lodash/map';
import { withRouter, RouteComponentProps } from 'react-router';

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
    return (
      <Fragment>
        <section className="flex-container flex-container--justify search__container">
          <form className="search__inner-container flex-col" aria-label="Search">
            <div className="search__input">
              <label htmlFor="search">
                <h1 className="search__heading">{get(cmsStore, 'home.search_title')}</h1>
              </label>
              <Input
                placeholder="Search for services, groups and activities"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => SearchStore.onChange(e)}
                id="search"
                value={SearchStore.search}
              />
              {!isMobile && (
                <Button
                  text="Search"
                  icon="search"
                  type="submit"
                  onClick={() =>
                    history.push({
                      pathname: '/results',
                      search: `?search_term=${SearchStore.search}`,
                    })
                  }
                />
              )}
            </div>
            <label className="search__heading search__heading--category" htmlFor="category">
              {get(cmsStore, 'home.categories_title')}
            </label>
            {isMobile && (
              <Fragment>
                <p className="search__category-subtitle">
                  {get(cmsStore, 'home.personas_content')}
                </p>
                <Select
                  options={options}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => SearchStore.setCategory(e)}
                  className="search__category--mobile"
                  placeholder="Category List"
                  id="category"
                />
                <Button
                  text="Search"
                  icon="search"
                  size="small"
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
