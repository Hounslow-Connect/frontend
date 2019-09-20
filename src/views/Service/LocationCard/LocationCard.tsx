import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import orderBy from 'lodash/orderBy';
import ReactSVG from 'react-svg';

import WheelchairAccessible from '../../../assets/images/icons/accessibility/wheelchair-accessible.svg';
import InductionLoop from '../../../assets/images/icons/accessibility/induction-loop.svg';

import { humanReadableRegularOpeningHour, formatHolidayTimes } from '../timeFormatting';
import { IServiceLocation, IOpeningHour } from '../../../types/types';
import { apiBase } from '../../../config/api';
import Link from '../../../components/Link';
import Accordian from '../../../components/Accordian';

interface IProps {
  location: IServiceLocation;
}

const formatOpeningTimes = (openingTimes: IOpeningHour[]) => {
  const orderedTimes = orderBy(openingTimes, ['frequency', 'weekday'], ['asc', 'asc']);

  return orderedTimes.map((time: IOpeningHour) => humanReadableRegularOpeningHour(time));
};

const LocationCard: React.FunctionComponent<IProps> = ({ location }) => (
  <div className="flex-col flex-col--mobile--12">
    <div className="flex-container flex-container--align-center flex-container--mobile-no-padding">
      <div className="flex-col flex-col--mobile--7">
        <h4>{get(location, 'location.address_line_1', '')}</h4>
        <p>{`${get(location, 'location.address_line_2', '')}, ${get(
          location,
          'location.postcode',
          ''
        )}`}</p>
      </div>
      <div className="flex-col flex-col--mobile--5">
        {location.has_image && (
          <img
            src={`${apiBase}/service-locations/${location.id}/image.png`}
            alt={`${get(location, 'location.address_line_1')}`}
          />
        )}
      </div>
      <div className="flex-container flex-container--justify flex-container--mobile-no-padding">
        {get(location, 'location.has_wheelchair_access') && <ReactSVG src={WheelchairAccessible} />}
        {get(location, 'location.has_induction_loop') && <ReactSVG src={InductionLoop} />}
      </div>
      <div className="flex-col flex-col--mobile--12">
        <Link
          icon="map"
          text="View on Google Maps"
          size="medium"
          href={`https://www.google.com/maps/search/?api=1&query=${get(
            location,
            'location.lat'
          )},${get(location, 'location.lon')}`}
          iconPosition="right"
        />
        <Link
          icon="map-signs"
          text="Get directions on Google Maps"
          size="medium"
          href={`https://www.google.com/maps?daddr=${get(location, 'location.lat')},${get(
            location,
            'location.lon'
          )}`}
          iconPosition="right"
        />
      </div>
      <div className="flex-col flex-col--mobile--12">
        <h4>
          <FontAwesomeIcon icon="clock" /> Opening Times
        </h4>
        {formatOpeningTimes(location.regular_opening_hours).map(openingTime => (
          <p key={uniqueId()}>{openingTime}</p>
        ))}

        {!!location.holiday_opening_hours.length && (
          <Accordian title="Bank holiday times">
            {formatHolidayTimes(location.holiday_opening_hours).map((time: string) => (
              <p key={uniqueId()} dangerouslySetInnerHTML={{ __html: time }} />
            ))}
          </Accordian>
        )}
      </div>
    </div>
  </div>
);

export default LocationCard;
