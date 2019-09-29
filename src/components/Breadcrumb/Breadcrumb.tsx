import React, { FunctionComponent, Fragment } from 'react';

import './Breadcrumb.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface ICrumb {
  text: string;
  url: string;
}

interface IProps {
  crumbs: ICrumb[];
}

const Breadcrumb: FunctionComponent<IProps> = ({ crumbs }) => (
  <div className="flex-container breadcrumb">
    <ul>
      {crumbs.map((crumb: ICrumb, i: number) => (
        <Fragment key={crumb.text}>
          {crumb.url ? (
            <Link to={crumb.url}>
              <li>{crumb.text}</li>
            </Link>
          ) : (
            <li className="breadcrumb--active">{crumb.text}</li>
          )}
          {i !== crumbs.length - 1 && <FontAwesomeIcon icon="chevron-right" />}
        </Fragment>
      ))}
    </ul>
  </div>
);

export default Breadcrumb;
