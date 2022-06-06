import React from 'react';

import './CommunityEvents.scss';

interface ICommunityEventsProps {
}

const CommunityEvents: React.FunctionComponent<ICommunityEventsProps> = () => (
  <div className="community-events">
    <div className="flex-container">
      <div className="community-events__inner">
        <h2>Community events happening this week ...</h2>
        <div className="flex-container flex-container--justify flex-container--no-padding">
          <button className="button button--medium" type="submit">Search for more events</button>
        </div>
      </div>
    </div>
  </div>
);

export default CommunityEvents;
