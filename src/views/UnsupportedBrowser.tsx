import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './UnsupportedBrowser.scss';

const UnsupportedBrowserPage = () => (
  <div className="flex-container flex-container--justify flex-container--align-centre unsupported--container">
    <div className="flex-col--12 unsupported--icon">
      <FontAwesomeIcon icon="info-circle" size="3x" />
    </div>
    <div className="unsupported--info">
      <h1 className="unsupported--title">Browser not supported</h1>
      <p className="unsupported--about">
        This website is not supported on Internet Explorer 11 or older, please use Microsoft Edge or
        Google Chrome.
      </p>
    </div>
  </div>
);

export default UnsupportedBrowserPage;
