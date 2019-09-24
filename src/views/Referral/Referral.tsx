import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReferralStore from '../../stores/referralStore';

import './Referral.scss';
import Button from '../../components/Button';

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

        <div className="flex-col flex-col--7 referral--intro">
          <div className="flex-container">
            <div className="flex-col flex-col--12">
              <div className="flex-container referral--intro--row referral--intro--no-padding">
                <div className="flex-col flex-col--1">
                  <FontAwesomeIcon icon="envelope" />
                </div>
                <div className="flex-col flex-col--11">
                  <p className="body--s">By completing this short form we will:</p>
                  <p className="referral--intro--description">{`Send the provided name and contact details to the organisers of ${referralStore.service.name}.`}</p>
                </div>
              </div>
              <div className="flex-container referral--intro--row referral--intro--no-padding">
                <div className="flex-col flex-col--1">
                  <FontAwesomeIcon icon="calendar" />
                </div>
                <div className="flex-col flex-col--11">
                  <p
                    className="body--s"
                    dangerouslySetInnerHTML={{
                      __html: `Within 10 working days, <em>${referralStore.service.name}</em> will:`,
                    }}
                  />
                  <p className="referral--intro--description">
                    Get in touch to help access/provide more information about their service.
                  </p>
                </div>
              </div>
              <div className="flex-container referral--intro--no-padding">
                <div className="flex-col flex-col--1">
                  <FontAwesomeIcon icon="user-friends" />
                </div>
                <div className="flex-col flex-col--11">
                  <p className="referral--intro--description">
                    You have the option to complete this form on someone else's behalf, with their
                    permission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-col flex-col--12">
          <Button text="Continue" icon="chevron-right" />
        </div>

        <div className="flex-col flex-col--12 referral--step">
          <span className="body--s">
            <strong>First step -</strong> Who would you like to be connected?
          </span>
        </div>
      </div>
    );
  }
}

export default inject('referralStore')(withRouter(observer(Referral)));
