import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import './CategoryList.scss';

import { ICategory } from '../../types/types';
import Button from '../Button';

const requestImageFile = require.context(
  '../../assets/images/category-images/',
  true,
  /^\.\/.*\.svg$/
);

interface IProps extends RouteComponentProps {
  categories: ICategory[];
  covid?: boolean;
  title?: string;
}

const CategoryList: React.FunctionComponent<IProps> = ({
  history,
  categories,
  covid = false,
  title,
}) => (
  <div className="category-list">
    {title && <h3 className="category-list__heading">{title}</h3>}
    <div className="category-list__items">
      {categories.map(({ name, id, icon }) => {
        const image = requestImageFile(`./${name.replace(/[, ]+/g, '-').toLowerCase()}.svg`)
          .default;

        return (
          <Button
            category={true}
            text={name}
            key={id}
            size="small"
            image={image}
            onClick={() => {
              history.push({
                pathname: '/results',
                search: `?category=${id}`,
              });
            }}
            covid={covid}
          />
        );
      })}
    </div>
  </div>
);

export default withRouter(observer(CategoryList));
