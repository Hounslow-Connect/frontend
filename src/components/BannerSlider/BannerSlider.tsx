import React, { FunctionComponent, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HashLink } from 'react-router-hash-link';

import { IBanner } from '../../types/types';
import Banner from '../../components/Banner';

import bannerIllo from '../../assets/images/park-bench.svg';

interface IProps {
  banners: [];
  header_content?: IBanner | null;
}

const BannerSlider: FunctionComponent<IProps> = ({ banners = [], header_content }) => {

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  }

  const [activeCarouselItem, setActiveCarouselItem] = useState(1);

  return (
    <div className="flex-col--12 banner">
      <div className="flex-container flex-container--justify flex-container--mobile-no-padding">
        <div className="flex-col--12 banner__container">
          <div className="flex-container flex-container--no-padding">
            <div className="flex-col--12 banner__content">
              <h1 className="banner__title">{header_content ? header_content.title : null}</h1>
              <ReactMarkdown
                className="banner__description"
                source={header_content ? header_content.content : undefined}
              />
            </div>
            <div className="banner__cta-row">
              <HashLink to="#events" scroll={el => scrollWithOffset(el)}>
                <img src={bannerIllo} alt="Person on a park bench" />
                <span>Find local events</span>
              </HashLink>
              <HashLink to="#search__container" scroll={el => scrollWithOffset(el)}>
                <img src={bannerIllo} alt="Person on a park bench" />
                <span>Search for services</span>
              </HashLink>
            </div>
            <div className="banner__carousel">
              <div className="slides">
                {banners.map((banner, i) => (
                  <Banner
                    activeCarouselItem={activeCarouselItem}
                    banner={banner}
                    bannerIndex={i + 1}
                    key={i}
                  />
                ))}
              </div>
              {banners.length && banners.length > 1 && (
                <div className="arrows">
                  <button
                    className="arrow arrow-left"
                    disabled={activeCarouselItem <= 1 ? true : false}
                    onClick={() => {
                      setActiveCarouselItem(activeCarouselItem - 1);
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-left" />
                    <span className="sr-only">Previous slide</span>
                  </button>
                  <button
                    className="arrow arrow-right"
                    disabled={activeCarouselItem >= banners.length ? true : false}
                    onClick={() => {
                      setActiveCarouselItem(activeCarouselItem + 1);
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-right" />
                    <span className="sr-only">Next slide</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
