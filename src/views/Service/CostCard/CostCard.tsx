import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  is_free: boolean;
  fees_text?: string | null;
  type?: string;
  fees_url?: string | null;
}

const CostCard: React.FunctionComponent<IProps> = ({ is_free, type, fees_url, fees_text }) => (
  <div className="service__cost-card  panel-box__turquoise">
    <div className="service__cost-card--img">
      <FontAwesomeIcon icon="pound-sign" className="service__info__cost--icon" />
      <p className="criteria_card-title">{!is_free ? 'Cost' : 'Free'}</p>
    </div>

    <div className="service__cost-card--content">
      <p>
        This {type || 'event'} {is_free ? 'is free' : `costs ${fees_text}`}
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
