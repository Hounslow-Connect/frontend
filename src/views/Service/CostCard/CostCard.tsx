import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IService } from '../../../types/types';

interface IProps {
  service: IService;
}

const CostCard: React.FunctionComponent<IProps> = ({ service }) => (
  <div className="service__cost-card">
    <div className="service__cost-card--img">
      <FontAwesomeIcon icon="pound-sign" className="service__info__cost--icon" />
      <p className="criteria_card-title">{!service.is_free ? 'Cost' : 'Free'}</p>
    </div>
    <div className="service__cost-card--content">
      <p>
        This {service.type} {service.is_free ? 'is free' : 'has a cost associated'}
      </p>
      {service.fees_url && (
        <p>
          <a href={service.fees_url} target="_blank" rel="noopener noreferrer">
            Further Pricing Details
          </a>
        </p>
      )}
    </div>
  </div>
);

export default CostCard;
