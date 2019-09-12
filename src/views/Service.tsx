import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ServiceStore from '../stores/serviceStore';
import { RouteComponentProps } from 'react-router';

interface RouteParams {
  service: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  serviceStore: ServiceStore;
}

class Service extends Component<IProps> {
  componentWillMount() {
    const { serviceStore, match } = this.props;

    serviceStore.fetchService(match.params.service);
  }

  render() {
    return <div>services</div>;
  }
}

export default inject('serviceStore')(observer(Service));
