import React, { Component } from 'react';
import Modal from 'react-modal';
import { inject, observer } from 'mobx-react';
import UIStore from '../../stores/uiStore';
import feedbackStore from '../../stores/feedbackStore';

import './FeedbackModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../Input';
import Button from '../Button';
import { Link } from 'react-router-dom';

interface IProps {
  uiStore?: UIStore;
}

class FeedbackModal extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      touched: {
        email: false,
        phone: false,
        feedback: false,
        name: false,
      },
      errors: {
        email: false,
        phone: false,
        feedback: false,
      },
    };
  }

  validate = async () => {
    return this.setState({
      errors: {
        email: feedbackStore.email
          ? !feedbackStore.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
          : false,
        phone: feedbackStore.phone ? !feedbackStore.phone.match(/^(0(\s*[0-9]\s*){10})$/) : false,
        feedback: !feedbackStore.feedback,
      },
    });
  };

  handleSubmit = async () => {
    await this.validate();

    const canSubmit = Object.values(this.state.errors).every(error => error === false);

    if (canSubmit) {
      feedbackStore.submitFeedback();
    } else {
      return;
    }
  };

  render() {
    const { uiStore } = this.props;
    const { errors } = this.state;

    if (!uiStore) {
      return null;
    }

    return (
      <Modal
        isOpen={uiStore.feedbackModalOpen}
        className="modal"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
        <div className="flex-container">
          <div className="flex-col flex-col--12 modal__close">
            <button onClick={() => uiStore.toggleFeedbackModal()} aria-label="Close modal">
              <p>
                Close <FontAwesomeIcon icon="times" />
              </p>
            </button>
          </div>
          <div className="flex-col flex-col--12 ">
            <h1>{feedbackStore.submitted ? 'Thank you' : 'Submit your feedback'}</h1>
            <p className="body-l modal__question">We would really like to hear your views about the information on this page. Your feedback goes to the One Hounslow Connect team and all feedback is private.</p>
          </div>

          {feedbackStore.submitted ? (
            <div className="flex-container">
              <p className="body-l modal__question">
                Your feedback has been submitted to the Hounslow Connect admin team.
              </p>
            </div>
          ) : (
            <form className="flex-container">
              <div className="flex-col flex-col--12 modal__question">
                <label htmlFor="name">
                  <p>Name</p>
                </label>
                <Input
                  id="name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    feedbackStore.setField('name', e.target.value)
                  }
                  value={feedbackStore.name}
                />
              </div>
              <div className="flex-col flex-col--12 modal__question">
                <label htmlFor="email">
                  <p>Email address</p>
                </label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    feedbackStore.setField('email', e.target.value)
                  }
                  value={feedbackStore.email}
                  error={errors.email}
                  errorMessage="Please enter a valid email adress"
                />
              </div>
              <div className="flex-col flex-col--12 modal__question">
                <label htmlFor="phone">
                  <p>Phone number</p>
                </label>
                <Input
                  id="phone"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    feedbackStore.setField('phone', e.target.value)
                  }
                  value={feedbackStore.phone}
                  error={errors.phone}
                  errorMessage="Please enter a telephone number in the correct format - 11 characters"
                />
              </div>
              <div className="flex-col flex-col--12 modal__question">
                <label htmlFor="feedback">
                  <p>Feedback</p>
                </label>
                <textarea
                  id="feedback"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    feedbackStore.setField('feedback', e.target.value)
                  }
                  value={feedbackStore.feedback}
                />
                {this.state.errors.feedback && (
                  <p className={'input__error-message--show'}>Please enter your feedback</p>
                )}
              </div>
              <p>
                By submitting the above information, you consent to your data being used in
                accordance with our <Link to="/privacy-policy">privacy policy</Link>.
              </p>
              <Button
                text="Submit feedback"
                onClick={(e: any) => {
                  e.preventDefault();
                  this.handleSubmit();
                }}
                type="submit"
              />
            </form>
          )}
        </div>
      </Modal>
    );
  }
}

Modal.setAppElement('#root');

export default inject('uiStore')(observer(FeedbackModal));
