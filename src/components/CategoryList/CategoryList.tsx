import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import get from 'lodash/get';

import './CategoryList.scss';

import { ICategory } from '../../types/types';
import Button from '../Button';

import CMSStore from '../../stores/CMSStore';

interface IProps extends RouteComponentProps {
  categories: ICategory[];
  covid?: boolean;
  title?: string;
}

const CategoryList: React.FunctionComponent<IProps> = ({ history, categories, covid = false, title }) => (
  <div className="category-list">
    <h3 className="category-list__heading">{title}</h3>
    <div className="category-list__items">
      {categories.map(({ name, id, icon }) => (
        <Button
          category={true}
          text={name}
          key={id}
          size="small"
          icon={icon}
          onClick={() => {
            history.push({
              pathname: '/results',
              search: `?category=${id}`,
            });
          }}
          covid={covid}
        />
      ))}
    </div>
  </div>
);

export default withRouter(observer(CategoryList));
