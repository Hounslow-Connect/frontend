import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../components/Button';

const ReferralCard: React.FunctionComponent = () => (
  <div className="flex-container flex-container--align-center flex-container--justify flex-container--mobile-no-padding service__referral">
    <Button text="Make a connection" icon="arrow-right" />
    <p className="service__refer-disclaimer">
      <FontAwesomeIcon icon="info-circle" /> It can take up to 2 weeks to recieve a reply
    </p>
  </div>
);

export default ReferralCard;
