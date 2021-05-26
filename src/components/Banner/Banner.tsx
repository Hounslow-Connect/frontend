import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button';

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
    <div className={"slide" + (activeCarouselItem === bannerIndex ? ' slide--active' : '')}>
      <div className="image">
        <img src={bannerIllo} alt=""/>
      </div>
      <div className="content">
        <h3 className="title">{banner.title}</h3>
        <ReactMarkdown source={banner.content} />
      </div>
      <Button
        text="Read more"
        icon="arrow-right"
        type="button"
      />
    </div>
  )
};

export default Banner;
