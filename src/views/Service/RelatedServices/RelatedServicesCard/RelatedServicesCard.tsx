import React from 'react';
import get from 'lodash/get';

import { IService } from '../../../../types/types';
import Button from '../../../../components/Button';

import { apiBase } from '../../../../config/api';
import { withRouter, RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
  service: IService;
}

const RelatedServicesCard: React.FunctionComponent<IProps> = ({ service, history }) => (
  <div className="flex-col flex-col--3 flex-col--medium--4 related-services--card">
    <div className="flex-col flex-col--12 flex-col--mobile--12">
      <h3>{service.name}</h3>
    </div>
    <div className="flex-col flex-col--12 related-services--card--info">{service.intro}</div>
    <div className="flex-container flex-container--align-center related-services--card--no-padding">
      <div className="flex-col flex-col--9 flex-col--mobile--10">
        <Button
          text="View more"
          size="small"
          icon="chevron-right"
          onClick={() => history.replace(`/services/${service.slug}`)}
        />
      </div>
      <div className="flex-col flex-col--3 flex-col--mobile--2">
        {service.has_logo && (
          <div className="related-services--logo mobile-hide">
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
    </div>
  </div>
);

export default withRouter(RelatedServicesCard);
