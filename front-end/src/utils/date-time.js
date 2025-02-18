const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

/**
 * Formats a Date object as YYYY-MM-DD.
 *
 * This function is *not* exported because the UI should generally avoid working directly with Date instance.
 * You may export this function if you need it.
 *
 * @param date
 *  an instance of a date object
 * @returns {string}
 *  the specified Date formatted as YYYY-MM-DD
 */
function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

/**
 * Format a date string in ISO-8601 format (which is what is returned from PostgreSQL) as YYYY-MM-DD.
 * @param dateString
 *  ISO-8601 date string
 * @returns {*}
 *  the specified date string formatted as YYYY-MM-DD
 */
export function formatAsDate(dateString) {
  return dateString.match(dateFormat)[0];
}

/**
 * Format a time string in HH:MM:SS format (which is what is returned from PostgreSQL) as HH:MM.
 * @param timeString
 *  HH:MM:SS time string
 * @returns {*}
 *  the specified time string formatted as YHH:MM.
 */
export function formatAsTime(timeString) {
  return timeString.match(timeFormat)[0];
}

/**
 * Today's date as YYYY-MM-DD.
 * @returns {*}
 *  the today's date formatted as YYYY-MM-DD
 */
export function today() {
  return asDateString(new Date());
}

/**
 * Subtracts one day to the specified date and return it in as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day prior to currentDate, formatted as YYYY-MM-DD
 */
export function previous(currentDate) {
  let [ year, month, day ] = currentDate.split("-");
  month -= 1;
  const date = new Date(year, month, day);
  date.setMonth(date.getMonth());
  date.setDate(date.getDate() - 1);
  return asDateString(date);
}

/**
 * Adds one day to the specified date and return it in as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day after currentDate, formatted as YYYY-MM-DD
 */
export function next(currentDate) {
  let [ year, month, day ] = currentDate.split("-");
  month -= 1;
  const date = new Date(year, month, day);
  date.setMonth(date.getMonth());
  date.setDate(date.getDate() + 1);
  return asDateString(date);
}

/**
 * Format a time string in standard am/pm time instead of 24 hour time.
 * @param time
 *  HH:MM time string
 * @returns {*}
 *  the specified time string formatted as HH:MM am/pm.
 */
export function formatAsStandardTime(time) {
  const hour = time.split(":")[0];
  const mins = time.split(":")[1];

  const AmOrPm = hour >=12 ? "pm" : "am";

  if (Number(hour) > 12) {
    const standardHour = hour % 12;
    return (
      `${standardHour}:${mins}${AmOrPm}`
    )
  }
  return (
    `${hour}:${mins}${AmOrPm}`
  )
}

/**
 * Reformats date given as YYYY-MM-DD to dayOfWeek MM-DD-YYYY.
 * @param date
 *  a date string in YYYY-MM-DD format.
 * @returns {*}
 *  the date formatted as dayOfWeek MM-DD-YYYY.
 */
export function formatDateWithDay(date) {
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2];
  const newDate = new Date(`${date}T00:00:00`);
  const dayOfWeek = newDate.getDay();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    `${days[dayOfWeek]} ${month}/${day}/${year}`
  )
}

/**
 * Reformats date given as YYYY-MM-DD to MM-DD-YYYY.
 * @param date
 *  a date string in YYYY-MM-DD format.
 * @returns {*}
 *  the date formatted as MM-DD-YYYY.
 */
export function reformatDate(date) {
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2];

  return (
    `${month}/${day}/${year}`
  )
}