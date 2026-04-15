import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

export class CalendarModel {
  constructor() {
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.motivationalQuotes = this.getMotivationalQuotes();
    this.achievements = this.loadAchievements();
    this.goals = this.loadGoals();
    this.notes = this.loadNotes();
  }

  // Date operations
  getCurrentMonth() {
    return format(this.currentDate, 'MMMM yyyy');
  }

  getMonthDays() {
    const start = startOfMonth(this.currentDate);
    const end = endOfMonth(this.currentDate);
    return eachDayOfInterval({ start, end });
  }

  navigateMonth(direction) {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    this.currentDate = newDate;
  }

  selectDate(date) {
    this.selectedDate = date;
  }

  isSelectedDate(date) {
    return isSameDay(date, this.selectedDate);
  }

  isTodayDate(date) {
    return isToday(date);
  }

  // Motivational content
  getDailyQuote(date = new Date()) {
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    return this.motivationalQuotes[dayOfYear % this.motivationalQuotes.length];
  }

  getMotivationalQuotes() {
    return [
      "Every day is a new beginning. Take a deep breath and start again.",
      "You are stronger than you think and more capable than you imagine.",
      "Progress, not perfection. Every small step counts.",
      "Today's accomplishments were yesterday's impossibilities.",
      "Believe in yourself and all that you are.",
      "The only way to do great work is to love what you do.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "Your limitation—it's only your imagination.",
      "Push yourself, because no one else is going to do it for you.",
      "Great things never come from comfort zones.",
      "Dream bigger. Do bigger. Be bigger.",
      "Every moment is a fresh beginning.",
      "You are never too old to set another goal or to dream a new dream.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "It is during our darkest moments that we must focus to see the light."
    ];
  }

  // Achievement system
  addAchievement(date, achievement) {
    const dateKey = format(date, 'yyyy-MM-dd');
    if (!this.achievements[dateKey]) {
      this.achievements[dateKey] = [];
    }
    this.achievements[dateKey].push({
      id: Date.now(),
      text: achievement,
      timestamp: new Date()
    });
    this.saveAchievements();
  }

  getAchievements(date) {
    const dateKey = format(date, 'yyyy-MM-dd');
    return this.achievements[dateKey] || [];
  }

  removeAchievement(date, achievementId) {
    const dateKey = format(date, 'yyyy-MM-dd');
    if (this.achievements[dateKey]) {
      this.achievements[dateKey] = this.achievements[dateKey].filter(
        achievement => achievement.id !== achievementId
      );
      this.saveAchievements();
    }
  }

  // Notes system
  addNote(date, noteText) {
    const dateKey = format(date, 'yyyy-MM-dd');
    if (!this.notes[dateKey]) {
      this.notes[dateKey] = [];
    }
    this.notes[dateKey].push({
      id: Date.now(),
      text: noteText,
      timestamp: new Date()
    });
    this.saveNotes();
  }

  getNotes(date) {
    const dateKey = format(date, 'yyyy-MM-dd');
    return this.notes[dateKey] || [];
  }

  updateNote(date, noteId, newText) {
    const dateKey = format(date, 'yyyy-MM-dd');
    if (this.notes[dateKey]) {
      const note = this.notes[dateKey].find(n => n.id === noteId);
      if (note) {
        note.text = newText;
        note.updatedAt = new Date();
        this.saveNotes();
      }
    }
  }

  removeNote(date, noteId) {
    const dateKey = format(date, 'yyyy-MM-dd');
    if (this.notes[dateKey]) {
      this.notes[dateKey] = this.notes[dateKey].filter(note => note.id !== noteId);
      this.saveNotes();
    }
  }

  // Goal system
  addGoal(goal) {
    this.goals.push({
      id: Date.now(),
      text: goal,
      completed: false,
      createdAt: new Date()
    });
    this.saveGoals();
  }

  toggleGoal(goalId) {
    const goal = this.goals.find(g => g.id === goalId);
    if (goal) {
      goal.completed = !goal.completed;
      this.saveGoals();
    }
  }

  removeGoal(goalId) {
    this.goals = this.goals.filter(goal => goal.id !== goalId);
    this.saveGoals();
  }

  // Persistence
  loadAchievements() {
    try {
      return JSON.parse(localStorage.getItem('motivatedCalendar_achievements') || '{}');
    } catch {
      return {};
    }
  }

  saveAchievements() {
    localStorage.setItem('motivatedCalendar_achievements', JSON.stringify(this.achievements));
  }

  loadNotes() {
    try {
      return JSON.parse(localStorage.getItem('motivatedCalendar_notes') || '{}');
    } catch {
      return {};
    }
  }

  saveNotes() {
    localStorage.setItem('motivatedCalendar_notes', JSON.stringify(this.notes));
  }

  loadGoals() {
    try {
      return JSON.parse(localStorage.getItem('motivatedCalendar_goals') || '[]');
    } catch {
      return [];
    }
  }

  saveGoals() {
    localStorage.setItem('motivatedCalendar_goals', JSON.stringify(this.goals));
  }
}