import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import orderBy from 'lodash/orderBy';
import ReactSVG from 'react-svg';

import './LocationCard.scss';

import WheelchairAccessible from '../../../assets/images/icons/accessibility/wheelchair-accessible.svg';
import InductionLoop from '../../../assets/images/icons/accessibility/induction-loop.svg';

import { humanReadableRegularOpeningHour, formatHolidayTimes } from '../timeFormatting';
import { IServiceLocation, IOpeningHour } from '../../../types/types';
import { apiBase } from '../../../config/api';
import Link from '../../../components/Link';
import Accordian from '../../../components/Accordian';

interface IProps {
  location: IServiceLocation;
  className: string;
  desktop?: boolean;
}

const formatOpeningTimes = (openingTimes: IOpeningHour[]) => {
  const orderedTimes = orderBy(openingTimes, ['frequency', 'weekday'], ['asc', 'asc']);

  return orderedTimes.map((time: IOpeningHour) => humanReadableRegularOpeningHour(time));
};

const LocationCard: React.FunctionComponent<IProps> = ({ location, className, desktop }) => (
  <div className={`flex-col flex-col--mobile--12 ${className} location__container`}>
    <div
      className="flex-container flex-container--mobile-no-padding flex-container--align-center service__section--no-padding"
      style={{ alignItems: 'stretch' }}
    >
      <div className="flex-col flex-col--12">
        <div
          className={cx(
            'flex-container flex-container--mobile-no-padding location__container--address',
            {
              'flex-container--row-reverse service__section--no-padding': desktop,
            }
          )}
        >
          <div
            className={`flex-col ${
              location.has_image ? 'flex-col--8' : 'flex-col--12'
            } flex-col--mobile--12`}
          >
            <h3>{get(location, 'location.address_line_1', '')}</h3>
            <p className="location__address">{`${
              get(location, 'location.address_line_2', '')
                ? get(location, 'location.address_line_2', ',')
                : ''
            } ${get(location, 'location.postcode', '')}`}</p>
            <div className="flex-col flex-col--mobile--12 location__google-maps">
              <Link
                icon="map"
                text="View on Google Maps"
                size="medium"
                href={`https://www.google.com/maps/search/?api=1&query=${get(
                  location,
                  'location.lat'
                )},${get(location, 'location.lon')}`}
                iconPosition="right"
                target="_blank"
                rel="noopener nofollow"
                className="location__google-maps--link"
              />
              <Link
                icon="map-signs"
                text="Get directions on Google Maps"
                size="medium"
                href={`https://www.google.com/maps?daddr=${get(location, 'location.lat')},${get(
                  location,
                  'location.lon'
                )}`}
                target="_blank"
                rel="noopener nofollow"
                iconPosition="right"
                className="location__google-maps--link"
              />
            </div>
            <div className="flex-col flex-col--12">
              {!!location.regular_opening_hours.length && (
                <div className="flex-col flex-col--mobile--12 location__opening-times">
                  <h3 className="location__opening-times--header">
                    <FontAwesomeIcon icon="clock" /> Opening hours
                  </h3>
                  <div className="flex-container flex-container--no-padding">
                    <div className="flex-col flex-col--12 flex-col--mobile--12 location__opening-times--list">
                      {formatOpeningTimes(location.regular_opening_hours).map(
                        (openingTime: string) => (
                          <p key={uniqueId()} dangerouslySetInnerHTML={{ __html: openingTime }} />
                        )
                      )}
                    </div>
                    <div className="flex-col flex-col--12 flex-col--mobile--12 location__opening-times--list">
                      {!!location.holiday_opening_hours.length && (
                        <Accordian title="Bank holiday times" className="location__holiday-times">
                          {formatHolidayTimes(location.holiday_opening_hours).map(
                            (time: string) => (
                              <p key={uniqueId()} dangerouslySetInnerHTML={{ __html: time }} />
                            )
                          )}
                        </Accordian>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-col flex-col--4 location__image">
            {location.has_image && (
              <img
                src={`${apiBase}/service-locations/${location.id}/image.png?max_dimension=250`}
                alt={`${get(location, 'location.address_line_1')}`}
              />
            )}
            <div className="flex-container flex-container--no-padding location__accessibility">
              {get(location, 'location.has_wheelchair_access') && (
                <ReactSVG src={WheelchairAccessible} />
              )}
              {get(location, 'location.has_induction_loop') && <ReactSVG src={InductionLoop} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LocationCard;
