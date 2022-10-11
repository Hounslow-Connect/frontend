import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, RouteComponentProps } from 'react-router';
import { History } from 'history';

import { IEvent } from './IEvent';
import { apiBase } from '../../config/api';
import FallBackLogo from '../../assets/images/logo-fallback.png';
import { formatTimeFromString } from '../../views/Service/timeFormatting';

import './EventSummary.scss';

interface IProps extends RouteComponentProps {
  event: IEvent;
  history: History;
}

const EventSummary: React.FunctionComponent<IProps> = ({ event, history }) => {
  if (!event) {
    return null;
  }

  const { id, title, is_free, is_virtual, start_date, start_time, end_date, end_time, organisation_id, intro } = event;

  const eventStartDateFormatted = start_date ?  moment(start_date).format('ddd Do MMMM') : null
  const eventEndDateFormatted = end_date ? moment(end_date).format('ddd Do MMMM') : null

  return (
    <div key={id} className="event-summary-card" onClick={() => history.push(`/events/${id}`)}>
      <div className="event-summary-card__inner">
        <div className="search-result-card__title">
          <h3 className="event-summary-card__h3">{title}</h3>
          <div className="event-summary-card__pills">
            <div className="event-summary-card__tag event-summary-card__tag--cost">
              {is_free ? 'Free' : ' Costs'}
            </div>
            <div className="event-summary-card__tag event-summary-card__tag--virtual">
              {is_virtual ? 'Online' : 'In person'}
            </div>
          </div>
          <h4 className="event-summary-card__h4">
            {`${eventStartDateFormatted} ${formatTimeFromString(start_time)}`}{' '}
            { moment(start_date).isSame(end_date) ? `- ${end_time && formatTimeFromString(end_time)} ` : eventEndDateFormatted ? `- ${ eventEndDateFormatted} ${end_time && formatTimeFromString(end_time)}  ` : null }
          </h4>
        </div>
        <div className="search-result-card__logo">
          <img
            src={`${apiBase}/organisations/${organisation_id}/logo.png`}
            alt={`logo for ${title}`}
            onError={(ev: any) => (ev.target.src = FallBackLogo)}
          />
        </div>
        <p className="event-summary-card__p">{intro}</p>
        <div className="event-summary-card__view-more">
          <Link to={`/events/${id}`}>
            <span>View more</span>
            <FontAwesomeIcon icon="arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EventSummary);
