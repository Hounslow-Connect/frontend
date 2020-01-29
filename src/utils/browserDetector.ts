export const detectBrowser = () => {
  const ua = window.navigator.userAgent;
  // check if IE11
  const msie = ua.indexOf('MSIE ');
  // check if IE10
  const trident = ua.indexOf('Trident/');

  if (msie > 0 || trident > 0) {
    return false;
  }
  return true;
};
