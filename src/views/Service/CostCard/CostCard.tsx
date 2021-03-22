import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IService } from '../../../types/types';

interface IProps {
  service: IService;
}

const CostCard: React.FunctionComponent<IProps> = ({ service }) => (
  <div className="flex-container flex-container--align-center flex-container--mobile-no-padding service__cost-card">
    {!service.is_free &&
      <div className="flex-col flex-col--3 criteria_card-img">
          <FontAwesomeIcon icon="pound-sign" className="service__info__cost--icon" />
          <p className="criteria_card-title">Cost</p>
      </div>
    }
    <div className={service.is_free ? "flex-col flex-col--12" : "flex-col flex-col--9"}>
      {service.is_free ? (
        <div>
          <h3>This {service.type} costs no money</h3>
        </div>
      ) : (
        <p>{service.fees_text}</p>
      )}
      {service.fees_url &&
        <p><a href={service.fees_url} target="_blank" rel="noopener noreferrer">Further Pricing Details</a></p>
      }
    </div>
  </div>
);

export default CostCard;
