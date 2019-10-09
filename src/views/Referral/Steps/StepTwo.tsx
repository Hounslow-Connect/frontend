import React from 'react';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import cx from 'classnames';

import ReferralStore from '../../../stores/referralStore';
import Button from '../../../components/Button';

interface IProps {
  name: string;
  referralStore?: ReferralStore;
}

interface IButtonProps {
  text: 'Myself' | 'A friend or family member' | 'Someone else';
  subText: string;
  icon: IconName;
  setWho: (who: 'Myself' | 'A friend or family member' | 'Someone else') => void;
  active: boolean;
  smallPadding?: boolean;
  autoFocus?: boolean;
}

const ReferButton: React.FunctionComponent<IButtonProps> = observer(
  ({ icon, text, setWho, active, subText, smallPadding, autoFocus }) => (
    <button
      className={cx(
        'flex-container flex-container--mobile-no-padding flex-container--justify referral__button flex-container--align-center',
        {
          'referral__button--active': active,
        }
      )}
      aria-label={`Connect ${text}`}
      onClick={() => setWho(text)}
      autoFocus={autoFocus}
    >
      <div
        className={cx('flex-col flex-col--12 flex-col--mobile--2 flex-col--tablet-large--2', {
          'referral__button--small-margin': smallPadding,
        })}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <div
        className={cx('flex-col flex-col--12 flex-col--mobile--10 flex-col--tablet-large--10', {
          'referral__button--small-margin': smallPadding,
        })}
      >
        <h4>{text}</h4>
      </div>
      <div className="flex-col flex-col--10 mobile-hide tablet-hide tablet--large-hide">
        <p className="body--s referral__button--subtext">{subText}</p>
      </div>
    </button>
  )
);

const StepTwo: React.FunctionComponent<IProps> = ({ name, referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <div className="flex-col flex-col--7 flex-col--mobile--12 flex-col--tablet--12 flex-col--tablet-large--6">
      <div className="flex-container flex-container--mobile-no-padding referral--intro--no-padding referral__step-container referral__form">
        <div className="flex-col flex-col--12 flex-col--mobile--12">
          <p className="referral__step-container--question body--s">{`Who would like to be connected to ${name}?`}</p>
        </div>
        <div className="flex-col flex-col--12 flex-col--mobile--12">
          <div className="flex-container referral__step-container--inner referral--intro--no-padding">
            <div className="flex-col flex-col--4 flex-col--mobile--12 flex-col--tablet-large--12">
              <ReferButton
                icon="user"
                text="Myself"
                setWho={referralStore.setWhoFor}
                active={referralStore.whoFor === 'Myself'}
                subText="Filling in my own details"
                autoFocus={true}
              />
            </div>
            <div className="flex-col flex-col--4 flex-col--mobile--12 flex-col--tablet-large--12">
              <ReferButton
                icon="user-friends"
                text="A friend or family member"
                setWho={referralStore.setWhoFor}
                active={referralStore.whoFor === 'A friend or family member'}
                subText="Someone I know filling in my details"
                smallPadding={true}
              />
            </div>
            <div className="flex-col flex-col--4 flex-col--mobile--12 flex-col--tablet-large--12">
              <ReferButton
                icon="hands-helping"
                text="Someone else"
                setWho={referralStore.setWhoFor}
                active={referralStore.whoFor === 'Someone else'}
                subText="A client, customer, or member of the public"
              />
            </div>
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
              onClick={() => referralStore.nextStep()}
              disabled={referralStore.step === 2 && !referralStore.whoFor}
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
    </div>
  );
};

export default inject('referralStore')(observer(StepTwo));
