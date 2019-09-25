import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IService } from '../../../types/types';

interface IProps {
  service: IService;
}

const CostCard: React.FunctionComponent<IProps> = ({ service }) => (
  <div className="flex-container flex-container--align-center flex-container--mobile-no-padding service__cost-card">
    <div className="flex-col flex-col--3 flex-col--mobile--4 criteria_card-img">
      <FontAwesomeIcon icon="pound-sign" className="service__info__cost--icon" />

      <p className="criteria_card-title">{service.is_free ? 'Free' : 'Cost'}</p>
    </div>
    <div className="flex-col flex-col--9 flex-col--mobile--8">
      <p>{service.fees_text ? service.fees_text : `This ${service.type} costs no money`}</p>
      <p>{service.fees_url && <a href={service.fees_url}>Further Pricing Details</a>}</p>
    </div>
  </div>
);

export default CostCard;
