import React from 'react';
import { observer } from 'mobx-react';

import SearchStore from './store';

import { withRouter } from 'react-router';

import './Search.scss';
import CategoryList from '../CategoryList';
import Input from '../Input';
import cx from 'classnames';
import Button from '../Button';

class SearchSection extends React.Component<any> {
  render() {
    return (
      <section className="search__container row">
        <div className="search__inner-container row">
          <div className="search__input">
            <h1 className="search__heading">I'm looking for</h1>
            <Input placeholder="Search for services, groups and activities" />
            <Button text="Search" icon="search" />
          </div>
          <div className={cx('row', 'search__categories')}>
            <h2>Or browse by category</h2>
            <CategoryList history={this.props.history} categories={SearchStore.categories} />
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(observer(SearchSection));
