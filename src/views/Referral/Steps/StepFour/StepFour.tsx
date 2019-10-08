import React from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import get from 'lodash/get';

import ReferralStore from '../../../../stores/referralStore';

import Form from './Form';

interface IProps {
  referralStore?: ReferralStore;
}

const chooseForm = (referralStore: ReferralStore) => {
  switch (referralStore.whoFor) {
    case 'Myself':
      return (
        <Form
          referralStore={referralStore}
          header="About you"
          label1="Your email address (if you have one)"
          label2="Your UK phone number"
          otherContactToggle="You can't provide an email address or telephone number"
          otherContactHeading="Alternative way to contact you"
          otherContactDescription="This could be your address, or an address where we can get in contact with you."
        />
      );
    case 'A friend or family member':
      return (
        <Form
          referralStore={referralStore}
          header="About your Friend or Family Member"
          subtitle={`This is details of the person who will be contacted by ${get(
            referralStore,
            'service.name'
          )}.`}
          label1="Their email address (if they have one)"
          label2="Their UK mobile number"
          otherContactToggle="They can't provide an email address or telephone number"
          otherContactHeading="Alternative way to contact them"
          otherContactDescription="This could be their address, or an address where we can get in contact with them."
        />
      );
    case 'Someone else':
      return (
        <Form
          referralStore={referralStore}
          header="About the person being Connected"
          label1="Their email address (if they have one)"
          label2="Their UK mobile number"
          otherContactToggle="They can't provide an email address or telephone number"
          otherContactHeading="Alternative way to contact them"
          otherContactDescription="This could be their address, or an address where we can get in contact with them."
        />
      );
    default:
      break;
  }
};

const StepFour: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <form
      className="flex-col flex-col--7 flex-col--mobile--12 flex-col--tablet--12 flex-col--tablet-large--6"
      style={{ margin: '24px 0' }}
    >
      {chooseForm(referralStore)}
    </form>
  );
};

export default inject('referralStore')(observer(StepFour));
