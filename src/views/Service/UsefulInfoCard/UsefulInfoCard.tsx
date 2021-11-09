import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import ReactMarkdown from 'react-markdown';

interface IInfo {
  title: string;
  description: string;
}

interface IProps {
  icon: IconName;
  info: IInfo;
}

const UsefulInfoCardAccordian: React.FunctionComponent<IProps> = ({ icon, info }) => (
  <div className="service__useful-info service__accordian-inner">
    <div className="flex-col flex-col--12">
      <h3>
        <FontAwesomeIcon icon={icon} /> {info.title}
      </h3>
    </div>
    <div className="flex-col flex-col--12 service__useful-info__content">
      <ReactMarkdown source={info.description} />
    </div>
  </div>
);

const UsefulInfoCard: React.FunctionComponent<IProps> = ({ icon, info }) => (
  <div className="service__useful-info service__accordian-inner">
    <div className="service__useful-info__icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="service__useful-info__content">
      <h3>{info.title}</h3>
      <ReactMarkdown source={info.description} />
    </div>
  </div>
);

export { UsefulInfoCardAccordian, UsefulInfoCard };
