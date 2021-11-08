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
    <Breadcrumb
      crumbs={[
        { text: 'Home', url: '/' },
        { text: breadcrumb, url: '' },
      ]}
    />
    <div className="cms__header">
      <div className="flex-container">
        <div className="flex-col flex-col--12">
          <div className="cms__title-card">
            <h1 className="cms__title-card--title">{title}</h1>
          </div>
        </div>
      </div>
    </div>
    <main className="cms__content">
      <div className="flex-container">
        {twoColumn ? (
          children
        ) : (
          <div className="flex-col flex-col--9 flex-col--tablet--12">{children}</div>
        )}
      </div>
    </main>
  </section>
);

export default CMSPage;
