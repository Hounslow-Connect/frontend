import React from 'react';
import { observer } from 'mobx-react';

import './EventFeed.scss';

const EventFeed: React.FC<any> = ({list}: {list: any}) => {
  if (!list) {
    return null;
  }

  return (
    <section className="personas event-feed">
      <div className='personas__intro'>
        <h2 className="search__heading">Community events happening this week...</h2>
        {list.map((item:any) => {
          return (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>{item.start_date}</p>
              <p>{item.start_time}</p>
              <p>{item.intro}</p>
              <ul>
                {item.category_taxonomies.map((thing:any) => (
                  <li> {thing.name}</li>
                ))}
                <li>{item.is_free ? 'Free' : ' COSTS'}</li>
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  );
}

export default observer(EventFeed);

