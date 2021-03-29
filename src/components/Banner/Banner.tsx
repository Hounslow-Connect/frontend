import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import './Banner.scss';
import { IBanner } from '../../types/types';

interface IProps {
  banner: IBanner;
}

const Banner: FunctionComponent<IProps> = ({ banner }) => (
  <div className="flex-col--12 banner">
    <div className="flex-container flex-container--justify flex-container--mobile-no-padding">
      <div className="flex-col--12 banner__container">
        <div className="flex-container flex-container--no-padding">
          <div className="flex-col--12 banner__content">
            <h1 className="banner__title">{banner.title}</h1>
            <ReactMarkdown className="banner__row" source={banner.content} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Banner;
