import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import map from 'lodash/map';

import SearchStore from './store';

import { withRouter } from 'react-router';

import './Search.scss';
import CategoryList from '../CategoryList';
import Input from '../Input';
import Select from '../Select';
import cx from 'classnames';
import Button from '../Button';

@inject('windowSizeStore')
@observer
class SearchSection extends React.Component<any> {
  render() {
    const { windowSizeStore } = this.props;
    const { isMobile } = windowSizeStore;
    const options = map(SearchStore.categories, ({ name, id }) => ({ value: id, text: name }));

    return (
      <section className="search__container row">
        <div className="search__inner-container row">
          <div className="search__input">
            <h1 className="search__heading">I'm looking for</h1>
            <Input placeholder="Search for services, groups and activities" />
            {!isMobile && <Button text="Search" icon="search" />}
          </div>
          <h2
            className={cx({
              'search__category-heading': !isMobile,
            })}
          >
            Or browse by category
          </h2>
          {isMobile && (
            <Fragment>
              <p className="search__category-subtitle">
                Sometimes it's hard to know where to start - here are some suggestions
              </p>
              <Select
                options={options}
                onChange={(e: any) => console.log(e.target.value)}
                className="search__category--mobile"
                placeholder="Category List"
              />
              <Button text="Search" icon="search" size="small" />
            </Fragment>
          )}
          {!isMobile && (
            <div className="search__cateogry-list">
              <CategoryList history={this.props.history} categories={SearchStore.categories} />
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default withRouter(SearchSection);
