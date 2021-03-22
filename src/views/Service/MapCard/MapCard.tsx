import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { latLngBounds, LatLngBounds } from 'leaflet';
import L from 'leaflet';
import map from 'lodash/map';

import { IServiceLocation } from '../../../types/types';

interface IProps {
  locations: any;
}

interface IState {
  markers: [];
  bounds: LatLngBounds;
}

const CENTRE_OF_Hounslow: [number, number] = [51.460729410758496, -0.3726421426363473];
const TOP_LEFT_CORNER: [number, number] = [51.50023670726737, -0.45281640857676737];
const BOTTOM_RIGHT_CORNER: [number, number] = [51.425008878160575, -0.27232107871209366];

const ServiceMarker = L.icon({
  iconUrl: require('../../../assets/images/icons/maps/service-pin.svg'),
  iconSize: [50, 95],
});

class MapCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      markers: [],
      bounds: latLngBounds(TOP_LEFT_CORNER, BOTTOM_RIGHT_CORNER),
    };
  }

  addMarkers = (locations: []) => {
    if (locations) {
      map(locations, (location: IServiceLocation) => {
        if (location) {
          this.state.bounds.extend([location.location.lat, location.location.lon])
        }
      });
    }
  };

  render() {
    const { locations } = this.props;

    this.addMarkers(locations);

    return (
      <Map centre={CENTRE_OF_Hounslow} attributionControl={false} bounds={this.state.bounds}>
        <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png" />
          {locations.map((serviceLocation: IServiceLocation) => {
            return (
              <Marker
                key={serviceLocation.id}
                position={[serviceLocation.location.lat, serviceLocation.location.lon]}
                icon={ServiceMarker}
              >
              </Marker>
            );
          })}
      </Map>
    )
  }
}

export default MapCard;