import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import { ICategory } from '../../types/types';
import Button from '../Button';

interface IProps extends RouteComponentProps {
  categories: ICategory[];
  covid?: boolean;
}

const CategoryList: React.FunctionComponent<IProps> = ({ history, categories, covid = false }) => (
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
        covid={covid}
      />
    ))}
  </Fragment>
);

export default withRouter(observer(CategoryList));
