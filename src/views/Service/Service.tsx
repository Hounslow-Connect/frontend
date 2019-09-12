import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import { format } from 'date-fns';
import { apiBase } from '../../config/api';

import './Service.scss';

import ServiceStore from '../../stores/serviceStore';

interface RouteParams {
  service: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  serviceStore: ServiceStore;
}

class Service extends Component<IProps> {
  componentDidMount() {
    const { serviceStore, match } = this.props;

    serviceStore.fetchService(match.params.service);
  }

  render() {
    const { serviceStore } = this.props;
    const { service } = serviceStore;

    if (!service) {
      return <div>Service not found</div>;
    }

    return (
      <main>
        <div className={`service__header service__header--${get(service, 'type')}`}>
          <h1>{get(service, 'name')}</h1>
          <p>
            Page last updated <span>{format(new Date(service!.updated_at), 'do LLLL yyyy')}</span>
          </p>
          <div className="service__header__logo">
            <img
              src={`${apiBase}/organisations/${get(service, 'organisation.id')}/logo.png?v=${get(
                service,
                'organisation.id'
              )}`}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default inject('serviceStore')(observer(Service));
