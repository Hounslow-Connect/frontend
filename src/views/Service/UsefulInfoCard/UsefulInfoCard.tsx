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
  <div className="flex-container flex-container--mobile-no-padding flex-container--align-center service__useful-info service__accordian-inner">
    <div className="flex-col flex-col--mobile--1">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="flex-col flex-col--mobile--11">
      <h4>{info.title}</h4>
    </div>
    <div className="flex-col flex-col--mobile--12">
      <ReactMarkdown source={info.description} />
    </div>
  </div>
);

const UsefulInfoCard: React.FunctionComponent<IProps> = ({ icon, info }) => (
  <div className="flex-container flex-container--mobile-no-padding flex-container--align-center service__useful-info service__accordian-inner">
    <div>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="flex-col flex-col--10">
      <div className="flex-container">
        <div className="flex-col flex-col--12">
          <h4>{info.title}</h4>
        </div>
        <div className="flex-col flex-col--12">
          <ReactMarkdown source={info.description} />
        </div>
      </div>
    </div>
  </div>
);

export { UsefulInfoCardAccordian, UsefulInfoCard };
