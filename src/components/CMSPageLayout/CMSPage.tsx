import React from 'react';

import './CMSPage.scss';

interface IProps {
  title: string;
  children: any;
  twoColumn?: boolean;
}

const CMSPage: React.FunctionComponent<IProps> = ({ title, children, twoColumn }) => (
  <section className="cms">
    <div className="cms__header">
      <div className="flex-container flex-container--mobile-no-padding">
        <div className="flex-col flex-col--5">
          <div className="cms__title-card">
            <h1 className="cms__title-card--title">{title}</h1>
          </div>
        </div>
      </div>
    </div>
    <main className="flex-container flex-container--justify">
      {twoColumn ? children : <div className="flex-col flex-col--6 cms__content">{children}</div>}
    </main>
  </section>
);

export default CMSPage;
