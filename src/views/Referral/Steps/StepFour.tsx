import React, { useState } from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import cx from 'classnames';
import get from 'lodash/get';

import ReferralStore from '../../../stores/referralStore';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

interface IProps {
  referralStore?: ReferralStore;
}

interface IFormProps {
  referralStore: ReferralStore;
  header: string;
  subtitle?: string;
  label1: string;
  label2: string;
  otherContactToggle: string;
  otherContactHeading: string;
  otherContactDescription: string;
}

const chooseForm = (referralStore: ReferralStore) => {
  switch (referralStore.whoFor) {
    case 'Myself':
      return (
        <StepFourForm
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
        <StepFourForm
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
        <StepFourForm
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

const StepFourForm: React.FunctionComponent<IFormProps> = observer(
  ({
    referralStore,
    header,
    subtitle,
    label1,
    label2,
    otherContactToggle,
    otherContactHeading,
    otherContactDescription,
  }) => {
    const [open, toggleNoContactDetails] = useState(false);

    return (
      <div className="flex-container flex-container--mobile-no-padding referral--intro--no-padding">
        <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--intro">
          <p className="referral__step-container--steps">{`Step 2 of ${referralStore.totalSteps}`}</p>
          <h1>{header}</h1>
          {subtitle && <p className="referral__step-container--subtitle">{subtitle}</p>}
        </div>
        <div className="flex-container referral--intro--no-padding referral__step-container referral__step-container--full-width">
          <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--form referral__form">
            <label htmlFor="email">
              <p className="referral__step-container--question--large referral__step-container--label">
                {label1}
              </p>
            </label>
            <Input
              id="email"
              type="email"
              value={referralStore.referral.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                referralStore.handleInput('email', e.target.value)
              }
              className="referral__step-container--input"
              placeholder="john-smith@gmail.com"
              required={true}
            />
          </div>
          <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--form referral__form">
            <label htmlFor="phone">
              <p className="referral__step-container--question--large referral__step-container--label">
                {label2}
              </p>
            </label>
            <Input
              id="email"
              type="tel"
              value={referralStore.referral.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                referralStore.handleInput('phone', e.target.value)
              }
              className="referral__step-container--input"
              placeholder="01234 567 890"
              required={true}
              pattern="^(0(\s*[0-9]\s*){10})$"
            />
          </div>

          <div className="flex-col flex-col--12 referral__form">
            <p
              role="button"
              aria-label="Select if you can't provide these details"
              onClick={() => toggleNoContactDetails(!open)}
              className={cx('referral__step-container--other-contact--toggle', {
                'referral__step-container--other-contact--toggle--open': !open,
              })}
            >
              {otherContactToggle}
            </p>

            {open && (
              <div className="flex-container flex-container--mobile-no-padding referral__step-container--other-contact">
                <div className="flex-col flex-col--12">
                  <h3>{otherContactHeading}</h3>
                  <label htmlFor="other_contact">
                    <p>{otherContactDescription}</p>
                  </label>
                </div>
                <div className="flex-col flex-col--12">
                  <textarea
                    id="other_contact"
                    className="referral__step-container--text-area flex-col flex-col--12"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      referralStore.handleInput('other_contact', e.target.value)
                    }
                    placeholder={'Wood St\nKingston upon Thames\nKT1 1UJ'}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

const StepFour: React.FunctionComponent<IProps> = ({ referralStore }) => {
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
              onClick={() => {
                console.log('e');
              }}
              //   disabled={!referralStore.referral.name}
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

export default inject('referralStore')(observer(StepFour));
