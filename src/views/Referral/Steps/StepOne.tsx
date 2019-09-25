import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';

interface IProps {
  name: string;
}

const StepOne: React.FunctionComponent<IProps> = ({ name }) => (
  <div className="flex-col flex-col--7 flex-col--mobile--12 flex-col--tablet-large--6 referral--intro">
    <div className="flex-container flex-container--mobile-no-padding referral--intro--no-padding">
      <div className="flex-col flex-col--12">
        <div className="flex-container referral--intro--row referral--intro--no-padding">
          <div className="flex-col mobile-hide flex-col--1 flex-col--mobile--1">
            <FontAwesomeIcon icon="envelope" />
          </div>
          <div className="flex-col flex-col--11 flex-col--mobile--11">
            <p className="body--s referral--intro--heading">
              By completing this short form we will:
            </p>
            <p className="referral--intro--description">{`Send the provided name and contact details to the organisers of ${name}.`}</p>
          </div>
        </div>
        <div className="flex-container referral--intro--row referral--intro--no-padding">
          <div className="flex-col mobile-hide flex-col--1 flex-col--mobile--1">
            <FontAwesomeIcon icon="calendar" />
          </div>
          <div className="flex-col flex-col--11 flex-col--mobile--11">
            <p
              className="body--s referral--intro--heading"
              dangerouslySetInnerHTML={{
                __html: `Within 10 working days, <em>${name}</em> will:`,
              }}
            />
            <p className="referral--intro--description">
              Get in touch to help access/provide more information about their service.
            </p>
          </div>
        </div>
        <div className="flex-container referral--intro--row referral--intro--no-padding">
          <div className="flex-col mobile-hide flex-col--1 flex-col--mobile--1">
            <FontAwesomeIcon icon="user-friends" />
          </div>
          <div className="flex-col flex-col--11 flex-col--mobile--11">
            <p className="referral--intro--description">
              You have the option to complete this form on someone else's behalf, with their
              permission.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default observer(StepOne);
