import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import ButtonLink from '../Button/ButtonLink';

import './Banner.scss';
import { IBanner } from '../../types/types';

import bannerIllo from '../../assets/images/park-bench.svg';

interface IProps {
  banner: IBanner;
  activeCarouselItem?: number;
  bannerIndex?: number;
}

const Banner: FunctionComponent<IProps> = ({ banner, activeCarouselItem, bannerIndex }) => {
  return (
    <div className={'slide' + (activeCarouselItem === bannerIndex ? ' slide--active' : '')}>
      <div className="image">
        <img src={bannerIllo} alt="Person on a park bench" />
      </div>
      <div className="content">
        <h3 className="title">{banner.title}</h3>
        <ReactMarkdown source={banner.content} />
      </div>
      <ButtonLink text={banner.button_text} icon="arrow-right" href={banner.button_url} />
    </div>
  );
};

export default Banner;
