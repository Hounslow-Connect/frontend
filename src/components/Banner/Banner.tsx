import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import './Banner.scss';
import { IBanner } from '../../types/types';
import ButtonLink from '../Button/ButtonLink';
// import { apiBase } from '../../config/api';

interface IProps {
  banner: IBanner;
}

const Banner: FunctionComponent<IProps> = ({ banner }) => (
  <div className="flex-col--12 banner">
    <div className="flex-container flex-container--justify flex-container--mobile-no-padding">
      <div className="flex-col--12 banner__container">
        <div className="flex-container flex-container--no-padding">
          <div className="flex-col--8 flex-col--tablet--10 flex-col--mobile--9">
            <h1 className="banner__title">{banner.title}</h1>
            <ReactMarkdown className="banner__row" source={banner.content} />
            <ButtonLink text={banner.button_text} href={banner.button_url} icon="arrow-right" />
          </div>
          {banner.has_image && (
            <div>
              <div className="banner__image">
                {/* <img src={`${apiBase}/settings/banner-image.png`} alt="Campaign logo" /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Banner;
