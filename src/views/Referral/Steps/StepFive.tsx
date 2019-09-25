import React from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import ReferralStore from '../../../stores/referralStore';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface IProps {
  referralStore?: ReferralStore;
}

interface IStepFiveInputProps {
  referralStore: ReferralStore;
  label: string;
  heading: string;
  subtitle?: string;
}

const StepFiveInput: React.FunctionComponent<IStepFiveInputProps> = ({
  referralStore,
  label,
  heading,
  subtitle,
}) => (
  <div className="flex-container flex-container--mobile-no-padding referral--intro--no-padding">
    <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--intro">
      <p className="referral__step-container--steps">{`Step 3 of ${referralStore.totalSteps}`}</p>
      <h1>{heading}</h1>
      {subtitle && <p className="referral__step-container--subtitle">{subtitle}</p>}
    </div>
    <div className="flex-container referral--intro--no-padding referral__step-container referral__step-container--full-width">
      <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--form referral__form">
        <label htmlFor="name">
          <p className="referral__step-container--question--large referral__step-container--label">
            {label}
          </p>
        </label>
        <Input
          id="name"
          value={get(referralStore, 'referral.referee_name') || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            referralStore.handleInput('referee_name', e.target.value)
          }
          className="referral__step-container--input"
          placeholder="John Smith"
          required={true}
        />
      </div>
    </div>
  </div>
);

const chooseForm = (referralStore: ReferralStore) => {
  switch (referralStore.whoFor) {
    case 'A friend or family member':
      return (
        <StepFiveInput
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
        <StepFiveInput
          label="Your full name"
          heading="About you"
          subtitle={`You will be notified when ${get(
            referralStore,
            'service.name'
          )} makes contact with ${get(referralStore, 'referral.name')}.`}
          referralStore={referralStore}
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
      className="flex-col flex-col--7 flex-col--mobile--12 flex-col--tablet-large--6"
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
              disabled={!referralStore.referral.name}
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
