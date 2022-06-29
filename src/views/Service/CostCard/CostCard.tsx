import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  is_free: boolean;
  type?: string;
  fees_url?: string | null;
}

const CostCard: React.FunctionComponent<IProps> = ({ is_free, type, fees_url }) => (
  <div className="service__cost-card panel-box--turquoise">
    <div className="service__cost-card--img">
      <FontAwesomeIcon icon="pound-sign" className="service__info__cost--icon" />
      <p className="criteria_card-title">{!is_free ? 'Cost' : 'Free'}</p>
    </div>
    <div className="service__cost-card--content">
      <p>
        This {type || 'event'} {is_free ? 'is free' : 'has a cost associated'}
      </p>
      {fees_url && (
        <p>
          <a href={fees_url} target="_blank" rel="noopener noreferrer">
            Further Pricing Details
          </a>
        </p>
      )}
    </div>
  </div>
);

export default CostCard;
