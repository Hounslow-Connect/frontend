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
    <div className="flex-container flex-container--align-center flex-container--mobile-no-padding">
      <div className="flex-col flex-col--mobile--3 criteria_card-img">
        <ReactSVG src={svg} />
        <p className="criteria_card-title">{title}</p>
      </div>
      <div className="flex-col flex-col--mobile--9">
        <p>{info}</p>
      </div>
    </div>
  </div>
);

export default CriteriaCard;
