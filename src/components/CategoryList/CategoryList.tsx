import React, { Fragment } from 'react';
import Button from '../Button';
import { History } from 'history';

import { ICategory } from '../Search/store';
import { observer } from 'mobx-react';

interface IProps {
  history: History;
  categories: ICategory[];
}

const CategoryList: React.FunctionComponent<IProps> = ({ history, categories }) => (
  <Fragment>
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
  </Fragment>
);

export default observer(CategoryList);
