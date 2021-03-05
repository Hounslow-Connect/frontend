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
  <section
    className="flex-col--4 flex-col--medium--3 flex-col--tablet--5 flex-col--mobile--12 card"
    onClick={action}
    role="navigation"
    tabIndex={0}
  >
    <div className="flex-container flex-container--mobile-no-padding flex-container--align-center">
      <div className="flex-col--12 flex-col--mobile--4 card__image">
        <img
          src={`${apiBase}/collections/personas/${persona.id}/image.png?max_dimension=600`}
          alt={`Services relating to ${persona.name}`}
          className="image"
        />
      </div>
      <div className="flex-col--12 flex-col--mobile--8 card__description">
        <h3 className="card__header">{persona.name}</h3>
        <p className="mobile-hide">{persona.intro}</p>
      </div>
    </div>
  </section>
);

export default inject('windowSizeStore')(observer(PersonasCard));
