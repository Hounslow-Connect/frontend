import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReferralStore from '../../stores/referralStore';

import './Referral.scss';

interface IProps extends RouteComponentProps {
  referralStore?: ReferralStore;
}

class Referral extends Component<IProps> {
  componentDidMount() {
    const { location, referralStore } = this.props;

    if (!referralStore) {
      return;
    }

    const params = queryString.parse(location.search);
    const serviceId = get(params, 'service', '');

    if (params) {
      referralStore.getServiceInfo(serviceId as string);
    }
  }

  render() {
    const { referralStore } = this.props;

    if (!referralStore || !referralStore.service) {
      return null;
    }

    return (
      <div className="flex-container">
        <div className="flex-col flex-col--12 referral--back">
          <Link to={`/service/${referralStore.service.slug}`}>
            <p className="body--s">
              <FontAwesomeIcon icon="angle-left" />
              Back to service
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

export default inject('referralStore')(withRouter(observer(Referral)));
