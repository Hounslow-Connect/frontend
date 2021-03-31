import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { latLngBounds, LatLngBounds } from 'leaflet';
import { observer, inject } from 'mobx-react';

import {
  ActiveMarker,
  ActivityMarker,
  AdviceMarker,
  AppMarker,
  ClubMarker,
  GroupMarker,
  HelplineMarker,
  InformationMarker,
  ServiceMarker
} from './icons';
import List from './../ListView/List';

import './MapView.scss';
import ResultsStore from '../../../stores/resultsStore';
import { IServiceLocation, IService } from '../../../types/types';

interface IProps {
  resultsStore?: ResultsStore;
}

interface IState {
  markers: [];
  bounds: LatLngBounds;
  activeMarkerId: string;
}

const CENTRE_OF_Hounslow: [number, number] = [51.460729410758496, -0.3726421426363473];
const TOP_LEFT_CORNER: [number, number] = [51.50023670726737, -0.45281640857676737];
const BOTTOM_RIGHT_CORNER: [number, number] = [51.425008878160575, -0.27232107871209366];

class MapView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      markers: [],
      bounds: latLngBounds(TOP_LEFT_CORNER, BOTTOM_RIGHT_CORNER),
      activeMarkerId: '',
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

  getMarkerType = (type: string) => {
    switch (true) {
      case type === 'active':
        return ActiveMarker;
      case type === 'activity':
        return ActivityMarker;
      case type === 'advice':
        return AdviceMarker;
      case type === 'app':
        return AppMarker;
      case type === 'club':
        return ClubMarker;
      case type === 'group':
        return GroupMarker;
      case type === 'helpline':
        return HelplineMarker;
      case type === 'information':
        return InformationMarker;
      case type === 'service':
        return ServiceMarker;
      default:
        break;
    }
  };

  setActiveService = (id: string) => {
    this.setState({
      activeMarkerId: id
    });

    let activeSearchResultCard = document.querySelector('.search-result-card.is-active');

    if(activeSearchResultCard) {
      activeSearchResultCard.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  render() {
    const { resultsStore } = this.props;

    if (!resultsStore) {
      return;
    }

    this.addMarkers(resultsStore.results);

    return (
      <div className="flex-container flex-container--space flex-container--row-reverse map">
        <div className="flex-col--8 flex-col--tablet--12 map__map-container">
          <Map centre={CENTRE_OF_Hounslow} attributionControl={false} bounds={this.state.bounds}>
            <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png" />
            {resultsStore.results.map((result: IService) => {
              if (result.service_locations) {
                return result.service_locations.map((serviceLocation: IServiceLocation) => {
                  return (
                    <Marker
                      key={serviceLocation.id}
                      position={[serviceLocation.location.lat, serviceLocation.location.lon]}
                      icon={this.state.activeMarkerId === result.id ? this.getMarkerType('active') : this.getMarkerType(result.type)}
                      onClick={() => this.setActiveService(result.id)}
                    >
                    </Marker>
                  );
                });
              }

              return null;
            })}
          </Map>

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
              <p className="map__key--description">
                <FontAwesomeIcon icon="tshirt" className="map__key-icon map__key-icon--club" />
                Club
              </p>
            </div>
          </div>
        </div>

        <div className="flex-col--4 flex-col--tablet--12 map__results-container">
          {resultsStore.results.length && (
            <List
              activeId={this.state.activeMarkerId}
              activeIdHandler={this.setActiveService}
              resultsList={resultsStore.results}
              resultsStore={resultsStore}
            />
          )}
        </div>
      </div>
    );
  }
}

export default inject('resultsStore')(observer(MapView));
