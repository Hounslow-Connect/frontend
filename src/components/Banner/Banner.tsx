import React, { FunctionComponent, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button';

import './Banner.scss';
import { IBanner } from '../../types/types';

import bannerIllo from '../../assets/images/park-bench.svg';

interface IProps {
  banner: IBanner;
}

const Banner: FunctionComponent<IProps> = ({ banner }) => {
  const [activeCarouselItem, setActiveCarouselItem] = useState(1);

  return (
    <div className="flex-col--12 banner">
      <div className="flex-container flex-container--justify flex-container--mobile-no-padding">
        <div className="flex-col--12 banner__container">
          <div className="flex-container flex-container--no-padding">
            <div className="flex-col--12 banner__content">
              <h1 className="banner__title">{banner.title}</h1>
              <ReactMarkdown className="banner__description" source={banner.content} />
            </div>
            <div className="banner__carousel">
              <div className="slides">
                <div className={"slide" + (activeCarouselItem === 1 ? ' slide--active' : '')}>
                  <div className="image">
                    <img src={bannerIllo} alt=""/>
                  </div>
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
                <div className={"slide" + (activeCarouselItem === 2 ? ' slide--active' : '')}>
                  <div className="image">
                    <img src={bannerIllo} alt=""/>
                  </div>
                  <div className="content">
                    <h3 className="title">Upcoming Campaigns</h3>
                    <p>This is a second slide about upcoming campaigns</p>
                  </div>
                  <Button
                    text="Read more"
                    icon="arrow-right"
                    type="button"
                  />
                </div>
              </div>
              <div className="arrows">
                <button className="arrow arrow-left" onClick={() => {
                  if(activeCarouselItem > 1) setActiveCarouselItem(activeCarouselItem - 1)
                }}>
                  <FontAwesomeIcon
                    icon="chevron-left"
                  />
                  <span className="sr-only">Previous campaign</span>
                </button>
                <button className="arrow arrow-right" onClick={() => {
                  if(activeCarouselItem < 2) setActiveCarouselItem(activeCarouselItem + 1)
                }}>
                  <FontAwesomeIcon
                    icon="chevron-right"
                  />
                  <span className="sr-only">Next campaign</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Banner;
