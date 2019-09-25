import React from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import ReferralStore from '../../../../stores/referralStore';

import Form from './Form';

interface IProps {
  referralStore?: ReferralStore;
}

const StepSix: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <form
      className="flex-col flex-col--7 flex-col--mobile--12 flex-col--tablet-large--6"
      style={{ margin: '24px 0' }}
    >
      <Form referralStore={referralStore} />
    </form>
  );
};

export default inject('referralStore')(observer(StepSix));
