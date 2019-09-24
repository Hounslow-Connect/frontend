import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import { inject, observer } from 'mobx-react';

import { IService } from '../../types/types';

import FavouritesCard from './FavouritesCard';
import FavouriteShare from './FavouriteShare';

import './Favourites.scss';
import { Link, withRouter } from 'react-router-dom';

const Favourites: React.FunctionComponent<any> = ({ favouritesStore, history }) => (
  <section className="favourites">
    <div className="favourites__header flex-container">
      <div className="flex-col flex-col--12 favourites__header--heading">
        <h1>Favourites</h1>
      </div>
      <div className="flex-container flex-container--mobile-no-padding flex-container--align-center favourites__header--inner-container">
        <div className="flex-col flex-col--6 flex-col--mobile--12 flex-col--tablet-large--5 favourites__header--header-container">
          <p>You can print or share a list of your favourite services</p>
        </div>
        <div className="flex-col flex-col--5 flex-col--tablet-large--6 mobile-hide tablet-hide favourites__header--header-container">
          <FavouriteShare />
        </div>
      </div>
    </div>

    <div className="flex-container flex-container--mobile-no-padding flex-container--align-center">
      {!!favouritesStore.favourites.length && (
        <Fragment>
          <div className="flex-col flex-col--12 favourites__count">
            <p>{`${favouritesStore.favourites.length} results found`}</p>
          </div>

          <div className="flex-col flex-col--12">
            <div className="flex-container flex-container--justify">
              {favouritesStore.favourites.map((favourite: IService) => {
                return (
                  <FavouritesCard
                    key={favourite.id}
                    service={favourite}
                    locations={favouritesStore.getLocations(favourite.id)}
                    removeFavourite={favouritesStore.removeFavourite}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex-container favourites__add-more">
            <div className="flex-col">
              <Link to="/">
                <Button text="Add more" icon="plus" onClick={() => history.push('/')} />
              </Link>
            </div>
          </div>

          <div className="flex-container mobile-show tablet-show">
            <FavouriteShare />
          </div>
        </Fragment>
      )}
    </div>
  </section>
);

export default inject('favouritesStore')(withRouter(observer(Favourites)));
