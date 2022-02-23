import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { apiBase } from '../../config/api';
import './CategoryList.scss';

import { ICategory } from '../../types/types';
import Button from '../Button';

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
      {categories.map(({ name, id }) => {
        const categoryImageUrl: string = `${apiBase}/collections/categories/${id}/image.svg`;

        return (
          <Button
            category={true}
            text={name}
            key={id}
            size="small"
            image={categoryImageUrl}
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
