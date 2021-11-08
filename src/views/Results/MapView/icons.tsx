import L from 'leaflet';
const requestImageFile = require.context(
  '../../../assets/images/icons/maps/',
  true,
  /^\.\/.*\.svg$/
);

export const ActiveMarker = L.icon({
  iconUrl: requestImageFile('./active-pin.svg').default,
  iconSize: [62, 88],
});
export const ActivityMarker = L.icon({
  iconUrl: requestImageFile('./activity-pin.svg').default,
  iconSize: [50, 95],
});
export const AdviceMarker = L.icon({
  iconUrl: requestImageFile('./advice-pin.svg').default,
  iconSize: [50, 95],
});
export const AppMarker = L.icon({
  iconUrl: requestImageFile('./app-pin.svg').default,
  iconSize: [50, 95],
});
export const ClubMarker = L.icon({
  iconUrl: requestImageFile('./club-pin.svg').default,
  iconSize: [50, 95],
});
export const GroupMarker = L.icon({
  iconUrl: requestImageFile('./group-pin.svg').default,
  iconSize: [50, 95],
});
export const HelplineMarker = L.icon({
  iconUrl: requestImageFile('./helpline-pin.svg').default,
  iconSize: [50, 95],
});
export const InformationMarker = L.icon({
  iconUrl: requestImageFile('./information-pin.svg').default,
  iconSize: [50, 95],
});
export const ServiceMarker = L.icon({
  iconUrl: requestImageFile('./service-pin.svg').default,
  iconSize: [50, 95],
});
