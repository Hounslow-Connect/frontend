import React from 'react';
import get from 'lodash/get';

import { IService } from '../../../types/types';
import Button from '../../../components/Button';

import { apiBase } from '../../../config/api';

import './RelatedServicesCard.scss';

interface IProps {
  service: IService;
}

const RelatedServicesCard: React.FunctionComponent<IProps> = ({ service }) => (
  <div className="flex-container related_services__container">
    <div className="flex-col">
      <h3>{service.name}</h3>
    </div>
    <div className="flex-col">{service.intro}</div>
    <div className="flex-col">
      <div className="flex-col">
        <Button text="View more" size="small" />
      </div>
      <div className="flex-col">
        {service.has_logo && (
          <img
            src={`${apiBase}/organisations/${get(service, 'organisation.id')}/logo.png?v=${get(
              service,
              'organisation.id'
            )}`}
            alt={`${service.name} logo`}
          />
        )}
      </div>
    </div>
  </div>
);

export default RelatedServicesCard;
