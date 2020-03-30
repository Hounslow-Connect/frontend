import React from 'react';

import './NotFound.scss';

const NotFound: React.FunctionComponent = () => (
  <div className="flex-container flex-container--align-center not__found ">
    <div className="flex-col flex-col--12">
      <h1 className="not__found--heading">Page not found</h1>
      <p className="body-l">It seems like the page you are looking for doesn't exist</p>
    </div>
  </div>
);

export default NotFound;
