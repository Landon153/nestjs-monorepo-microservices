import * as moment from 'moment';

export const formatUTC = (date: Date | string) =>
  moment(date).format('DD-MM-YYYY hh:mm:ss');
