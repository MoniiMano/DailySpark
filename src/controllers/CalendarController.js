import { CalendarModel } from '../models/CalendarModel.js';

export class CalendarController {
  constructor() {
    this.model = new CalendarModel();
    this.observers = [];
  }

  // Observer pattern for state management
  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify() {
    this.observers.forEach(observer => observer.update());
  }

  // Calendar navigation
  navigateToNextMonth() {
    this.model.navigateMonth(1);
    this.notify();
  }

  navigateToPreviousMonth() {
    this.model.navigateMonth(-1);
    this.notify();
  }

  navigateToToday() {
    this.model.currentDate = new Date();
    this.model.selectedDate = new Date();
    this.notify();
  }

  selectDate(date) {
    this.model.selectDate(date);
    this.notify();
  }

  // Data getters
  getCurrentMonth() {
    return this.model.getCurrentMonth();
  }

  getCurrentDate() {
    return this.model.currentDate;
  }

  getMonthDays() {
    return this.model.getMonthDays();
  }

  getSelectedDate() {
    return this.model.selectedDate;
  }

  getDailyQuote(date) {
    return this.model.getDailyQuote(date);
  }

  isSelectedDate(date) {
    return this.model.isSelectedDate(date);
  }

  isTodayDate(date) {
    return this.model.isTodayDate(date);
  }

  // Achievement management
  addAchievement(date, achievement) {
    if (achievement.trim()) {
      this.model.addAchievement(date, achievement.trim());
      this.notify();
    }
  }

  getAchievements(date) {
    return this.model.getAchievements(date);
  }

  removeAchievement(date, achievementId) {
    this.model.removeAchievement(date, achievementId);
    this.notify();
  }

  // Notes management
  addNote(date, noteText) {
    if (noteText.trim()) {
      this.model.addNote(date, noteText.trim());
      this.notify();
    }
  }

  getNotes(date) {
    return this.model.getNotes(date);
  }

  updateNote(date, noteId, newText) {
    if (newText.trim()) {
      this.model.updateNote(date, noteId, newText.trim());
      this.notify();
    }
  }

  removeNote(date, noteId) {
    this.model.removeNote(date, noteId);
    this.notify();
  }

  // Goal management
  addGoal(goal) {
    if (goal.trim()) {
      this.model.addGoal(goal.trim());
      this.notify();
    }
  }

  getGoals() {
    return this.model.goals;
  }

  toggleGoal(goalId) {
    this.model.toggleGoal(goalId);
    this.notify();
  }

  removeGoal(goalId) {
    this.model.removeGoal(goalId);
    this.notify();
  }

  // Statistics
  getMonthlyStats() {
    const days = this.getMonthDays();
    const totalDays = days.length;
    const daysWithContent = days.filter(day => {
      const achievements = this.getAchievements(day);
      const notes = this.getNotes(day);
      return achievements.length > 0 || notes.length > 0;
    }).length;
    
    const completedGoals = this.getGoals().filter(goal => goal.completed).length;
    const totalGoals = this.getGoals().length;

    return {
      totalDays,
      daysWithContent,
      contentRate: totalDays > 0 ? Math.round((daysWithContent / totalDays) * 100) : 0,
      completedGoals,
      totalGoals,
      goalCompletionRate: totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0
    };
  }
}