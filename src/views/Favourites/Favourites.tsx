import React, { Fragment, Component } from 'react';
import Button from '../../components/Button';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';

import { IService } from '../../types/types';

import FavouritesCard from './FavouritesCard';
import FavouriteShare from './FavouriteShare';

import './Favourites.scss';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import FavouritesStore from '../../stores/favouritesStore';
import CMSStore from '../../stores/CMSStore';
import get from 'lodash/get';
import Breadcrumb from '../../components/Breadcrumb';

interface IProps extends RouteComponentProps {
  favouritesStore: FavouritesStore;
  cmsStore: CMSStore;
}
class Favourites extends Component<IProps> {
  componentDidMount() {
    const { location, favouritesStore } = this.props;
    const { ids } = queryString.parse(location.search);

    if (ids) {
      favouritesStore.setFavourites(ids as string);
    } else {
      favouritesStore.getFavouritesFromStorage();
    }

    if (favouritesStore.favouritesList && favouritesStore.favouritesList.length) {
      favouritesStore.fetchFavourites();
    }
  }

  render() {
    const { favouritesStore, cmsStore, history } = this.props;

    return (
      <section className="favourites">
        <Breadcrumb crumbs={[{ text: 'Home', url: '/' }, { text: 'Favourites', url: '' }]} />
        <div className="favourites__header">
          <div className="flex-container flex-container--align-center">
            <div className="flex-col flex-col--6 favourites__header--heading">
              <h1>{get(cmsStore, 'favourites.title')}</h1>
              <p>{get(cmsStore, 'favourites.content')}</p>
            </div>
            <div className="flex-col flex-col--6 flex-col--tablet--12 mobile-hide tablet-hide favourites__header--header-container">
              <FavouriteShare />
            </div>
          </div>
        </div>

        <div className="flex-container flex-container--mobile-no-padding flex-container--align-center ">
          {!!favouritesStore.favourites.length ? (
            <Fragment>
              <div className="flex-col flex-col--12 favourites__count">
                <p>
                  <strong>{`${favouritesStore.favourites.length} results found`}</strong>
                </p>
              </div>

              <div className="flex-col flex-col--12">
                <div className="results__container">
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

              <div className="flex-container mobile-show tablet-show">
                <FavouriteShare />
              </div>
            </Fragment>
          ) : (
            <div className="flex-container favourites__no-favourites">
              <div className="flex-col flex-col--12">
                <h3>No favourites saved</h3>
              </div>
            </div>
          )}
        </div>
        <div className="flex-container flex-container--justify">
          <div className="favourites__add-more">
            <Link to="/">
              <Button text="Add more" icon="plus" onClick={() => history.push('/')} />
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default inject('favouritesStore', 'cmsStore')(withRouter(observer(Favourites)));
