import React from 'react';
import Button from '../../../components/Button';
import ServiceStore from '../../../stores/serviceStore';

interface IProps {
  serviceStore: ServiceStore;
}

const ButtonCard: React.FunctionComponent<IProps> = ({ serviceStore }) => (
  <div className="flex-container flex-container--mobile-no-padding flex-container--justify service__button-container">
    <div className="flex-col--mobile--3 flex-col--5 flex-col--mobile-small--5">
      <Button text="Print" icon="print" alt={true} onClick={() => window.print()} />
    </div>
    <div className="flex-col--mobile--7 flex-col--7 flex-col--mobile-small--7 service__button-container--mobile">
      <Button
        text={serviceStore.favourite ? 'In your favourites' : 'Add to favourites'}
        icon="star"
        alt={true}
        onClick={() => serviceStore.addToFavourites()}
        disabled={serviceStore.favourite}
      />
    </div>
  </div>
);

export default ButtonCard;
