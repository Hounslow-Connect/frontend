import React from 'react';
import Button from '../Button';
import { History } from 'history';

import { ICategory } from '../Search/store';

interface IProps {
  history: History;
  categories: ICategory[];
}

const CategoryList: React.FunctionComponent<IProps> = ({ categories, history }) => (
  <div>
    {categories.map(({ name, id, icon }) => (
      <Button
        category={true}
        text={name}
        key={id}
        size="small"
        icon={icon}
        onClick={() =>
          history.push({
            pathname: '/results',
            search: `?category=${id}`,
          })
        }
      />
    ))}
  </div>
);

export default CategoryList;
