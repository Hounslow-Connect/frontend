import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareCard: React.FunctionComponent = () => (
  <div className="service__share-card service__section">
    <h4>Share</h4>
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share to Facebook"
    >
      <FontAwesomeIcon icon={['fab', 'facebook-f']} />
    </a>

    <a
      href={`http://twitter.com/share?text=Connected Kingston&url=${window.location.href}`}
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
      href={`mailto:?subject=Connected Kingston&amp;body=${window.location.href}"`}
      aria-label="Email service link"
    >
      <FontAwesomeIcon icon="envelope" />
    </a>
  </div>
);

export default ShareCard;
