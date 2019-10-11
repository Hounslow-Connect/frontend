import React from 'react';
import { observer } from 'mobx-react';
import Button from '../../../components/Button';
import ServiceStore from '../../../stores/serviceStore';

interface IProps {
  serviceStore: ServiceStore;
}

const ButtonCard: React.FunctionComponent<IProps> = ({ serviceStore }) => (
  <div className="flex-container flex-container--mobile-no-padding flex-container--justify service__button-container">
    <div className="flex-col--mobile--3 flex-col--5 flex-col--mobile-small--5 flex-col--tablet--4">
      <Button text="Print" icon="print" alt={true} onClick={() => window.print()} />
    </div>
    <div className="flex-col--mobile--7 flex-col--7 flex-col--mobile-small--7f flex-col--tablet--4 service__button-container--mobile">
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

export default observer(ButtonCard);
