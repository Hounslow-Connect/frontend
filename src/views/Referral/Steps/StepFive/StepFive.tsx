import React from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import ReferralStore from '../../../../stores/referralStore';
import Button from '../../../../components/Button';
import Form from './Form';

interface IProps {
  referralStore?: ReferralStore;
}

const chooseForm = (referralStore: ReferralStore) => {
  switch (referralStore.whoFor) {
    case 'A friend or family member':
      return (
        <Form
          label="Your full name"
          heading="About you"
          subtitle={`You will be notified when ${get(
            referralStore,
            'service.name'
          )} makes contact with ${get(referralStore, 'referral.name')}.`}
          referralStore={referralStore}
        />
      );
    case 'Someone else':
      return (
        <Form
          label="Your full name"
          heading="About you"
          subtitle={`You will be notified when ${get(
            referralStore,
            'service.name'
          )} makes contact with ${get(referralStore, 'referral.name')}.`}
          referralStore={referralStore}
          showPartnerOrgs={true}
        />
      );
    default:
      break;
  }
};

const StepFive: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <form
      className="flex-col flex-col--7 flex-col--mobile--12 flex-col--tablet--12 flex-col--tablet-large--6"
      style={{ margin: '24px 0' }}
    >
      {chooseForm(referralStore)}
      <div className="flex-col flex-col--12 flex-col--mobile--12">
        <div className="flex-container referral--next-step referral--intro--no-padding">
          <div className="flex-col flex-col--12 flex-col--mobile--12">
            <Button
              text="Continue"
              type="submit"
              icon="chevron-right"
              onClick={() => referralStore.nextStep()}
              disabled={!referralStore.referral.referee_name}
            />
          </div>
          <div className="flex-col flex-col--12 referral--step">
            <span
              className="body--s"
              dangerouslySetInnerHTML={{ __html: referralStore.stepDescription }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default inject('referralStore')(observer(StepFive));
