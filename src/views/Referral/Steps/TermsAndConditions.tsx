import React from 'react';
import { observer, inject } from 'mobx-react';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import ReferralStore from '../../../stores/referralStore';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';

interface IProps {
  referralStore?: ReferralStore;
}

const TermsAndConditions: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <form
      className="flex-col flex-col--7 flex-col--mobile--12 flex-col--tablet--12 flex-col--tablet-large--6"
      style={{ margin: '24px 0' }}
    >
      <div className="flex-container flex-container--mobile-no-padding referral--intro--no-padding">
        <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--intro">
          <p className="referral__step-container--steps">{`Step 3 of ${referralStore.totalSteps}`}</p>
          <h1>How we will use this information</h1>
        </div>
        <div className="flex-container referral--intro--no-padding referral__step-container referral__step-container--full-width">
          <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--form referral__form referral__terms">
            <p className="body--l referral__terms--heading">
              If you click <strong>I agree</strong> below, you are consenting to the following:
            </p>

            <ul>
              <li>{`To have the information shared with ${get(referralStore, 'service.name')}`}</li>
              <li>{`For ${get(
                referralStore,
                'service.name'
              )} to contact you regarding the service you have connected with`}</li>
              <li>
                For the Hounslow Connect admin team and/or the London Borough of Hounslow to
                contact you/the client regarding your experience or to request feedback
              </li>

              <li>
                For the Hounslow Connect admin team and/or the London Borough of Hounslow to
                contact you to let you know about changes to our terms of service
              </li>

              <li>
                You confirm you have obtained the referred persons consent and they authorise you to refer them for {`${get(referralStore, 'service.name')}`}, where applicable
              </li>
            </ul>

            <p className="body--s referral__terms--privacy">
              For further information, please view our{' '}
              <Link to="/privacy-policy">privacy policy</Link>
            </p>

            <Checkbox
              label={`I agree, please proceed with the connection to ${get(
                referralStore,
                'service.name'
              )}`}
              id="referral_consented"
              checked={referralStore.referral.referral_consented}
              className="referral__terms--checkbox"
              onChange={() => referralStore.toggleConsent()}
            />
            <p className="body--s">
              I do not agree, please <Link to="/">take me back</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-col flex-col--12 flex-col--mobile--12">
        <div className="flex-container referral--next-step referral--intro--no-padding">
          <div className="flex-col flex-col--12 flex-col--mobile--12">
            <Button
              text="Continue"
              type="submit"
              icon="chevron-right"
              onClick={(e: any) => {
                e.preventDefault();
                referralStore.submitReferral();
              }}
              disabled={!referralStore.referral.referral_consented}
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

export default inject('referralStore')(observer(TermsAndConditions));
