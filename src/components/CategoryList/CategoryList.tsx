import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import { ICategory } from '../../types/types';
import Button from '../Button';

interface IProps extends RouteComponentProps {
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
        onClick={() => {
          history.push({
            pathname: '/results',
            search: `?category=${id}`,
          });
        }}
      />
    ))}
  </div>
);

export default withRouter(observer(CategoryList));
