// accepted hours
export type MccTimerPickerHour =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

// accepted minutes
export type MccTimerPickerMinute =
  | '00'
  | '05'
  | '10'
  | '15'
  | '20'
  | '25'
  | '30'
  | '35'
  | '40'
  | '45'
  | '50'
  | '55';

/** 
 * format 12 return hours with 'am' or 'pm'. Examples: 
 * 12:00 am
 * 3:00 pm
 * 5:35 pm
 * 
 * format 24 return hours in 24h period. Examples:
 * 12:00
 * 15:00
 * 17:35
 */
export type MccTimerPickerFormat = '12' | '24';

// period typs
export type MccTimerPickerPeriod = 'am' | 'pm';

// timer picker type
export type MccTimerPickerTimeType = 'hour' | 'min';

/**
 * contants to create timer with HOURS or MINUTES
 */
export const HOURS: string[] = ['12', '11', '1', '10', '2', '9', '3', '8', '4', '7', '5', '6'];
export const MINUTES: string[] = [
  '00',
  '55',
  '05',
  '50',
  '10',
  '45',
  '15',
  '40',
  '20',
  '35',
  '25',
  '30',
];
