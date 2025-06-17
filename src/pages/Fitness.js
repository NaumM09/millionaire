// pages/Fitness.js
import React, { useState, useEffect } from 'react';
import { auth } from './../config';
import { 
  getFitnessJournalEntries, 
  addFitnessJournalEntry, 
  likeFitnessJournalEntry,
  getFitnessGoals,
  addFitnessGoal,
  // Removed unused import: updateFitnessGoal
  getWorkoutCompletion,
  saveWorkoutCompletion,
  getProgressData,
  saveProgressData,
  isCurrentUserAdmin
} from './../fitnessutils';
import './Fitness.css';

// SVG icon components remain the same...
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const DumbbellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6.5 6.5 11 11" />
    <path d="m21 21-1-1" />
    <path d="m3 3 1 1" />
    <path d="m18 22 4-4" />
    <path d="m2 6 4-4" />
    <path d="m3 10 7-7" />
    <path d="m14 21 7-7" />
  </svg>
);

const RunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="17" cy="5" r="3" />
    <path d="M10 17.5 7 22h10l-3-4.5" />
    <path d="M7 16h.01" />
    <path d="m13 8-3 4.5L7 16 5 14l2-3.5 3.5-3.5 3.5-1 2 3Z" />
    <path d="m16 11 2 2.5-2 2.5" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const ThumbsUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 10v12" />
    <path d="M15 5.88 18 10" />
    <path d="M7 10h3m0 0V5.88a3.88 3.88 0 0 1 7.31-1.75" />
    <path d="M10 10h9.1a1 1 0 0 1 .9 1.45l-5.34 9.63a1 1 0 0 1-.89.57h-1.2c-.56 0-1.06-.35-1.24-.88l-1.1-3.12A1 1 0 0 0 9.27 17H7" />
  </svg>
);

const CommentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Fitness = () => {
  // State for user authentication
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for fitness goals (from Firebase)
  const [goals, setGoals] = useState([]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'strength',
    target: '',
    current: '',
    progress: 0
  });
  
  // State for progress data (from Firebase)
  const [progressData, setProgressData] = useState({
    weight: [84, 83, 82, 81.5, 81, 80.5, 80], // in kg
    bodyFat: [18, 17.5, 17, 16.8, 16.5, 16, 15.8], // percentage
    workoutsPerWeek: [3, 4, 3, 5, 4, 5, 5]
  });
  
  // State for journal entries (from Firebase)
  const [journalEntries, setJournalEntries] = useState([]);
  const [journalLoading, setJournalLoading] = useState(true);
  
  // State for new journal entry
  const [newEntry, setNewEntry] = useState("");
  const [remainingChars, setRemainingChars] = useState(260);
  const [submittingEntry, setSubmittingEntry] = useState(false);
  
  // Workout routine data
  const [workoutRoutines] = useState({
    Monday: {
      name: "Pilates",
      exercises: [
        { name: "Pilates Session", sets: "1", reps: "45 min" }
      ]
    },
    Tuesday: {
      name: "Legs",
      exercises: [
        { name: "Leg Extension", sets: "3", reps: "12" },
        { name: "Seated Hamstring", sets: "3", reps: "12" },
        { name: "Leg Press", sets: "4", reps: "3" },
        { name: "Deadlifts", sets: "3", reps: "12" },
        { name: "Bulgarian Split Squats", sets: "3", reps: "12" },
        { name: "Stair Master", sets: "1", reps: "10-20 min" }
      ]
    },
    Wednesday: {
      name: "Arms & Back",
      exercises: [
        { name: "Tricep Pulls", sets: "3", reps: "12" },
        { name: "Bicep Curls", sets: "3", reps: "12" },
        { name: "Hammer Curls", sets: "3", reps: "12" },
        { name: "Barbell Curls", sets: "3", reps: "12" },
        { name: "Assisted Pull-ups", sets: "3", reps: "12" },
        { name: "Bent-over Rows", sets: "3", reps: "12" },
        { name: "Lat Machine", sets: "3", reps: "12" },
        { name: "Seated Bench Rows", sets: "3", reps: "12" }
      ]
    },
    Thursday: {
      name: "Shoulder & Chest",
      exercises: [
        { name: "Overhead Shoulder Press", sets: "3", reps: "12" },
        { name: "Upright Rows", sets: "3", reps: "12" },
        { name: "Lateral Raises", sets: "3", reps: "12" },
        { name: "Face Pulls", sets: "3", reps: "12" },
        { name: "Seated Press Machine", sets: "3", reps: "12" },
        { name: "Inclined Press", sets: "3", reps: "12" },
        { name: "Cable Flys", sets: "3", reps: "12" },
      ]
    },
    Friday: {
      name: "Glutes & Legs",
      exercises: [
        { name: "Bridges", sets: "3", reps: "10" },
        { name: "Squats", sets: "3", reps: "8-10" },
        { name: "Calf Raises", sets: "3", reps: "10" },
        { name: "Romanian Deadlifts", sets: "3", reps: "10" },
      ]
    },
    Saturday: {
      name: "Optional",
      exercises: [
        { name: "Running", sets: "1", reps: "5 km" }
      ]
    },
    Sunday: {
      name: "Rest Day",
      exercises: [
        { name: "Stretching", sets: "1", reps: "15 min" }
      ]
    }
  });

  // Get current date information
  const today = new Date();
  const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });
  const currentMonth = today.toLocaleDateString('en-US', { month: 'long' });
  const currentYear = today.getFullYear();
  
  // State for tracking completed workouts (from Firebase)
  const [completedWorkouts, setCompletedWorkouts] = useState(() => {
    // Initialize empty tracking for current month
    const initialData = {};
    initialData[`${currentMonth}-${currentYear}`] = {
      days: {},
      totalDays: 0,
      completedDays: 0
    };
    
    return initialData;
  });

  // State to select the day to view/check workouts
  const [selectedDay, setSelectedDay] = useState(currentDay);
  
  // Load all fitness data from Firebase
  const loadFitnessData = async () => {
    setLoading(true);
    
    try {
      // Load journal entries
      await loadJournalEntries();
      
      // Load goals
      await loadFitnessGoals();
      
      // Load workout tracking data
      await loadWorkoutTracking();
      
      // Load progress data
      await loadProgressData();
    } catch (error) {
      console.error('Error loading fitness data:', error);
      setError('Error loading fitness data');
    } finally {
      setLoading(false);
    }
  };
  
  // Check authentication state and load initial data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Check if user is admin
          const adminStatus = await isCurrentUserAdmin();
          setIsAdmin(adminStatus);
          
          // Load initial data
          await loadFitnessData();
        } catch (err) {
          console.error('Error loading fitness data:', err);
          setError('Failed to load some fitness data. Please try refreshing the page.');
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Load journal entries from Firebase
  const loadJournalEntries = async () => {
    setJournalLoading(true);
    
    try {
      const entries = await getFitnessJournalEntries();
      setJournalEntries(entries);
    } catch (error) {
      console.error('Error loading journal entries:', error);
    } finally {
      setJournalLoading(false);
    }
  };
  
  // Load fitness goals from Firebase
  const loadFitnessGoals = async () => {
    try {
      const loadedGoals = await getFitnessGoals();
      
      if (loadedGoals.length > 0) {
        setGoals(loadedGoals);
      } else if (isAdmin) {
        // Only initialize default goals for admin if none exist
        // You can add code here to create default goals in Firebase if needed
      }
    } catch (error) {
      console.error('Error loading fitness goals:', error);
    }
  };
  
  // Load workout tracking data from Firebase
  const loadWorkoutTracking = async () => {
    try {
      const workoutData = await getWorkoutCompletion();
      
      if (workoutData) {
        setCompletedWorkouts(workoutData);
      } else if (isAdmin) {
        // If no workout data exists and user is admin, initialize it
        // and save to Firebase
        const initialData = {
          [`${currentMonth}-${currentYear}`]: {
            days: {},
            totalDays: 0,
            completedDays: 0
          }
        };
        
        setCompletedWorkouts(initialData);
        await saveWorkoutCompletion(initialData);
      }
    } catch (error) {
      console.error('Error loading workout tracking data:', error);
    }
  };
  
  // Load progress data from Firebase
  const loadProgressData = async () => {
    try {
      const data = await getProgressData();
      
      if (data) {
        setProgressData(data);
      } else if (isAdmin) {
        // If no progress data exists and user is admin, save default data to Firebase
        await saveProgressData(progressData);
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
    }
  };
  
  // Generate tracking stats for current month
  useEffect(() => {
    if (!isAdmin) return; // Only admin can update tracking data
    
    const currentMonthKey = `${currentMonth}-${currentYear}`;
    
    // Initialize current month if not exists
    if (!completedWorkouts[currentMonthKey]) {
      const updatedWorkouts = {
        ...completedWorkouts,
        [currentMonthKey]: {
          days: {},
          totalDays: 0,
          completedDays: 0
        }
      };
      
      setCompletedWorkouts(updatedWorkouts);
      
      // Save to Firebase
      saveWorkoutCompletion(updatedWorkouts).catch(error => {
        console.error('Error saving workout data:', error);
      });
    }
  }, [completedWorkouts, currentMonth, currentYear, isAdmin]);
  
  // For displaying month progress information
  const getMonthProgressInfo = () => {
    const currentMonthKey = `${currentMonth}-${currentYear}`;
    const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
    const currentDate = today.getDate();
    
    // Count workout days for the entire month
    let totalWorkoutDaysInMonth = 0;
    let remainingWorkoutDays = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, today.getMonth(), day);
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      if (weekday in workoutRoutines) {
        totalWorkoutDaysInMonth++;
        
        // Count remaining workout days (those that are in the future)
        if (day > currentDate) {
          remainingWorkoutDays++;
        }
      }
    }
    
    // Calculate completable workout days (those that have already passed)
    const completableWorkoutDays = totalWorkoutDaysInMonth - remainingWorkoutDays;
    
    return {
      totalWorkoutDaysInMonth,
      completableWorkoutDays,
      remainingWorkoutDays,
      completedDays: completedWorkouts[currentMonthKey]?.completedDays || 0
    };
  };

  // Toggle completion status of a workout
  const toggleExerciseCompletion = async (day, exerciseIndex) => {
    if (!isAdmin) {
      alert('Only the admin can update workout completion');
      return;
    }
    
    const currentMonthKey = `${currentMonth}-${currentYear}`;
    
    // Create deep copy of the state
    const updatedWorkouts = JSON.parse(JSON.stringify(completedWorkouts));
    
    // Initialize day tracking if not exists
    if (!updatedWorkouts[currentMonthKey].days[day]) {
      updatedWorkouts[currentMonthKey].days[day] = {
        completed: false,
        exercises: workoutRoutines[day].exercises.map(() => false)
      };
    }
    
    // Toggle the specific exercise
    const currentValue = updatedWorkouts[currentMonthKey].days[day].exercises[exerciseIndex];
    updatedWorkouts[currentMonthKey].days[day].exercises[exerciseIndex] = !currentValue;
    
    // Update day completion status based on all exercises
    const allExercisesCompleted = updatedWorkouts[currentMonthKey].days[day].exercises.every(status => status);
    const previouslyCompleted = updatedWorkouts[currentMonthKey].days[day].completed;
    updatedWorkouts[currentMonthKey].days[day].completed = allExercisesCompleted;
    
    // Update month completion stats
    if (allExercisesCompleted && !previouslyCompleted) {
      updatedWorkouts[currentMonthKey].completedDays += 1;
    } else if (!allExercisesCompleted && previouslyCompleted) {
      updatedWorkouts[currentMonthKey].completedDays -= 1;
    }
    
    // Ensure total days count is updated
    const totalDaysWithWorkouts = Object.keys(updatedWorkouts[currentMonthKey].days).length;
    updatedWorkouts[currentMonthKey].totalDays = totalDaysWithWorkouts;
    
    setCompletedWorkouts(updatedWorkouts);
    
    // Save to Firebase
    try {
      await saveWorkoutCompletion(updatedWorkouts);
    } catch (error) {
      console.error('Error saving workout data:', error);
      // Revert the state if save fails
      setCompletedWorkouts(completedWorkouts);
    }
  };

  // Mark all exercises for a day as complete
  const markDayComplete = async (day) => {
    if (!isAdmin) {
      alert('Only the admin can update workout completion');
      return;
    }
    
    const currentMonthKey = `${currentMonth}-${currentYear}`;
    
    // Create deep copy of the state
    const updatedWorkouts = JSON.parse(JSON.stringify(completedWorkouts));
    
    // Initialize day tracking if not exists
    if (!updatedWorkouts[currentMonthKey].days[day]) {
      updatedWorkouts[currentMonthKey].days[day] = {
        completed: true,
        exercises: workoutRoutines[day].exercises.map(() => true)
      };
      updatedWorkouts[currentMonthKey].completedDays += 1;
    } else if (!updatedWorkouts[currentMonthKey].days[day].completed) {
      // Mark all exercises as complete
      updatedWorkouts[currentMonthKey].days[day].exercises = 
        updatedWorkouts[currentMonthKey].days[day].exercises.map(() => true);
      updatedWorkouts[currentMonthKey].days[day].completed = true;
      updatedWorkouts[currentMonthKey].completedDays += 1;
    }
    
    // Ensure total days count is updated
    const totalDaysWithWorkouts = Object.keys(updatedWorkouts[currentMonthKey].days).length;
    updatedWorkouts[currentMonthKey].totalDays = totalDaysWithWorkouts;
    
    setCompletedWorkouts(updatedWorkouts);
    
    // Save to Firebase
    try {
      await saveWorkoutCompletion(updatedWorkouts);
    } catch (error) {
      console.error('Error saving workout data:', error);
      // Revert the state if save fails
      setCompletedWorkouts(completedWorkouts);
    }
  };
  
  // Handle input change for new journal entry
  const handleEntryChange = (e) => {
    const input = e.target.value;
    if (input.length <= 260) {
      setNewEntry(input);
      setRemainingChars(260 - input.length);
    }
  };
  
  // Add new journal entry
  const addJournalEntry = async () => {
    if (!currentUser) {
      alert('Please sign in to add a journal entry');
      return;
    }
    
    if (!isAdmin) {
      alert('Only the admin can add journal entries');
      return;
    }
    
    if (newEntry.trim() === "") {
      return;
    }
    
    setSubmittingEntry(true);
    
    try {
      // Save to Firebase
      const newEntryObj = await addFitnessJournalEntry(newEntry);
      
      // Update local state with the new entry
      setJournalEntries([newEntryObj, ...journalEntries]);
      
      // Clear input
      setNewEntry("");
      setRemainingChars(260);
    } catch (error) {
      console.error('Error adding journal entry:', error);
      alert('Failed to add journal entry: ' + error.message);
    } finally {
      setSubmittingEntry(false);
    }
  };
  
  // Like a journal entry
  const handleLikeEntry = async (entryId) => {
    if (!currentUser) {
      alert('Please sign in to like entries');
      return;
    }
    
    try {
      const result = await likeFitnessJournalEntry(entryId);
      
      // Update the local state
      setJournalEntries(entries =>
        entries.map(entry => 
          entry.id === entryId
            ? { ...entry, likes: result.likes, liked: result.liked }
            : entry
        )
      );
    } catch (error) {
      console.error('Error liking entry:', error);
    }
  };
  
  // Handle adding new goal
  const handleAddGoal = async () => {
    if (!isAdmin) {
      alert('Only the admin can add goals');
      return;
    }
    
    if (!newGoal.title.trim() || !newGoal.target.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      // Save goal to Firebase
      const goalResult = await addFitnessGoal(newGoal);
      
      // Update local state
      setGoals([...goals, goalResult]);
      
      // Reset form
      setNewGoal({
        title: '',
        category: 'strength',
        target: '',
        current: '',
        progress: 0
      });
      
      // Close the form
      setIsAddingGoal(false);
    } catch (error) {
      console.error('Error adding goal:', error);
      alert('Failed to add goal: ' + error.message);
    }
  };
  
  // Category icon mapping
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'strength':
        return <DumbbellIcon />;
      case 'cardio':
        return <RunIcon />;
      case 'weight':
        return <HeartIcon />;
      default:
        return <DumbbellIcon />;
    }
  };

  // Calculate monthly completion percentage
  const getMonthCompletionPercentage = () => {
    const currentMonthKey = `${currentMonth}-${currentYear}`;
    
    if (!completedWorkouts[currentMonthKey] || completedWorkouts[currentMonthKey].totalDays === 0) {
      return 0;
    }
    
    // Get the number of days in the current month that have already passed
    const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
    const currentDate = today.getDate();
    
    // Calculate expected workout days so far this month (excluding future dates)
    let expectedWorkoutDaysSoFar = 0;
    
    for (let day = 1; day <= Math.min(currentDate, daysInMonth); day++) {
      const date = new Date(currentYear, today.getMonth(), day);
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      // Count this as an expected workout day if it's in our routine
      if (weekday in workoutRoutines) {
        expectedWorkoutDaysSoFar++;
      }
    }
    
    // Return percentage of completed days relative to expected workout days so far
    return expectedWorkoutDaysSoFar === 0 ? 0 : 
      Math.round((completedWorkouts[currentMonthKey].completedDays / expectedWorkoutDaysSoFar) * 100);
  };

  // Get feedback based on completion rate
  const getMonthlyFeedback = () => {
    const percentage = getMonthCompletionPercentage();
    
    if (percentage >= 90) {
      return "Excellent work! You're crushing your fitness goals this month!";
    } else if (percentage >= 70) {
      return "Great progress! Keep up the consistent effort.";
    } else if (percentage >= 50) {
      return "You're on the right track. Push for more consistency!";
    } else if (percentage >= 30) {
      return "Getting started is the hardest part. Keep building momentum!";
    } else {
      return "Let's focus on getting those workouts in. You've got this!";
    }
  };
  
  // Check if a day has been completed
  const isDayCompleted = (day) => {
    const currentMonthKey = `${currentMonth}-${currentYear}`;
    return completedWorkouts[currentMonthKey]?.days[day]?.completed || false;
  };

  // Check if specific exercise in a day is completed
  const isExerciseCompleted = (day, exerciseIndex) => {
    const currentMonthKey = `${currentMonth}-${currentYear}`;
    return completedWorkouts[currentMonthKey]?.days[day]?.exercises?.[exerciseIndex] || false;
  };
  
  // If loading, show loading indicator
  if (loading) {
    return (
      <div className="fitness-container loading">
        <div className="loading-indicator">Loading fitness data...</div>
      </div>
    );
  }
  
  return (
    <div className="fitness-container">
      <header className="page-header">
        <h1>Fitness Journey</h1>
        <p>Track progress, set goals, and document the journey to peak physical performance</p>
      </header>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="fitness-dashboard">
        {/* Workout Routine Section */}
        <section className="workout-routine-section">
          <h2>My Workout Routine</h2>
          
          <div className="month-progress">
            <div className="month-header">
              <CalendarIcon />
              <h3>{currentMonth} Progress</h3>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${getMonthCompletionPercentage()}%` }}
              ></div>
            </div>
            
            {/* Enhanced month progress details */}
            <div className="progress-details">
              <div className="progress-percentage">{getMonthCompletionPercentage()}% complete</div>
              
              {(() => {
                const { completedDays, completableWorkoutDays, remainingWorkoutDays } = getMonthProgressInfo();
                return (
                  <div className="progress-stats">
                    <span>{completedDays} of {completableWorkoutDays} workout days completed</span>
                    <span>•</span>
                    <span>{remainingWorkoutDays} days remaining this month</span>
                  </div>
                );
              })()}
            </div>
            
            <div className="monthly-feedback">{getMonthlyFeedback()}</div>
          </div>
          
          <div className="day-selector">
            {Object.keys(workoutRoutines).map(day => (
              <button 
                key={day}
                className={`day-button ${selectedDay === day ? 'active' : ''} ${isDayCompleted(day) ? 'completed' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day.substring(0, 3)}
                {isDayCompleted(day) && <span className="check-icon"><CheckIcon /></span>}
              </button>
            ))}
          </div>
          
          <div className="workout-details">
            <div className="day-header">
              <h3>{selectedDay}: {workoutRoutines[selectedDay].name}</h3>
              {currentDay === selectedDay && (
                <div className="today-indicator">Today</div>
              )}
              {isAdmin && (
                <button 
                  className={`complete-day-btn ${isDayCompleted(selectedDay) ? 'completed' : ''}`}
                  onClick={() => markDayComplete(selectedDay)}
                >
                  {isDayCompleted(selectedDay) ? 'Completed' : 'Mark All Complete'}
                </button>
              )}
            </div>
            
            <div className="exercise-list">
              {workoutRoutines[selectedDay].exercises.map((exercise, index) => (
                <div className="exercise-item" key={index}>
                  {isAdmin ? (
                    <label className="exercise-checkbox">
                      <input 
                        type="checkbox" 
                        checked={isExerciseCompleted(selectedDay, index)}
                        onChange={() => toggleExerciseCompletion(selectedDay, index)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  ) : (
                    <div className={`exercise-status-icon ${isExerciseCompleted(selectedDay, index) ? 'completed' : ''}`}>
                      {isExerciseCompleted(selectedDay, index) && <CheckIcon />}
                    </div>
                  )}
                  <div className="exercise-details">
                    <div className="exercise-name">{exercise.name}</div>
                    <div className="exercise-prescription">{exercise.sets} sets × {exercise.reps}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Goals Section */}
        <section className="goals-section">
          <h2>Current Goals</h2>
          
          <div className="goals-grid">
            {goals.map(goal => (
              <div className="goal-card" key={goal.id}>
                <div className="goal-header">
                  <div className="goal-icon">{getCategoryIcon(goal.category)}</div>
                  <h3>{goal.title}</h3>
                </div>
                
                <div className="goal-progress">
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">{goal.progress}%</div>
                </div>
                
                <div className="goal-stats">
                  <div className="stat">
                    <span className="stat-label">Target:</span>
                    <span className="stat-value">{goal.target}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Current:</span>
                    <span className="stat-value">{goal.current}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {isAdmin && (
              isAddingGoal ? (
                <div className="add-goal-form">
                  <h3>Add New Goal</h3>
                  <input
                    type="text"
                    placeholder="Goal Title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="goal-input"
                  />
                  
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    className="goal-select"
                  >
                    <option value="strength">Strength</option>
                    <option value="cardio">Cardio</option>
                    <option value="weight">Weight</option>
                  </select>
                  
                  <div className="goal-input-row">
                    <input
                      type="text"
                      placeholder="Target value"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                      className="goal-input"
                    />
                    
                    <input
                      type="text"
                      placeholder="Current value"
                      value={newGoal.current}
                      onChange={(e) => setNewGoal({...newGoal, current: e.target.value})}
                      className="goal-input"
                    />
                  </div>
                  
                  <input
                    type="number"
                    placeholder="Progress %"
                    value={newGoal.progress}
                    onChange={(e) => setNewGoal({...newGoal, progress: parseInt(e.target.value) || 0})}
                    min="0"
                    max="100"
                    className="goal-input"
                  />
                  
                  <div className="goal-form-buttons">
                    <button 
                      className="cancel-goal-btn"
                      onClick={() => setIsAddingGoal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="save-goal-btn"
                      onClick={handleAddGoal}
                    >
                      Save Goal
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="add-goal-card"
                  onClick={() => setIsAddingGoal(true)}
                >
                  <div className="add-icon"><PlusIcon /></div>
                  <p>Add New Goal</p>
                </div>
              )
            )}
          </div>
        </section>
        
        {/* Progress Summary */}
        <section className="progress-summary">
          <h2>Weekly Progress</h2>
          
          <div className="progress-stats-grid">
            <div className="progress-stat-card">
              <div className="stat-header">
                <h3>Current Weight</h3>
              </div>
              <div className="stat-value">{progressData.weight[progressData.weight.length - 1]} kg</div>
              <div className="stat-change negative">
                -{(progressData.weight[0] - progressData.weight[progressData.weight.length - 1]).toFixed(1)} kg since start
              </div>
            </div>
            
            <div className="progress-stat-card">
              <div className="stat-header">
                <h3>Body Fat %</h3>
              </div>
              <div className="stat-value">{progressData.bodyFat[progressData.bodyFat.length - 1]}%</div>
              <div className="stat-change negative">
                -{(progressData.bodyFat[0] - progressData.bodyFat[progressData.bodyFat.length - 1]).toFixed(1)}% since start
              </div>
            </div>
            
            <div className="progress-stat-card">
              <div className="stat-header">
                <h3>Workouts/Week</h3>
              </div>
              <div className="stat-value">{progressData.workoutsPerWeek[progressData.workoutsPerWeek.length - 1]}</div>
              <div className="stat-change positive">
                +{progressData.workoutsPerWeek[progressData.workoutsPerWeek.length - 1] - progressData.workoutsPerWeek[0]} since start
              </div>
            </div>
          </div>
        </section>
        
        {/* Fitness Journal */}
        <section className="fitness-journal">
          <h2>Fitness Journal</h2>
          
          {isAdmin && (
            <div className="journal-composer">
              <textarea 
                placeholder="Share your workout, progress or fitness thoughts (260 chars max)..."
                value={newEntry}
                onChange={handleEntryChange}
                maxLength={260}
              ></textarea>
              
              <div className="composer-footer">
                <div className={`char-counter ${remainingChars < 20 ? 'low' : ''}`}>
                  {remainingChars} characters left
                </div>
                <button 
                  className="post-btn"
                  onClick={addJournalEntry}
                  disabled={newEntry.trim() === "" || submittingEntry}
                >
                  {submittingEntry ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          )}
          
          <div className="journal-entries">
            {journalLoading ? (
              <div className="loading-entries">Loading journal entries...</div>
            ) : journalEntries.length === 0 ? (
              <div className="no-entries">No journal entries yet.</div>
            ) : (
              journalEntries.map(entry => (
                <div className="journal-entry" key={entry.id}>
                  <div className="entry-content">{entry.content}</div>
                  <div className="entry-footer">
                    <div className="entry-date">{entry.date}</div>
                    <div className="entry-actions">
                      <button 
                        className={`like-btn ${entry.liked ? 'liked' : ''}`}
                        onClick={() => handleLikeEntry(entry.id)}
                      >
                        <ThumbsUpIcon /> {entry.likes}
                      </button>
                      <button className="comment-btn">
                        <CommentIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Fitness;