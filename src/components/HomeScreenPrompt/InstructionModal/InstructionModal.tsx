import React, { Component } from 'react';
import { isIOS } from 'react-device-detect';

import './InstructionModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeScreenIcon from '../../../assets/images/icons/home-screen-icon.svg';

import Modal from 'react-modal';

class InstructionModal extends Component<any> {
  render() {
    const renderModalContent = ()=>{
      if(isIOS){
        return <p>You can add the launcher to your home screen by clicking the 'Share Options' <FontAwesomeIcon icon="share-square" /> 'Add to home Screen' then <FontAwesomeIcon icon="plus-square" /> 'Add</p>;
      } else{
        return <p>You can add the launcher to your home screen by clicking the 'Settings' <FontAwesomeIcon icon="ellipsis-v" /> 'Add to shortcut to home'</p>;
      }
    }

    const renderModalFooter = ()=>{
      if(isIOS){
        return <p>Tap <FontAwesomeIcon icon="share-square" /> then 'Add to homescreen'</p>;
      } else{
        return <p>Tap <FontAwesomeIcon icon="ellipsis-v" /> then 'Add shortcut to home'</p>;
      }
    }

    return (
      <Modal
        isOpen={this.props.isOpen}
        className="modal instruction-modal"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            zIndex: 100003000
          }
        }}
      >
        <div className="instruction-modal__main">
          <div className="instruction-modal__close">
            <button onClick={() => this.props.setDisplayCookie(false)}>Close <FontAwesomeIcon icon="window-close" /></button>
          </div>
          <div className="instruction-modal__icon">
            <span>
              <img src={HomeScreenIcon} alt="Add to home screen icon" />
            </span>
          </div>

          <div className="instruction-modal__content">
            <p>
              <strong>One Hounslow Connect</strong><br />
              https://onehounslowconnect.london
            </p>
            <p>Add this app to your home screen for quick access to our services.</p>
            {renderModalContent()}
          </div>
        </div>
        <div className="instruction-modal__footer">
          {renderModalFooter()}
        </div>
      </Modal>
    );
  }
}

export default InstructionModal;