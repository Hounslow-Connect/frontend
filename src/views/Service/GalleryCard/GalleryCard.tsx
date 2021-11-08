import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import get from 'lodash/get';
import cx from 'classnames';

import './GalleryCard.scss';

interface IProps {
  gallery: IGalleryItem[];
}

interface IGalleryItem {
  created_at: string;
  file_id: string;
  updated_at: string;
  url: string;
}

const GalleryOne: React.FunctionComponent<IProps> = ({ gallery }) => (
  <div className="flex-col--12 gallery-card--image--container gallery-card--one-container">
    <div className="gallery-card--image ">
      <img src={gallery[0].url} className="gallery-card--image--one" alt="1 of 1" />
    </div>
  </div>
);

const GalleryTwo: React.FunctionComponent<IProps> = ({ gallery }) => (
  <div className="flex-col--12 ">
    <div className="flex-container flex-container--mobile-no-padding">
      <div className="flex-col--6 gallery-card--image--container gallery-card--image">
        <img src={gallery[0].url} className="gallery-card--image--left" alt="1 of 2" />
      </div>

      <div className="flex-col--6 gallery-card--image--container gallery-card--image">
        <img src={gallery[1].url} className="gallery-card--image--right" alt="2 of 2" />
      </div>
    </div>
  </div>
);

const GalleryThree: React.FunctionComponent<IProps> = ({ gallery }) => (
  <div className="flex-col--12">
    <div className="flex-container flex-container--mobile-no-padding">
      <div className="gallery-card--image flex-col--4 flex-col--mobile--6">
        <img src={gallery[0].url} className="gallery-card--image--left" alt="1 of 3" />
      </div>
      <div className="flex-col--8 flex-col--mobile--6">
        <div className="flex-container flex-container--mobile-no-padding">
          {gallery.slice(1).map((image: IGalleryItem, i: number) => (
            <div
              className="flex-col--6 flex-col--mobile--12 gallery-card--image"
              key={image.file_id}
            >
              <img
                src={image.url}
                className={cx('gallery-card--image--small', {
                  'gallery-card--image--center': i === 0,
                  'gallery-card--image--right': i === 1,
                })}
                alt={`${i + 2} of 3`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const displayGallery = (gallery: IGalleryItem[]) => {
  switch (gallery.length) {
    case 3:
      return <GalleryThree gallery={gallery} />;
    case 2:
      return <GalleryTwo gallery={gallery} />;
    case 1:
      return <GalleryOne gallery={gallery} />;
    default:
      return null;
  }
};

const GalleryCard: React.FunctionComponent<IProps> = ({ gallery }) => {
  const [open, toggleOpen] = useState(false);
  const [photoIndex, updateIndex] = useState(0);

  return (
    <div className="flex-container flex-container--mobile-no-padding gallery-card">
      {displayGallery(gallery.slice(0, 3))}
      {gallery.length > 1 && (
        <div className="flex-col--12 gallery-card--view">
          <p onClick={() => toggleOpen(!open)}>
            <FontAwesomeIcon icon="camera" />
            View Images ({`${gallery.length}`})
          </p>
        </div>
      )}
      {open && (
        <Lightbox
          mainSrc={get(gallery, `[${photoIndex}].url`)}
          nextSrc={get(gallery, `[${(photoIndex + 1) % gallery.length}].url`)}
          prevSrc={get(gallery, `[${(photoIndex + gallery.length - 1) % gallery.length}].url`)}
          onCloseRequest={() => toggleOpen(!open)}
          onMovePrevRequest={() => updateIndex((photoIndex + gallery.length - 1) % gallery.length)}
          onMoveNextRequest={() => updateIndex((photoIndex + 1) % gallery.length)}
        />
      )}
    </div>
  );
};

export default observer(GalleryCard);
