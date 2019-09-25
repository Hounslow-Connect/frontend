import React, { Component, Fragment } from 'react';
import cx from 'classnames';

import ReferralStore from '../../../../stores/referralStore';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { observer } from 'mobx-react';

interface IProps {
  referralStore: ReferralStore;
  header: string;
  subtitle?: string;
  label1: string;
  label2: string;
  otherContactToggle: string;
  otherContactHeading: string;
  otherContactDescription: string;
}

interface IState {
  open: boolean;
  touched: {};
  errors: any;
}

class Form extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
      touched: {
        email: false,
        phone: false,
      },
      errors: {
        email: false,
        phone: false,
      },
    };
  }

  toggleNoContactDetails = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  validate = async () => {
    const { referralStore } = this.props;

    return this.setState({
      errors: {
        email: !referralStore.referral.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        phone: !referralStore.referral.phone.match(/^(0(\s*[0-9]\s*){10})$/),
      },
    });
  };

  handleSubmit = async () => {
    const { referralStore } = this.props;
    await this.validate();

    const canSubmit = Object.values(this.state.errors).every(error => error === false);

    if (canSubmit) {
      referralStore.nextStep();
    } else {
      return;
    }
  };

  handleBlur = (field: string) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  shouldMarkError = (field: string) => {
    // @ts-ignore
    const hasError = this.state.errors[field];
    // @ts-ignore
    const shouldShow = this.state.touched[field];
    return hasError ? shouldShow : false;
  };

  render() {
    const {
      referralStore,
      header,
      subtitle,
      label1,
      label2,
      otherContactToggle,
      otherContactHeading,
      otherContactDescription,
    } = this.props;

    const { open, errors } = this.state;

    return (
      <Fragment>
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
                onBlur={() => this.handleBlur('email')}
                error={errors.email}
                errorMessage="Please enter a valid email adress"
              />
            </div>
            <div className="flex-col flex-col--12 flex-col--mobile--12 referral__step-container--form referral__form">
              <label htmlFor="phone">
                <p className="referral__step-container--question--large referral__step-container--label">
                  {label2}
                </p>
              </label>
              <Input
                id="phone"
                type="tel"
                value={referralStore.referral.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  referralStore.handleInput('phone', e.target.value)
                }
                className="referral__step-container--input"
                placeholder="01234 567 890"
                onBlur={() => this.handleBlur('phone')}
                error={errors.phone}
                errorMessage="Please enter a telephone number in the correct format - 11 characters"
              />
            </div>

            <div className="flex-col flex-col--12 referral__form">
              <p
                role="button"
                aria-label="Select if you can't provide these details"
                onClick={() => this.toggleNoContactDetails()}
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
        <div className="flex-col flex-col--12 flex-col--mobile--12">
          <div className="flex-container referral--next-step referral--intro--no-padding">
            <div className="flex-col flex-col--12 flex-col--mobile--12">
              <Button
                text="Continue"
                type="submit"
                icon="chevron-right"
                onClick={(e: any) => {
                  e.preventDefault();
                  this.handleSubmit();
                }}
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
      </Fragment>
    );
  }
}

export default observer(Form);
