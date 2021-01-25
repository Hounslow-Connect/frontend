import React from 'react';

import './CMSPage.scss';
import Breadcrumb from '../Breadcrumb';

interface IProps {
  title: string;
  children: any;
  twoColumn?: boolean;
  breadcrumb: string;
}

const CMSPage: React.FunctionComponent<IProps> = ({ title, children, twoColumn, breadcrumb }) => (
  <section className="cms">
    <Breadcrumb crumbs={[{ text: 'Home', url: '/' }, { text: breadcrumb, url: '' }]} />
    <div className="cms__header">
      <div className="flex-container flex-container--no-padding">
        <div className="flex-col flex-col--5 flex-col--tablet-large--6">
          <div className="cms__title-card">
            <h1 className="cms__title-card--title">{title}</h1>
          </div>
        </div>
      </div>
    </div>
    <main className="cms__content">
      <div className="flex-container flex-container--justify">
        {twoColumn ? (
          children
        ) : (
          <div className="flex-col flex-col--6 flex-col--tablet--8">{children}</div>
        )}
      </div>
    </main>
  </section>
);

export default CMSPage;
