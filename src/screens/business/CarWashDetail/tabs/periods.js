import moment from 'moment';

const todayStartPeriod = new Date().setHours(0, 0, 0, 0);
const todayEndPeriod = new Date().setHours(23, 59, 59, 0);

const startOfWeek = +moment().startOf("isoWeek");
const startOfMonth = +moment().startOf("month");
const startOfYear = +moment().startOf("year");



export default {
  today: { label: "Текущий день", from: todayStartPeriod, to: todayEndPeriod },
  thisWeek: { label: "Текущая неделя", from: startOfWeek, to: todayEndPeriod },
  thisMonth: { label: "Текущий месяц", from: startOfMonth, to: todayEndPeriod },
  thisYear: { label: "Текущий год", from: startOfYear, to: todayEndPeriod },
  wholePeriod: { label: "Весь период", from: 0, to: 1745411340867 }
};
