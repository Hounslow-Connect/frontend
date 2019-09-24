import React from 'react';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import cx from 'classnames';

import ReferralStore from '../../../stores/referralStore';

interface IProps {
  name: string;
  referralStore?: ReferralStore;
}

interface IButtonProps {
  text: 'Myself' | 'A friend or family member' | 'Someone else';
  icon: IconName;
  setWho: (who: 'Myself' | 'A friend or family member' | 'Someone else') => void;
  active: boolean;
}

const ReferButton: React.FunctionComponent<IButtonProps> = observer(
  ({ icon, text, setWho, active }) => (
    <button
      className={cx(
        'flex-container flex-container--mobile-no-padding flex-container--align-center referral__button',
        {
          'referral__button--active': active,
        }
      )}
      aria-label={`Connect ${text}`}
      onClick={() => setWho(text)}
    >
      <div className="flex-col flex-col--mobile--2">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="flex-col flex-col--mobile--10">
        <h4>{text}</h4>
      </div>
    </button>
  )
);

const StepTwo: React.FunctionComponent<IProps> = ({ name, referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <div className="flex-col flex-col--7 flex-col--mobile--12 flex-col--tablet-large--6 referral__step-container">
      <div className="flex-container flex-container--mobile-no-padding">
        <div className="flex-col flex-col--12 flex-col--mobile--12">
          <p className="referral__step-container--question body--s">{`Who would like to be connected to ${name}?`}</p>
        </div>
        <div className="flex-col flex-col--12 flex-col--mobile--12">
          <div className="flex-container referral__step-container--inner">
            <div className="flex-col flex-col--mobile--12">
              <ReferButton
                icon="user"
                text="Myself"
                setWho={referralStore.setWhoFor}
                active={referralStore.whoFor === 'Myself'}
              />
            </div>
            <div className="flex-col flex-col--mobile--12">
              <ReferButton
                icon="user-friends"
                text="A friend or family member"
                setWho={referralStore.setWhoFor}
                active={referralStore.whoFor === 'A friend or family member'}
              />
            </div>
            <div className="flex-col flex-col--mobile--12">
              <ReferButton
                icon="hands-helping"
                text="Someone else"
                setWho={referralStore.setWhoFor}
                active={referralStore.whoFor === 'Someone else'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject('referralStore')(observer(StepTwo));
