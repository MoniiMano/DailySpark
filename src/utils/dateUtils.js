import { format, isToday, isSameMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export const formatDate = (date, formatString = 'yyyy-MM-dd') => {
  return format(date, formatString);
};

export const isCurrentDay = (date) => {
  return isToday(date);
};

export const isSameMonthAs = (date, compareDate) => {
  return isSameMonth(date, compareDate);
};

export const getWeekDays = (date) => {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return eachDayOfInterval({ start, end });
};

export const getDateKey = (date) => {
  return format(date, 'yyyy-MM-dd');
};

export const parseStoredDate = (dateString) => {
  try {
    return new Date(dateString);
  } catch {
    return new Date();
  }
};