import { useState, useEffect, useRef } from 'react';
import { CalendarController } from '../controllers/CalendarController.js';

export const useCalendar = () => {
  const controllerRef = useRef(null);
  const [, forceUpdate] = useState({});

  // Initialize controller
  if (!controllerRef.current) {
    controllerRef.current = new CalendarController();
  }

  const controller = controllerRef.current;

  // Force re-render when model updates
  useEffect(() => {
    const observer = {
      update: () => forceUpdate({})
    };

    controller.subscribe(observer);
    return () => controller.unsubscribe(observer);
  }, [controller]);

  return {
    // Navigation
    navigateToNextMonth: () => controller.navigateToNextMonth(),
    navigateToPreviousMonth: () => controller.navigateToPreviousMonth(),
    navigateToToday: () => controller.navigateToToday(),
    selectDate: (date) => controller.selectDate(date),

    // Data
    currentMonth: controller.getCurrentMonth(),
    currentDate: controller.getCurrentDate(),
    monthDays: controller.getMonthDays(),
    selectedDate: controller.getSelectedDate(),
    getDailyQuote: (date) => controller.getDailyQuote(date),
    isSelectedDate: (date) => controller.isSelectedDate(date),
    isTodayDate: (date) => controller.isTodayDate(date),

    // Achievements
    addAchievement: (date, achievement) => controller.addAchievement(date, achievement),
    getAchievements: (date) => controller.getAchievements(date),
    removeAchievement: (date, id) => controller.removeAchievement(date, id),

    // Notes
    addNote: (date, noteText) => controller.addNote(date, noteText),
    getNotes: (date) => controller.getNotes(date),
    updateNote: (date, noteId, newText) => controller.updateNote(date, noteId, newText),
    removeNote: (date, noteId) => controller.removeNote(date, noteId),

    // Goals
    addGoal: (goal) => controller.addGoal(goal),
    goals: controller.getGoals(),
    toggleGoal: (id) => controller.toggleGoal(id),
    removeGoal: (id) => controller.removeGoal(id),

    // Statistics
    monthlyStats: controller.getMonthlyStats()
  };
};