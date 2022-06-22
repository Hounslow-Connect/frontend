import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';

import Breadcrumb from '../../components/Breadcrumb';
import EventSummary from '../../components/EventSummary/EventSummary';
import EventStore from '../../stores/eventStore';

import './Events.scss';

interface IProps {
  eventStore: EventStore;
}

const Events: React.FunctionComponent<IProps> = ({ eventStore }) => {
  useEffect(() => {
    eventStore.fetchAllEvents();
  }, [eventStore])

  if (!eventStore || !eventStore.eventList) {
    return null;
  }
 
  return (
    <section className='results'>
      <Helmet>
        <meta property="og:type" content="website" />
      </Helmet>

      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          { text: 'Events', url: '/' },
        ]}
      />
       <div className='flex-container'>
        <h1 className='results__heading'>Events In Hounslow</h1>
        <h4 className='results__heading'>The borough has a wide range of community events, many of which are free. Search below to explore all</h4>
      </div>
      <div className="results__info">
        <div className="flex-container">
        <div className="results__info__wrapper">
        <div className="results__count">
          <p>Your search: 9 results found</p>
        </div>
      <div className="results__view-filter">
        <p className="view-filter--header"> View as:</p>
        <button className="button button--medium" type="button">Grid<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="table-cells-large" className="svg-inline--fa fa-table-cells-large button__icon button__icon--medium" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM448 96H288V224H448V96zM448 288H288V416H448V288zM224 224V96H64V224H224zM64 416H224V288H64V416z"></path></svg></button><button className="button button--medium button--light" type="button">Map<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" className="svg-inline--fa fa-location-dot button__icon button__icon--medium" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"></path></svg></button></div></div></div></div>
     
      <div className="results__list">
        <div className="results__container">
          {eventStore.eventList.map(event => <EventSummary key={event.id} event={event} />)}
        </div>
      </div>
    </section>
  );
}

export default inject('eventStore')(observer(Events));