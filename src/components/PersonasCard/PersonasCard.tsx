import React from 'react';
import { apiBase } from '../../config/api';

import './PersonasCard.scss';
import { IPersona } from '../../types/types';
import { inject, observer } from 'mobx-react';
import WindowSizeStore from '../../stores/windowSizeStore';

interface IProps {
  persona: IPersona;
  action: () => void;
  windowSizeStore?: WindowSizeStore;
}

const PersonasCard: React.FunctionComponent<IProps> = ({ persona, action, windowSizeStore }) => (
  <div className="card" onClick={action} role="navigation" tabIndex={0}>
    <div className="card__image">
      <img
        src={`${apiBase}/collections/personas/${persona.id}/image.png?max_dimension=600`}
        alt={`Services relating to ${persona.name}`}
        className="image"
      />
    </div>
    <div className="card__content">
      <h3 className="card__header">{persona.name}</h3>
      <p className="card__description">{persona.intro}</p>
    </div>
  </div>
);

export default inject('windowSizeStore')(observer(PersonasCard));
