import moment from 'moment';
import { IOpeningHour, IHolidayTimes } from '../../types/types';

const weekday = (day: number) => moment(day, 'E').format('dddd');

const formatTime = (time: string) => {
  return moment(time, moment.HTML5_FMT.TIME_SECONDS).format('h:mma');
};

const timePeriod = (openingHour: { opens_at: string; closes_at: string }) => {
  return `<strong>${formatTime(openingHour.opens_at)}</strong> - <strong>${formatTime(
    openingHour.closes_at
  )}</strong>`;
};

const dayOfMonth = (day: number) => {
  return moment(day, 'D').format('Do');
};

const weekdayFromDate = (day: string) => moment(day, moment.HTML5_FMT.DATE).format('dddd');

const fortnightWeek = (date: string) => {
  const daysInFortnight = 14;
  const thisSunday = moment().day(7);
  const diffInDays = moment(date, moment.HTML5_FMT.DATE).diff(thisSunday, 'days');
  const remainingDays = Math.abs(diffInDays % daysInFortnight);

  return remainingDays > 6 ? 'next week' : 'this week';
};

const nthOfMonth = (occurence: number) => {
  if (occurence === 1) {
    return 'First';
  } else if (occurence === 2) {
    return 'Second';
  } else if (occurence === 3) {
    return 'Third';
  } else if (occurence === 4) {
    return 'Fourth';
  } else if (occurence === 5) {
    return 'Last';
  }
};

export const humanReadableRegularOpeningHour = (openingHour: IOpeningHour): string => {
  switch (openingHour.frequency) {
    case 'weekly':
      return `${weekday(openingHour.weekday)} ${timePeriod(openingHour)}`;
    case 'monthly':
      return `${dayOfMonth(openingHour.day_of_month)} of each month. ${timePeriod(
        openingHour
      )} - ${timePeriod(openingHour)}`;
    case 'fortnightly':
      return `Fortnightly on ${weekdayFromDate(openingHour.starts_at)}s. ${fortnightWeek(
        openingHour.starts_at
      )} - ${timePeriod(openingHour)}`;
    case 'nth_occurrence_of_month':
      return `${nthOfMonth(openingHour.occurrence_of_month)} ${weekday(
        openingHour.weekday
      )} of each month - ${timePeriod(openingHour)}`;
    default:
      return '';
  }
};

export const formatHolidayTimes = (times: IHolidayTimes[]) =>
  times.map((time: any) => {
    if (time.is_closed) {
      return `${moment(time.starts_at).format('Do MMMM')} - ${moment(time.ends_at).format(
        'Do MMMM'
      )} <strong>Closed</strong>`;
    } else {
      return `${moment(time.starts_at).format('Do MMMM')} - ${moment(time.ends_at).format(
        'Do MMMM'
      )} <strong>${moment(time.opens_at, moment.HTML5_FMT.TIME_SECONDS).format('h:mma')} - ${moment(
        time.closes_at,
        moment.HTML5_FMT.TIME_SECONDS
      ).format('h:mma')}</strong>`;
    }
  });
