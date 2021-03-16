import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import find from 'lodash/find';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { latLngBounds, LatLngBounds } from 'leaflet';
import { observer, inject } from 'mobx-react';

import { ActivityMarker, GroupMarker, ServiceMarker, ClubMarker } from './icons';

import './MapView.scss';
import ResultsStore from '../../../stores/resultsStore';
import { IServiceLocation, IService } from '../../../types/types';
import SearchResultCard from '../../../components/SearchResultCard';

interface IProps {
  resultsStore?: ResultsStore;
}

interface IState {
  markers: [];
  bounds: LatLngBounds;
}

const CENTRE_OF_Hounslow: [number, number] = [51.378583, -0.280582];
const TOP_LEFT_CORNER: [number, number] = [51.412437, -0.329297];
const BOTTOM_RIGHT_CORNER: [number, number] = [51.403871, -0.288459];

class MapView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      markers: [],
      bounds: latLngBounds(TOP_LEFT_CORNER, BOTTOM_RIGHT_CORNER),
    };
  }

  addMarkers = (results: IService[]) => {
    if (results) {
      map(results, (result: IService) => {
        if (result.service_locations) {
          result.service_locations.forEach((location: IServiceLocation) =>
            this.state.bounds.extend([location.location.lat, location.location.lon])
          );
        }
      });
    }
  };

  getMarker = (type: string) => {
    switch (true) {
      case type === 'service':
        return ServiceMarker;
      case type === 'group':
        return GroupMarker;
      case type === 'activity':
        return ActivityMarker;
      case type === 'club':
        return ClubMarker;
      default:
        break;
    }
  };

  render() {
    const { resultsStore } = this.props;

    if (!resultsStore) {
      return;
    }

    this.addMarkers(resultsStore.results);

    return (
      <main className="flex-container">
        <div className="flex-col--10 flex-col--mobile--12 map">
          <Map cente={CENTRE_OF_Hounslow} attributionControl={false} bounds={this.state.bounds}>
            <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png" />
            {resultsStore.results.map((result: IService) => {
              const organisation =
                find(resultsStore.organisations, ['id', result.organisation_id]) || null;
              if (result.service_locations) {
                return result.service_locations.map((serviceLocation: IServiceLocation) => {
                  return (
                    <Marker
                      key={serviceLocation.id}
                      position={[serviceLocation.location.lat, serviceLocation.location.lon]}
                      icon={this.getMarker(result.type)}
                    >
                      <Popup>
                        <SearchResultCard
                          result={result}
                          organisation={organisation}
                          mapView={true}
                        />
                      </Popup>
                    </Marker>
                  );
                });
              }

              return null;
            })}
          </Map>
        </div>
        <div className="flex-col--2 flex-col--mobile--12 map__key--container">
          <h3 className="map__key--heading">Map key</h3>
          <div className="map__key">
            <p className="map__key--description">
              <FontAwesomeIcon
                icon="paper-plane"
                className="map__key-icon map__key-icon--activity"
              />
              Activity
            </p>
            <p className="map__key--description">
              <FontAwesomeIcon icon="clipboard" className="map__key-icon map__key-icon--service" />
              Service
            </p>
            <p className="map__key--description">
              <FontAwesomeIcon icon="users" className="map__key-icon map__key-icon--group" />
              Group
            </p>
            <p className="map__key--description">
              <FontAwesomeIcon icon="tshirt" className="map__key-icon map__key-icon--club" />
              Club
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export default inject('resultsStore')(observer(MapView));
