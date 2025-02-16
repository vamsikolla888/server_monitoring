import moment from 'moment';
import 'moment-timezone';

export const formatDate = (date) => {
  const browserTimezone = moment.tz.guess();
  return moment(date).tz(browserTimezone).format('MM-DD-YYYY');
};
