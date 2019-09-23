import React from 'react';
import ReactSVG from 'react-svg';

import './CriteriaCard.scss';

interface IProps {
  svg: any;
  title: string;
  info: string;
}

const CriteriaCard: React.FunctionComponent<IProps> = ({ svg, title, info }) => (
  <div className="flex-col flex-col--mobile--12 criteria_card">
    <div className="flex-container flex-container--align-center flex-container--mobile-no-padding criteria_card--inner">
      <div className="flex-col flex-col--3 flex-col--mobile--4 criteria_card-img">
        <ReactSVG src={svg} />
        <p className="criteria_card-title">{title}</p>
      </div>
      <div className="flex-col flex-col--9 flex-col--mobile--8">
        <p>{info}</p>
      </div>
    </div>
  </div>
);

export default CriteriaCard;
