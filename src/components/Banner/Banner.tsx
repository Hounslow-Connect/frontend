import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import './Banner.scss';
import { IBanner } from '../../types/types';
import ButtonLink from '../Button/ButtonLink';
import { apiBase } from '../../config/api';

interface IProps {
  banner: IBanner;
}

const Banner: FunctionComponent<IProps> = ({ banner }) => (
  <div className="flex-col--12 banner">
    {console.log(banner)}
    <div className="flex-container flex-container--justify">
      <div className="flex-col--12 banner__container">
        <div className="flex-container">
          <div className="flex-col--8">
            <p className="banner__title banner__row">{banner.title}</p>
            <ReactMarkdown className="banner__row" source={banner.content} />
            <ButtonLink
              text={banner.button_text}
              href={banner.button_url}
              size="medium"
              icon="arrow-right"
            />
          </div>
          {banner.has_image && (
            <div className="flex-col--2">
              <div className="banner__image">
                <img src={`${apiBase}/settings/banner-image.png`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Banner;
