import React from 'react';

import './CMSPage.scss';

interface IProps {
  title: string;
  children: any;
}

const CMSPage: React.FunctionComponent<IProps> = ({ title, children }) => (
  <section>
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
      <div className="flex-col flex-col--6 cms__content">{children}</div>
    </main>
  </section>
);

export default CMSPage;
