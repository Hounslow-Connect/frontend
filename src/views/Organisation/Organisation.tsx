import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';

import { apiBase } from '../../config/api';

import './Organisation.scss';

import { IOrganisation, IService } from '../../types/types';
import OrganisationStore from '../../stores/organisationStore';

import SocialLinks from './SocialLinks';
import Loading from '../../components/Loading';
import ServiceCard from './ServiceCard';
import NotFound from '../NotFound';

interface RouteParams {
  organisation: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  organisationStore: OrganisationStore;
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
    const { organisation, associatedServices } = organisationStore;
    
    // organisation not found
    if (organisationStore.loading === false && !organisation) {
      return <NotFound />;
    }

    return (organisation &&
      <main>
         <Helmet>
          {get(organisation, 'name') && <title>{`${get(organisation, 'name')} | One Hounslow Connect`}</title>}
          {!get(organisation, 'name') && <title>Organisation | One Hounslow Connect</title>}

          {get(organisation, 'description') &&  <meta name="description" content={get(organisation, 'description')} />}
      
          {get(organisation, 'name') && <meta property="og:title" content={`${get(organisation, 'name')}`} />}
          {get(organisation, 'slug') && <meta property="og:url" content={`${process.env.REACT_APP_FRONTEND_URL}/${get(organisation, 'slug')}`} />}
          {getImg(organisation) && <meta property="og:image" content={getImg(organisation)} />}
          <meta property="og:type" content="website" />
        </Helmet>

        <div className={`organisation__header`}>
          <div className="flex-container">
            <div className="service__header__wrapper organisation__header__wrapper">
              <div className="organisation__header__logo">
                {organisation && <img src={getImg(organisation)} alt={`${organisation.name} logo`} />}
              </div>
              <div className="organisation__header__content flex-col flex-col--tablet--9">
                <span className="organisation__header__sub">Organisation</span>
                <h1>{get(organisation, 'name')}</h1>
                  {get(organisation, 'description') && <ReactMarkdown
                    className=""
                    source={get(organisation, 'description')}
                  />}

                <ul className="organisation__header__contact-details">
                  {get(organisation, 'phone') && <li key={`key_${get(organisation, 'phone')}`}><strong>Phone</strong><a href={`tel:${get(organisation, 'phone')}`}>{get(organisation, 'phone')}</a></li>} 
                  {get(organisation, 'url') && <li key={`key_${get(organisation, 'url')}`}><strong>Website</strong><a href={`${get(organisation, 'url')}`} target="_blank"  rel="noreferrer">{get(organisation, 'url')}</a></li>} 
                  {get(organisation, 'email') && <li key={`key_${get(organisation, 'email')}`}><strong>Email</strong><a href={`mailto:${get(organisation, 'email')}`}>{get(organisation, 'email')}</a></li>} 
                  {organisation.social_medias && organisation.social_medias.length && <li key="key_organisation_social"><strong>Social media</strong><SocialLinks organisationStore={organisationStore} /></li>}
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
              
              <div className="flex-col flex-col--12 flex-col--mobile--12 flex-col--tablet--12">
                <div className="flex-container flex-container--align-left flex-container--no-padding service__section service__section--no-padding">
                  
                  <div className="flex-col flex-col--9 flex-col--tablet--11 flex-col--mobile--12">
                    <h2 className="organisation__services--heading">Services provided by {get(organisation, 'name')}</h2>
                  </div>

                  <div className="flex-col flex-col--12 flex-col--mobile--12">
                    <div className="organisation__services--listing">
                      {(associatedServices && associatedServices.map((service: IService) => <ServiceCard  key={`key_${service.id}`} service={service} />))}
                    </div>
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

export default inject('organisationStore')(observer(Organisation));
