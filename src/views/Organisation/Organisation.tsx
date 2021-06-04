import React, { Component, useLayoutEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
// import map from 'lodash/map';
// import find from 'lodash/find';
// import ReactMarkdown from 'react-markdown';
// import cx from 'classnames';
// import uniqueId from 'lodash/uniqueId';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { apiBase } from '../../config/api';

import './Organisation.scss';

// import { removeQuotesRegex, capitalise } from '../../utils/utils';
import { IOrganisation } from '../../types/types';
import OrganisationStore from '../../stores/organisationStore';
import UIStore from '../../stores/uiStore';

import SocialLinks from './SocialLinks';
import Loading from '../../components/Loading';


interface RouteParams {
  organisation: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  organisationStore: OrganisationStore;
  uiStore: UIStore;
}


const getImg = (organisation: IOrganisation) => {
  return (organisation.has_logo ? `${apiBase}/organisations/${organisation.id}/logo.png?` : '')  
};

class Organisation extends Component<IProps> {
  componentDidMount() {
    const { organisationStore, match } = this.props;
    organisationStore.fetchOrganisation(match.params.organisation);
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const { organisationStore, match } = this.props;
      organisationStore.fetchOrganisation(match.params.organisation);
    }
  }

  render() {
    const { organisationStore } = this.props;
    const { organisation } = organisationStore;
    

    if (!organisation) {
      return null;
    }

    return (
      <main>
        <div className={`organisation__header`}>
          <div className="flex-container">
            <div className="service__header__wrapper organisation__header__wrapper">
              <div className="organisation__header__logo">
                <img src={getImg(organisation)} alt={`${organisation.name} logo`} />
              </div>
              <div className="organisation__header__content flex-col flex-col--tablet--9">
                <span className="organisation__header__sub">Organisation</span>
                <h1>{get(organisation, 'name')}</h1>
                <p>{get(organisation, 'description')}</p>

                <ul className="organisation__header__contact-details">
                  {get(organisation, 'phone') && <li><strong>Phone</strong><a href={`tel:${get(organisation, 'phone')}`}>{get(organisation, 'phone')}</a></li>} 
                  {get(organisation, 'url') && <li><strong>Website</strong><a href={`${get(organisation, 'url')}`}>{get(organisation, 'url')}</a></li>} 
                  {get(organisation, 'email') && <li><strong>Email</strong><a href={`${get(organisation, 'email')}`}>{get(organisation, 'email')}</a></li>} 
                  <li><strong>Social media</strong><SocialLinks organisationStore={organisationStore} /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {organisationStore.loading ? (
          <Loading />
        ) : (
          <section className="organisation__services">
            <div className="flex-container">
              
              <div className="flex-col flex-col--10 flex-col--mobile--12 flex-col--tablet--12 service__left-column">
                <div className="flex-container flex-container--align-left flex-container--no-padding service__section service__section--no-padding">
                  
                  <div className="flex-col flex-col--12 flex-col--mobile--12 service__criteria">
                    <h2 className="service__heading">Services provided by {get(organisation, 'name')}</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    );
  }
}

export default inject('organisationStore', 'uiStore')(observer(Organisation));
