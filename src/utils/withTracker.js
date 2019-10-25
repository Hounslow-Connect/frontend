import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

export const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    ReactGA.set({
      page,
      ...options,
    });
    ReactGA.pageview(page);
  };

  const HOC = props => {
    useEffect(() => trackPage(`${props.location.pathname + props.location.search}`), [
      props.location.pathname,
      props.location.search,
    ]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};
