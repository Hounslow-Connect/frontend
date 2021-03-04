import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../components/Button';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';

interface IProps extends RouteComponentProps {
  id: string;
}

const ReferralCard: React.FunctionComponent<IProps> = ({ history, id }) => (
  <div className="flex-container flex-container--align-center flex-container--mobile-no-padding service__referral">
    <div className="flex-col flex-col--tablet--6 flex-col--mobile--12 flex-col--mobile-small--12">
      <Button
        text="Make a connection"
        icon="arrow-right"
        onClick={() => history.push(`/referral?service=${id}`)}
      />
    </div>
    <div className="flex-col">
      <div className="flex-container flex-container--no-padding flex-container--align-center service__refer-disclaimer">
        <div className="flex-col--1">
          <FontAwesomeIcon icon="info-circle" size="lg" />
        </div>
        <div className="flex-col--11">
          <p>
            It can take up to <strong>2 weeks</strong> to receive a reply
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(observer(ReferralCard));
