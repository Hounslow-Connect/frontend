import React from 'react';

import './PersonasCard.scss';

interface IProps {
  name: string;
  intro: string;
  action: () => void;
}

const PersonasCard: React.FunctionComponent<IProps> = ({ name, intro, action }) => (
  <section className="card flex" onClick={action}>
    <div>
      <h3 className="card__header">{name}</h3>
      <p>{intro}</p>
    </div>
  </section>
);

export default PersonasCard;
