import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import find from 'lodash/find';
import { inject, observer } from 'mobx-react';

import { IService } from '../../types/types';

import FavouritesCard from './FavouritesCard';

const Favourites: React.FunctionComponent<any> = ({ favouritesStore }) => (
  <main>
    <header>
      <div>
        <h1>Favourites</h1>
        <div>You can print or share a list of your favourite services</div>
      </div>
      <div>
        <div>
          <p>Share</p>
          <FontAwesomeIcon icon={['fab', 'facebook-f']} />
          <FontAwesomeIcon icon={['fab', 'twitter']} />
          <FontAwesomeIcon icon="link" />
          <FontAwesomeIcon icon="envelope" />
        </div>
        <Button text="Print page" icon="print" alt={true} size="small" />
      </div>
    </header>
    {favouritesStore.favourites.length && (
      <section>
        {favouritesStore.favourites.map((favourite: IService) => {
          const organisation = find(favouritesStore.organisations, [
            'id',
            favourite.organisation_id,
          ]);

          return (
            <FavouritesCard
              key={favourite.id}
              service={favourite}
              organisation={organisation}
              locations={favouritesStore.getLocations(favourite.id)}
              removeFavourite={favouritesStore.removeFavourite}
            />
          );
        })}
      </section>
    )}
  </main>
);

export default inject('favouritesStore')(observer(Favourites));
