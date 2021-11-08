import React, { Component, Fragment } from 'react';
import { isMobile } from 'react-device-detect';
import Cookies from 'universal-cookie';
import get from 'lodash/get';

import Button from '../Button';
import InstructionModal from './InstructionModal/InstructionModal';
import HomeScreenIcon from '../../assets/images/icons/home-screen-icon.svg';
import './HomeScreenPrompt.scss';

import ReferralStore from '../../stores/referralStore';

import { observer } from 'mobx-react';

interface IState {
  referralStore?: ReferralStore;
  isVisible: boolean;
  showInstructionModal: boolean;
}

const cookies = new Cookies();

@observer
class HomeScreenPrompt extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isVisible: true,
      showInstructionModal: false,
    };
  }

  componentDidMount() {
    const { referralStore } = this.props;

    this.getDisplayCookie();

    if (get(referralStore, 'showConfirmation')) {
      this.setState({
        isVisible: true,
      });
    }
  }

  getDisplayCookie() {
    const displayCookie = cookies.get('ct_home_screen_prompt_visible');

    this.setState({
      isVisible: displayCookie,
    });
  }

  setDisplayCookie(value: boolean) {
    const d = new Date();

    d.setMonth(d.getMonth() + 6);
    console.log(d);

    cookies.set('ct_home_screen_prompt_visible', false, {
      expires: d,
    });

    this.setState({
      isVisible: true,
      showInstructionModal: value,
    });
  }

  render() {
    const { isVisible, showInstructionModal } = this.state;

    return (
      <Fragment>
        {isMobile && !isVisible && (
          <div className="home-screen-prompt">
            <div className="home-screen-prompt__wrapper">
              <div className="home-screen-prompt__icon">
                <span>
                  <img src={HomeScreenIcon} alt="Add to home screen icon" />
                </span>
              </div>
              <div className="home-screen-prompt__info">
                <h3 className="home-screen-prompt__title">Add to homescreen?</h3>
                <p className="home-screen-prompt__description">
                  Add this website to your homescreen to quickly access support opportunities
                </p>
                <div className="home-screen-prompt__ctas">
                  <Button
                    size="small"
                    light={true}
                    text="No thanks"
                    type="button"
                    onClick={(e: React.ChangeEvent<HTMLButtonElement>) =>
                      this.setDisplayCookie(false)
                    }
                  />
                  <Button
                    size="small"
                    text="Yes, let's add"
                    type="button"
                    onClick={(e: React.ChangeEvent<HTMLButtonElement>) =>
                      this.setDisplayCookie(true)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <InstructionModal
          setDisplayCookie={this.setDisplayCookie.bind(this)}
          isOpen={showInstructionModal}
        />
      </Fragment>
    );
  }
}

export default HomeScreenPrompt;
