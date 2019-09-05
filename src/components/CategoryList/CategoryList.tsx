import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import { ICategory } from '../../types/types';
import Button from '../Button';

interface IProps extends RouteComponentProps {
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
        onClick={() => {
          history.push({
            pathname: '/results',
            search: `?category=${id}`,
          });
        }}
      />
    ))}
  </Fragment>
);

export default observer(CategoryList);
