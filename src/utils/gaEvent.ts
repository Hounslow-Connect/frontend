import ReactGA from 'react-ga';

export const gaEvent = (category: string, action: string, label: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
