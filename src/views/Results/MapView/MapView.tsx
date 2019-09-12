import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import find from 'lodash/find';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MapView.scss';
import ResultsStore from '../../../stores/resultsStore';
import { IServiceLocation, IService } from '../../../types/types';
import SearchResultCard from '../../../components/SearchResultCard';

interface IProps {
  resultsStore: ResultsStore;
}

const CENTRE_OF_KINGSTON: [number, number] = [51.4175006, -0.3182182];

class MapView extends Component<IProps> {
  render() {
    const { resultsStore } = this.props;

    return (
      <main className="flex">
        <div className="map">
          <Map center={CENTRE_OF_KINGSTON} zoom={13} attributionControl={false}>
            <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png" />
            {resultsStore.results.map((result: IService) => {
              const organisation =
                find(resultsStore.organisations, ['id', result.organisation_id]) || null;
              if (result.service_locations) {
                return result.service_locations.map((serviceLocation: IServiceLocation) => (
                  <Marker
                    key={serviceLocation.id}
                    position={[serviceLocation.location.lat, serviceLocation.location.lon]}
                  >
                    <Popup>
                      <SearchResultCard
                        result={result}
                        organisation={organisation}
                        mapView={true}
                      />
                    </Popup>
                  </Marker>
                ));
              }

              return null;
            })}
          </Map>
        </div>
        <div className="map__key--container">
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
          </div>
        </div>
      </main>
    );
  }
}

export default MapView;
