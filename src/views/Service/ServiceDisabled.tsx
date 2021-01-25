import React from 'react';

const ServiceDisabled = () => (
  <div className="flex-container flex-container--align-center not__found ">
    <div className="flex-col flex-col--12">
      <h1 className="not__found--heading">Service not available</h1>
      <p className="body-l">
        This service has been removed from Hounslow Connect. Please contact{' '}
        <a href="mailto:info@connectedkingston.uk">info@connectedkingston.uk</a> for more
        information.
      </p>
    </div>
  </div>
);

export default ServiceDisabled;
