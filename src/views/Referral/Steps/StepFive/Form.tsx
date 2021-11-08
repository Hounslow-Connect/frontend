import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import get from 'lodash/get';
import cx from 'classnames';

import ReferralStore from '../../../../stores/referralStore';
import Input from '../../../../components/Input';
import Autocomplete from '../../../../components/Autocomplete';

interface IProps {
  referralStore: ReferralStore;
  label: string;
  heading: string;
  subtitle?: string;
  showPartnerOrgs?: boolean;
}

interface IState {
  open: boolean;
}

class Form extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {}

  toggleOrganisation = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { heading, subtitle, label, referralStore, showPartnerOrgs } = this.props;
    const { open } = this.state;
    return (
      <div className="flex-container flex-container--mobile-no-padding referral--intro--no-padding">
        <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--intro">
          <p className="referral__step-container--steps">{`Step 3 of ${get(
            referralStore,
            'totalSteps'
          )}`}</p>
          <h1>{heading}</h1>
          <p className="referral__step-container--subtitle">{subtitle}</p>
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
          {showPartnerOrgs && (
            <Fragment>
              <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--form referral__form">
                <label htmlFor="orderBy" className="results__sort-by-label">
                  <p className="referral__step-container--question--large referral__step-container--label">
                    Do you work for one of our partner organisations?
                  </p>
                </label>

                <Autocomplete
                  storeTextField="organisation"
                  defaultText={get(referralStore, 'referral.organisation')}
                  defaultValue={get(referralStore, 'referral.organisation')}
                  store={referralStore}
                  endpointEntity="organisations"
                />
              </div>

              <div className="flex-col flex-col--12 referral__form">
                <p
                  role="button"
                  aria-label="Select if you can't provide these details"
                  onClick={() => this.toggleOrganisation()}
                  className={cx('referral__step-container--other-contact--toggle', {
                    'referral__step-container--other-contact--toggle--open': !open,
                  })}
                  tabIndex={0}
                  aria-pressed={open}
                  onKeyDown={e => (e.key === 'Enter' ? this.toggleOrganisation() : null)}
                >
                  I can't see my organisation
                </p>

                {open && (
                  <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--form referral__form referral__other-organisation">
                    <label htmlFor="organisation">
                      <p className="referral__step-container--question--large referral__step-container--label">
                        Other organisation
                      </p>
                    </label>
                    <Input
                      id="organisation"
                      value={get(referralStore, 'referral.organisation') || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        referralStore.handleInput('organisation', e.target.value)
                      }
                      className="referral__step-container--input"
                    />
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default observer(Form);
