import React from 'react';
import get from 'lodash/get';

import { IService } from '../../../../types/types';
import Link from '../../../../components/Link';

import { apiBase } from '../../../../config/api';
import { withRouter, RouteComponentProps } from 'react-router';

import './RelatedServicesCard.scss';

interface IProps extends RouteComponentProps {
  service: IService;
}

const RelatedServicesCard: React.FunctionComponent<IProps> = ({ service, history }) => (
  <div className="related-services-card">
    <div className="flex-container flex-container--no-padding flex-container--no-wrap flex-container--align-center flex-container--space-between">
      <h3>{service.name}</h3>
      {service.has_logo && (
        <div className="related-services-card__logo mobile-hide">
          <img
            src={`${apiBase}/organisations/${get(service, 'organisation_id')}/logo.png?v=${get(
              service,
              'organisation.id'
            )}`}
            alt={`${service.name} logo`}
          />
        </div>
      )}
    </div>
    <div className="related-services-card__info">
      <p>{service.intro}</p>
    </div>
    <Link
      size="medium"
      text="Read more"
      icon="arrow-right"
      iconPosition="right"
      href={`/services/${service.slug}`}
    />
  </div>
);

export default withRouter(RelatedServicesCard);
