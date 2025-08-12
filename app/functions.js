import moment from "moment";

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidIndianMobile(number) {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(number);
}


export function timeToDateTime(timeString) {
  if (!timeString) {
      return '';
  }
  const dateObj = moment(timeString).tz('Asia/Kolkata');
  const dateFormatted = dateObj.format('D MMM YYYY');
  const timeFormatted = dateObj.format('hh:mm A');
  return { date: dateFormatted, time: timeFormatted };
}