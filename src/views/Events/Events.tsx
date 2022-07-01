import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import moment, { Moment } from 'moment';
import { History } from 'history';

import Breadcrumb from '../../components/Breadcrumb';
import EventSummary from '../../components/EventSummary/EventSummary';
import EventStore from '../../stores/eventStore';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Checkbox from '../../components/Checkbox';
import Loading from '../../components/Loading';

import 'react-datepicker/dist/react-datepicker.css';
import './Events.scss';

interface IProps {
  eventStore: EventStore;
  history: History;
  location: Location;
}

const Events: React.FC<IProps> = ({ eventStore, history, location }) => {
  const [activeCarouselItem, setActiveCarouselItem] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [typingTimeoutId, setTypingTimeoutId] = useState(undefined);
  const [inputStartDate, inputSetStartDate] = useState(new Date());
  const [inputEndDate, inputSetEndDate] = useState(new Date());
  const [activeTimeRange, setActiveTimeRange] = useState<string>('');

  const {
    totalItems,
    eventList,
    numberOfPages,
    fetchEvents,
    getEventCategories,
    getSearchTerms,
    setStartDate,
    setEndDate,
    setParams,
    getQueryParamsString,
    eventCategoryOptions,
    setCategory,
    category,
    setPostcode,
    postcode,
    distance,
    setDistance,
    toggleIsFree,
    toggleIsVirtual,
    toggleHasWheelchair,
    toggleHasInduction,
    eventListNone,
    loading,
  } = eventStore;

  // fetch all events on mount
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // watch for changes to the query string, triggered by searchFn when input
  // values change
  useEffect(() => {
    getEventCategories();
    getSearchTerms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  if (!eventStore || !eventList) {
    return null;
  }

  const getPages = Array.from(Array(numberOfPages), (_, i) => i + 1);

  const toggleFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }

    setShowFilters(!showFilters);
  };

  const setRanges = (today: Moment, rangeType: string) => {
    switch (rangeType) {
      case 'next-week': {
        return {
          start: moment(today).isoWeekday(8),
          end: moment(today).isoWeekday(14),
        };
      }
      case 'next-month': {
        const start = moment(today)
          .add(1, 'months')
          .startOf('month');
        return {
          start,
          end: moment(start)
            .add(1, 'months')
            .subtract(1, 'days'),
        };
      }
      default:
      case 'this-week': {
        return {
          start: moment(today).isoWeekday(1),
          end: moment(today).isoWeekday(7),
        };
      }
    }
  };

  const setDateRange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const getFilterRange = (event.target as HTMLInputElement).getAttribute('data-range');
    const today = moment();
    const { start, end } = setRanges(today, getFilterRange as string);
    inputSetStartDate(start.toDate());
    setStartDate(start.format('YYYY-MM-DD'));
    inputSetEndDate(end.toDate());
    setEndDate(end.format('YYYY-MM-DD'));

    setActiveTimeRange(getFilterRange as string);
  };

  const searchFn = () => {
    if (eventStore) {
      setParams();
      history.push({
        search: getQueryParamsString(),
      });
    }
  };

  return (
    <section className="events__results">
      <Helmet>
        <meta property="og:type" content="website" />
      </Helmet>

      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          { text: 'Events', url: '/' },
        ]}
      />
      <div className="flex-container">
        <h1 className="results__heading">Events In Hounslow</h1>
        <p className="p p--heading">
          The borough has a wide range of community events, many of which are free. Search below to
          explore all
        </p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {eventListNone && (
            <div className="events__list events__list--none">
              <div className="flex-container flex-container--justify-top">
                <div className="panel-box__yellow--large flex-col--6 flex-col--tablet--12">
                  <h2 className="events__filter__heading">
                    Sorry, there are currently no events listed on the platform.
                  </h2>
                  <p className="p--large">
                    Please check back at a later date to see future events or explore the{' '}
                    <a href="https://inhounslow.com/">InHounslow</a> website.
                  </p>
                  <p className="p--large">
                    Visit our{' '}
                    <a href="https://sutton.cloud.servelec-synergy.com/synergy/informationdirectory/">
                      Family Services Directory
                    </a>{' '}
                    for activities for children between 0-19 years.
                  </p>
                </div>
                <div className="panel-box__turquoise--large flex-col--5 flex-col--tablet--12">
                  <h2 className="events__filter__heading">Got an event to list?</h2>
                  <p className="p--large">
                    If you'd like to list your event on Hounslow Connect, get in touch with us via
                    email
                  </p>
                </div>
              </div>
            </div>
          )}
          {!eventListNone && (
            <>
              <div className="flex-container">
                <div className="events__filter">
                  <h2 className="events__filter__heading">Search for local events</h2>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      searchFn();
                    }}
                  >
                    <div className="flex-container flex-container--no-padding">
                      <div className="flex-col flex-col--5 flex-col--tablet--12">
                        <Select
                          value={category || ''}
                          options={eventCategoryOptions}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setCategory(e.target.value);
                            searchFn();
                          }}
                          showDefaultValue={false}
                          placeholder="Show all events"
                          id="event-category"
                        />
                        <div
                          style={{ alignItems: 'center' }}
                          className="flex-container flex-container--no-padding"
                        >
                          <div className="flex-col flex-col--5 flex-col--mobile--12">
                            <Input
                              id="location"
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const target = e.target || null;

                                if (eventStore) {
                                  setPostcode(target.value);
                                }

                                if (typingTimeoutId) {
                                  clearTimeout(typingTimeoutId);
                                }
                                const timeOut = setTimeout(() => searchFn(), 500);
                                setTypingTimeoutId(timeOut as any);
                              }}
                              placeholder="Postcode"
                              value={postcode}
                            />
                          </div>
                          <div className="flex-col flex-col--6 flex-col--mobile--12">
                            <Select
                              disabled={!postcode}
                              options={[
                                { value: '1', text: '1 Mile' },
                                { value: '3', text: '3 Miles' },
                                { value: '5', text: '5 Miles' },
                                { value: '10', text: '10 Miles' },
                                { value: '20', text: '20 Miles' },
                              ]}
                              value={`${distance || '3'}`}
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setDistance(e.target.value);
                                searchFn();
                              }}
                              className=""
                              placeholder="Mile radius"
                              id="proximityFilter"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex-col flex-col--5 flex-col--tablet--12">
                        <div className="flex--center--space-around date-range-wrapper">
                          <button
                            data-range="this-week"
                            onClick={setDateRange}
                            className={"button button__alt button__alt--small " + (activeTimeRange === 'this-week' ? 'active' : '')}
                          >
                            this week
                          </button>
                          <div className='tablet-hide'>{' /'}</div>
                          <button
                            data-range="next-week"
                            onClick={setDateRange}
                            className={"button button__alt button__alt--small " + (activeTimeRange === 'next-week' ? 'active' : '')}
                          >
                            next week
                          </button>
                          <div className='tablet-hide'>{' /'}</div>
                          <button
                            data-range="next-month"
                            onClick={setDateRange}
                            className={"button button__alt button__alt--small " + (activeTimeRange === 'next-month' ? 'active' : '')}
                          >
                            next month
                          </button>
                        </div>
                        <div className="flex--center--space-around">
                          <div className="date-picker-outer-wrapper">
                            <label>From</label>
                            <DatePicker
                              selected={inputStartDate}
                              onChange={(date: Date) => {
                                inputSetStartDate(date);
                                setActiveTimeRange('');
                              }}
                              onSelect={(date: Date) => {
                                setStartDate(moment(date).format('YYYY-MM-DD'));
                                searchFn();
                              }}
                              dateFormat='dd/MM/yyyy'
                            />
                          </div>
                          <div className="date-picker-outer-wrapper">
                            <label>To</label>
                            <DatePicker
                              selected={inputEndDate}
                              onChange={(date: Date) => {
                                inputSetEndDate(date);
                                setActiveTimeRange('');
                              }}
                              onSelect={(date: Date) => {
                                setEndDate(moment(date).format('YYYY-MM-DD'));
                                searchFn();
                              }}
                              dateFormat='dd/MM/yyyy'
                            />
                          </div>
                        </div>
                      </div>
                      <div className="date-range-icon-wrapper ">
                        <FontAwesomeIcon icon="calendar-days" size="3x" />
                      </div>
                    </div>

                    <div className="events__filters--secondary panel-box__white">
                      <div className="inner-flex">
                        <div className="events__filters--secondary-text">
                          <h3>Filter your results</h3>
                          <p>
                            You can get more personalised results by providing some extra
                            information
                          </p>
                        </div>
                        <button
                          onClick={toggleFilters}
                          className="button button--small"
                        >
                          {showFilters ? 'Hide' : 'Show'} filters
                        </button>
                      </div>
                      {showFilters && (
                        <div className="inner-flex checkbox-wrapper">
                          <div>
                            <Checkbox
                              id="is_free"
                              label="Free events only "
                              checked={get(eventStore, 'is_free', false)}
                              onChange={() => {
                                toggleIsFree();
                                searchFn();
                              }}
                              aria="Filter vitual event"
                            />
                            <Checkbox
                              id="is_virtual"
                              label="Virtual events only"
                              checked={get(eventStore, 'is_virtual', false)}
                              onChange={() => {
                                toggleIsVirtual();
                                searchFn();
                              }}
                              aria="Filter free services"
                            />
                          </div>
                          <div>
                            <Checkbox
                              id="has_wheelchair_access"
                              label="Wheelchair accessible"
                              checked={get(eventStore, 'has_wheelchair_access', false)}
                              onChange={() => {
                                toggleHasWheelchair();
                                searchFn();
                              }}
                              aria="Filter wheelchair accessibility"
                            />
                            <Checkbox
                              id="has_induction_loop"
                              label="Induction loop available "
                              checked={get(eventStore, 'has_induction_loop', false)}
                              onChange={() => {
                                toggleHasInduction();
                                searchFn();
                              }}
                              aria="Filter induction loop"
                            />
                          </div>
                          <div />
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <div className="results__info">
                <div className="flex-container">
                  <div className="results__info__wrapper">
                    <div className="results__count">
                      <p>Your search: {totalItems} results found</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="events__list">
                <div className="results__container">
                  {eventList.map(event => (
                    <EventSummary key={event.id} event={event} />
                  ))}
                </div>
              </div>

              {numberOfPages && numberOfPages > 1 && (
                <div className="flex-container">
                  <div className="pagination">
                    <button
                      className="arrow arrow--left"
                      disabled={activeCarouselItem <= 1 ? true : false}
                      onClick={() => {
                        setActiveCarouselItem(activeCarouselItem - 1);
                        fetchEvents(activeCarouselItem - 1);
                      }}
                    >
                      <FontAwesomeIcon icon="chevron-left" />
                      <span>Previous page</span>
                    </button>
                    <div className="pagination__pages">
                      {getPages.map(page => (
                        <div key={page} onClick={() => fetchEvents(page)}>
                          {page}
                        </div>
                      ))}
                    </div>
                    <button
                      className="arrow arrow--right"
                      disabled={activeCarouselItem >= numberOfPages ? true : false}
                      onClick={() => {
                        setActiveCarouselItem(activeCarouselItem + 1);
                        fetchEvents(activeCarouselItem + 1);
                      }}
                    >
                      <FontAwesomeIcon icon="chevron-right" />
                      <span>Next page</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default inject('eventStore')(observer(Events));
