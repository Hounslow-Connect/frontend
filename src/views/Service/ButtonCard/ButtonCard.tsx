import React from 'react';
import Button from '../../../components/Button';
import ServiceStore from '../../../stores/serviceStore';

interface IProps {
  serviceStore: ServiceStore;
}

const ButtonCard: React.FunctionComponent<IProps> = ({ serviceStore }) => (
  <div className="flex-container service__button-container">
    <Button text="Print" icon="print" alt={true} onClick={() => window.print()} />
    <Button
      text={serviceStore.favourite ? 'In your favourites' : 'Add to favourites'}
      icon="star"
      alt={true}
      onClick={() => serviceStore.addToFavourites()}
      disabled={serviceStore.favourite}
    />
  </div>
);

export default ButtonCard;
