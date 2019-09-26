import React from 'react';

import './NotFound.scss';

const NotFound: React.FunctionComponent = () => (
  <div className="flex-container flex-container--align-center not__found ">
    <div className="flex-col flex-col--12">
      <h1 className="not__found--heading">Page not found</h1>
      <p className="body-l">What’s worse, a hilarious 404 page can’t be found either.</p>
    </div>
  </div>
);

export default NotFound;
