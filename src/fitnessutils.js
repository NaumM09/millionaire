// utils/fitnessUtils.js
import { 
    collection,
    doc,
    addDoc,
    setDoc,  // Added this import
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    increment
  } from 'firebase/firestore';
  import { db, auth } from './config';
  
  /**
   * JOURNAL ENTRIES
   */
  
  // Get all fitness journal entries sorted by date
  export const getFitnessJournalEntries = async () => {
    try {
      const q = query(
        collection(db, 'fitnessJournal'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const entries = [];
      
      querySnapshot.forEach((doc) => {
        entries.push({
          id: doc.id,
          ...doc.data(),
          // Format the date for display
          date: formatDate(doc.data().createdAt?.toDate())
        });
      });
      
      return entries;
    } catch (error) {
      console.error('Error getting fitness journal entries:', error);
      return [];
    }
  };
  
  // Add a new fitness journal entry
  export const addFitnessJournalEntry = async (content) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to add a journal entry');
      }
      
      const entryData = {
        content,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likes: 0,
        likedBy: [],
        isAdminPost: true // Mark as admin post for identification
      };
      
      const docRef = await addDoc(collection(db, 'fitnessJournal'), entryData);
      
      // Return the new entry with formatted date for immediate display
      return {
        id: docRef.id,
        ...entryData,
        date: 'Just now',
        createdAt: new Date() // Local date for immediate display
      };
    } catch (error) {
      console.error('Error adding fitness journal entry:', error);
      throw error;
    }
  };
  
  // Update a fitness journal entry
  export const updateFitnessJournalEntry = async (entryId, content) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to update a journal entry');
      }
      
      // Get the entry first to verify ownership
      const entryRef = doc(db, 'fitnessJournal', entryId);
      const entrySnap = await getDoc(entryRef);
      
      if (!entrySnap.exists()) {
        throw new Error('Entry not found');
      }
      
      const entryData = entrySnap.data();
      
      // Check if the current user is the creator of the entry
      if (entryData.userId !== currentUser.uid) {
        throw new Error('You can only edit your own entries');
      }
      
      await updateDoc(entryRef, {
        content,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error updating fitness journal entry:', error);
      throw error;
    }
  };
  
  // Delete a fitness journal entry
  export const deleteFitnessJournalEntry = async (entryId) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to delete a journal entry');
      }
      
      // Get the entry first to verify ownership
      const entryRef = doc(db, 'fitnessJournal', entryId);
      const entrySnap = await getDoc(entryRef);
      
      if (!entrySnap.exists()) {
        throw new Error('Entry not found');
      }
      
      const entryData = entrySnap.data();
      
      // Check if the current user is the creator of the entry
      if (entryData.userId !== currentUser.uid) {
        throw new Error('You can only delete your own entries');
      }
      
      await deleteDoc(entryRef);
      
      return true;
    } catch (error) {
      console.error('Error deleting fitness journal entry:', error);
      throw error;
    }
  };
  
  // Like a fitness journal entry
  export const likeFitnessJournalEntry = async (entryId) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to like an entry');
      }
      
      const entryRef = doc(db, 'fitnessJournal', entryId);
      const entrySnap = await getDoc(entryRef);
      
      if (!entrySnap.exists()) {
        throw new Error('Entry not found');
      }
      
      const entryData = entrySnap.data();
      const likedBy = entryData.likedBy || [];
      const userId = currentUser.uid;
      
      // Check if user already liked the entry
      if (likedBy.includes(userId)) {
        // Unlike the entry
        await updateDoc(entryRef, {
          likes: increment(-1),
          likedBy: likedBy.filter(id => id !== userId)
        });
        
        return {
          liked: false,
          likes: Math.max(0, entryData.likes - 1)
        };
      } else {
        // Like the entry
        await updateDoc(entryRef, {
          likes: increment(1),
          likedBy: [...likedBy, userId]
        });
        
        return {
          liked: true,
          likes: entryData.likes + 1
        };
      }
    } catch (error) {
      console.error('Error liking fitness journal entry:', error);
      throw error;
    }
  };
  
  /**
   * FITNESS GOALS
   */
  
  // Get fitness goals for the current user
  export const getFitnessGoals = async () => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to view fitness goals');
      }
      
      const q = query(collection(db, 'fitnessGoals'), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const goals = [];
      querySnapshot.forEach((doc) => {
        goals.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return goals;
    } catch (error) {
      console.error('Error getting fitness goals:', error);
      return [];
    }
  };
  
  // Add a new fitness goal
  export const addFitnessGoal = async (goalData) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to add a fitness goal');
      }
      
      const newGoal = {
        ...goalData,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        progress: goalData.progress || 0
      };
      
      const docRef = await addDoc(collection(db, 'fitnessGoals'), newGoal);
      
      return {
        id: docRef.id,
        ...newGoal
      };
    } catch (error) {
      console.error('Error adding fitness goal:', error);
      throw error;
    }
  };
  
  // Update a fitness goal
  export const updateFitnessGoal = async (goalId, updateData) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to update a fitness goal');
      }
      
      // Get the goal first to verify ownership
      const goalRef = doc(db, 'fitnessGoals', goalId);
      const goalSnap = await getDoc(goalRef);
      
      if (!goalSnap.exists()) {
        throw new Error('Goal not found');
      }
      
      const goalData = goalSnap.data();
      
      // Check if the current user is the creator of the goal
      if (goalData.userId !== currentUser.uid) {
        throw new Error('You can only edit your own fitness goals');
      }
      
      await updateDoc(goalRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error updating fitness goal:', error);
      throw error;
    }
  };
  
  // Delete a fitness goal
  export const deleteFitnessGoal = async (goalId) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to delete a fitness goal');
      }
      
      // Get the goal first to verify ownership
      const goalRef = doc(db, 'fitnessGoals', goalId);
      const goalSnap = await getDoc(goalRef);
      
      if (!goalSnap.exists()) {
        throw new Error('Goal not found');
      }
      
      const goalData = goalSnap.data();
      
      // Check if the current user is the creator of the goal
      if (goalData.userId !== currentUser.uid) {
        throw new Error('You can only delete your own fitness goals');
      }
      
      await deleteDoc(goalRef);
      
      return true;
    } catch (error) {
      console.error('Error deleting fitness goal:', error);
      throw error;
    }
  };
  
  /**
   * WORKOUT TRACKING
   */
  
  // Save workout completion data
  export const saveWorkoutCompletion = async (workoutData) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to save workout data');
      }
      
      // Create a document reference for the user's workout data
      const workoutRef = doc(db, 'workoutTracking', currentUser.uid);
      
      // Get current data (if exists)
      const workoutSnap = await getDoc(workoutRef);
      
      if (workoutSnap.exists()) {
        // Update existing document
        await updateDoc(workoutRef, {
          data: workoutData,
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new document with workout data
        await setDoc(workoutRef, {
          userId: currentUser.uid,
          data: workoutData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error saving workout completion data:', error);
      throw error;
    }
  };
  
  // Get workout completion data
  export const getWorkoutCompletion = async () => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to get workout data');
      }
      
      const workoutRef = doc(db, 'workoutTracking', currentUser.uid);
      const workoutSnap = await getDoc(workoutRef);
      
      if (workoutSnap.exists()) {
        return workoutSnap.data().data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting workout completion data:', error);
      return null;
    }
  };
  
  /**
   * PROGRESS DATA
   */
  
  // Save fitness progress data
  export const saveProgressData = async (progressData) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to save progress data');
      }
      
      // Create a document reference for the user's progress data
      const progressRef = doc(db, 'fitnessProgress', currentUser.uid);
      
      // Get current data (if exists)
      const progressSnap = await getDoc(progressRef);
      
      if (progressSnap.exists()) {
        // Update existing document
        await updateDoc(progressRef, {
          data: progressData,
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new document with progress data
        await setDoc(progressRef, {
          userId: currentUser.uid,
          data: progressData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error saving progress data:', error);
      throw error;
    }
  };
  
  // Get fitness progress data
  export const getProgressData = async () => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('You must be logged in to get progress data');
      }
      
      const progressRef = doc(db, 'fitnessProgress', currentUser.uid);
      const progressSnap = await getDoc(progressRef);
      
      if (progressSnap.exists()) {
        return progressSnap.data().data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting progress data:', error);
      return null;
    }
  };
  
  /**
   * HELPER FUNCTIONS
   */
  
  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else {
      // Return formatted date for older entries
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };
  
  // Check if the current user is the admin/owner of the site
  export const isCurrentUserAdmin = async () => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        return false;
      }
      
      // We need to query the user document to check if they're an admin
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data().isAdmin === true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking if user is admin:', error);
      return false;
    }
  };