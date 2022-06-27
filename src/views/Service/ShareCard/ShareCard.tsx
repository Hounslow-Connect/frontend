import React from 'react';
import useForceUpdate from '../../../hooks/forceUpdateHook.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ServiceStore from '../../../stores/serviceStore';

import Button from '../../../components/Button';
interface IProps {
  serviceStore?: ServiceStore;
}

const ShareCard: React.FunctionComponent<IProps> = ({ serviceStore }) => {
  const forceUpdate = useForceUpdate();
  return (
    <div className="service__share-card panel-box--turqoiuse service__section">
      <div className="service__share-card__social">
        <div className="flex-container flex-container--no-padding flex-container--left flex-container--align-center">
          <h3>Share</h3>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share to Facebook"
          >
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
          </a>

          <a
            href={`http://twitter.com/share?text=Hounslow Connect&url=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share to Twitter"
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} />
          </a>
          <a
            role="button"
            href={window.location.href}
            onClick={() => window.alert(`${window.location.href}`)}
            aria-label="Share service via link"
          >
            <FontAwesomeIcon icon="link" />
          </a>
          <a
            href={`mailto:?subject=Hounslow Connect&amp;body=${window.location.href}"`}
            aria-label="Email service link"
          >
            <FontAwesomeIcon icon="envelope" />
          </a>
        </div>
      </div>
      {serviceStore && (
        <div className="flex-container flex-container--no-padding">
          <div className="flex-col service__action-buttons">
            <Button size="small" text="Print" icon="print" onClick={() => window.print()} />
            <Button
              size="small"
              text={serviceStore.favourite ? 'In your favourites' : 'Add to favourites'}
              icon="star"
              onClick={() => {
                serviceStore.addToFavourites();
                forceUpdate();
              }}
              disabled={serviceStore.favourite}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareCard;
