import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import './Personas.scss';
import PersonasCard from '../PersonasCard';
import { IPersona } from '../../types/types';

interface IProps extends RouteComponentProps {
  personas: IPersona[];
}

const Personas: React.FunctionComponent<IProps> = ({ personas, history }) => (
  <section className="personas" role="button">
    <div className="flex-container">
      <div className="flex-col flex-col--12">
        <h2 className="personas__heading">I want to ...</h2>
        <p>Sometimes it's hard to know where to start - here are some suggestions</p>
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

export default withRouter(observer(Personas));
