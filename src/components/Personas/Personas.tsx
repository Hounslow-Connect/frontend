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
  <section className="personas flex-justify-centre" role="button">
    <h2 className="personas__heading">I want to </h2>
    <p>Sometimes it's hard to know where to start - here are some suggestions</p>
    <div className="row">
      {personas.map(({ name, intro, id }) => (
        <PersonasCard
          key={id}
          name={name}
          intro={intro}
          action={() => {
            history.push({
              pathname: '/results',
              search: `?persona=${id}`,
            });
          }}
        />
      ))}
    </div>
  </section>
);

export default withRouter(observer(Personas));
