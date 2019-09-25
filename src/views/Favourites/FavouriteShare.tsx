import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import FavouritesStore from '../../stores/favouritesStore';
interface IProps {
  favouritesStore?: FavouritesStore;
}

const FavouriteShare: React.FunctionComponent<IProps> = ({ favouritesStore }) => {
  if (!favouritesStore) {
    return null;
  }

  return (
    <div className="flex-container flex-container--align-center">
      <div className="flex-col flex-col--8 flex-col--mobile--12 flex-col--tablet-large--7 favourites__header--share">
        <p>Share</p>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${
            window.origin
          }/favourites${favouritesStore.generateShareLink()}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={['fab', 'facebook-f']} />
        </a>
        <a
          href={`http://twitter.com/share?text=Connected Kingston&url=${
            window.origin
          }/favourites${favouritesStore.generateShareLink()}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </a>
        <a
          role="button"
          href={window.location.href}
          onClick={() =>
            window.alert(`${window.origin}/favourites${favouritesStore.generateShareLink()}`)
          }
        >
          <FontAwesomeIcon icon="link" />
        </a>
        <a
          href={`mailto:?subject=Connected Kingston&amp;body=${
            window.origin
          }/favourites${favouritesStore.generateShareLink()}"`}
        >
          <FontAwesomeIcon icon="envelope" />
        </a>
      </div>
      <div className="flex-col flex-col--4 flex-col--mobile--12 flex-col--tablet-large--5 favourites__header--print">
        <Button
          text="Print page"
          icon="print"
          alt={true}
          size="small"
          onClick={() => window.print()}
        />
      </div>
    </div>
  );
};

export default inject('favouritesStore')(observer(FavouriteShare));
