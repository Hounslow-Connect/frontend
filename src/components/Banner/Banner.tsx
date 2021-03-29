import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button';

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

          <div className="banner__carousel">
            <div className="slides">
              <div className="slide">
                <div className="content">
                  <h3 className="title">Current Campaigns</h3>
                  <p>One Houslow Connect is an information, advice and guidance hub connecting local residents to local support.</p>
                </div>
                <Button
                  text="Read more"
                  icon="arrow-right"
                  type="button"
                />
              </div>
            </div>
            <div className="arrows">
              <button className="arrow arrow-left">
                <FontAwesomeIcon
                  icon="chevron-left"
                />
              </button>
              <button className="arrow arrow-right">
                <FontAwesomeIcon
                  icon="chevron-right"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Banner;
