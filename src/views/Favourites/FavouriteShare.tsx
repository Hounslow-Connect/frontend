import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';

const FavouriteShare: React.FunctionComponent = () => (
  <div className="flex-container flex-container--align-center">
    <div className="flex-col flex-col--8 flex-col--mobile--12 flex-col--tablet-large--7 favourites__header--share">
      <p>Share</p>
      <FontAwesomeIcon icon={['fab', 'facebook-f']} />
      <FontAwesomeIcon icon={['fab', 'twitter']} />
      <FontAwesomeIcon icon="link" />
      <FontAwesomeIcon icon="envelope" />
    </div>
    <div className="flex-col flex-col--4 flex-col--mobile--12 flex-col--tablet-large--5 favourites__header--print">
      <Button text="Print page" icon="print" alt={true} size="small" />
    </div>
  </div>
);

export default FavouriteShare;
