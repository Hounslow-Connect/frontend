import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import './Personas.scss';
import PersonasCard from '../PersonasCard';
import { IPersona } from '../../types/types';
import CMSStore from '../../stores/CMSStore';
import get from 'lodash/get';

interface IProps extends RouteComponentProps {
  personas: IPersona[];
  cmsStore?: CMSStore;
}

const Personas: React.FunctionComponent<IProps> = ({ personas, history, cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <section className="personas" role="button">
      <div className="flex-container">
        <div className="flex-col flex-col--12 personas--intro">
          <h2 className="personas__heading">{get(cmsStore, 'home.personas_title')}</h2>
          <p>{get(cmsStore, 'home.personas_content')}</p>
        </div>
      </div>

      <div className="personas__list flex-container flex-container--left">
        {personas.map(persona => (
          <PersonasCard
            key={persona.id}
            persona={persona}
            action={() => {
              history.push({
                pathname: '/results',
                search: `?persona=${persona.id}`,
              });
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default withRouter(inject('cmsStore')(observer(Personas)));
