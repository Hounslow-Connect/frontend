import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../components/Button';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';

interface IProps extends RouteComponentProps {
  id: string;
}

const ReferralCard: React.FunctionComponent<IProps> = ({ history, id }) => (
  <div className="flex-container flex-container--align-center flex-container--justify flex-container--mobile-no-padding service__referral">
    <div className="flex-col flex-col--tablet--5 flex-col--mobile--8 flex-col--mobile-small--12">
      <Button
        text="Make a connection"
        icon="arrow-right"
        onClick={() => history.push(`/referral?service=${id}`)}
      />
    </div>
    <div className="flex-col flex-col--tablet--12">
      <p className="service__refer-disclaimer">
        <FontAwesomeIcon icon="info-circle" /> It can take up to 2 weeks to recieve a reply
      </p>
    </div>
  </div>
);

export default withRouter(observer(ReferralCard));
