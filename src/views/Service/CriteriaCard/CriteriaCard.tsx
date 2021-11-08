import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import ReactSVG from 'react-svg';

import './CriteriaCard.scss';

interface IProps {
  svg: any;
  title: string;
  info: string;
}

const CriteriaCard: React.FunctionComponent<IProps> = ({ svg, title, info }) => {
  const [open, toggleContent] = useState(false);

  const shouldShowToggle = () => {
    const strToArray = info && info.split(',');
    return strToArray && strToArray.length && strToArray.length > 3 ? true : false;
  };

  const getInfo = () => {
    let infoText = info;
    if (shouldShowToggle()) {
      infoText = info
        .split(',')
        .slice(0, 3)
        .join(', ');
    }
    return infoText;
  };
  const getHiddenInfo = () => {
    let infoText = null;

    if (shouldShowToggle()) {
      const size = info.split(', ').length;
      infoText = info
        .split(',')
        .slice(3, size)
        .join(', ');
    }
    return infoText;
  };

  return (
    <div className="flex-col flex-col--mobile--12 criteria_card">
      <div className="flex-container flex-container--align-center criteria_card--inner">
        <div className="flex-col--tablet-2 criteria_card-img">
          <ReactSVG src={svg} />
          <p className="criteria_card-title">{title}</p>
        </div>
        <div className="criteria_card-content">
          <p>
            {getInfo()}
            {shouldShowToggle() && !open && ', plus more...'}
            {shouldShowToggle() && open && `, ${getHiddenInfo()}`}
          </p>
        </div>

        <div className="flex-col flex-col--1 flex-col--mobile--1 criteria_card-toggle">
          {shouldShowToggle() && (
            <button aria-label={`Show more ${title} details`} onClick={() => toggleContent(!open)}>
              <FontAwesomeIcon
                icon="chevron-down"
                className={cx('accordian-icon', {
                  'accordian-icon--open': open,
                })}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CriteriaCard;
