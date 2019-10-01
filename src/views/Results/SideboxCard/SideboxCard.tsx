import React from 'react';
import { observer } from 'mobx-react';
import { ISidebox } from '../../../types/types';
import ReactMarkdown from 'react-markdown';

import './SideboxCard.scss';

interface IProps {
  sidebox: ISidebox;
}

const SideboxCard: React.FunctionComponent<IProps> = ({ sidebox }) => (
  <div className="flex-col flex-col--4 sidebox--container">
    <div className="flex-container flex-container--mobile-no-padding sidebox">
      <h3>{sidebox.title}</h3>
      <ReactMarkdown source={sidebox.content} />
    </div>
  </div>
);

export default observer(SideboxCard);
