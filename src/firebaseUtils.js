// utils/firebaseUtils.js
import { 
    getDocument, 
    setDocument, 
    updateDocument, 
    getCollection, 
    queryDocuments,
    addDocument,
    deleteDocument,
    getUserDocuments
  } from '../firebase';
  import { serverTimestamp, Timestamp } from 'firebase/firestore';
  
  // USER DATA
  export const createUserProfile = async (userId, userData) => {
    try {
      await setDocument('users', userId, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error creating user profile:", error);
      return false;
    }
  };
  
  export const updateUserProfile = async (userId, updateData) => {
    try {
      await updateDocument('users', userId, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    }
  };
  
  export const getUserProfile = async (userId) => {
    try {
      const userData = await getDocument('users', userId);
      return userData;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  };
  
  // USER SETTINGS
  export const getUserSettings = async (userId) => {
    try {
      const settingsData = await getDocument('userSettings', userId);
      
      if (settingsData) {
        return settingsData;
      } else {
        // Create default settings if none exist
        const defaultSettings = {
          targetDate: Timestamp.fromDate(new Date('2028-04-09')), // Default 30th birthday
          theme: 'dark',
          notifications: true
        };
        
        await setDocument('userSettings', userId, defaultSettings);
        return defaultSettings;
      }
    } catch (error) {
      console.error("Error getting user settings:", error);
      return null;
    }
  };
  
  export const updateUserSettings = async (userId, updateData) => {
    try {
      await updateDocument('userSettings', userId, updateData);
      return true;
    } catch (error) {
      console.error("Error updating user settings:", error);
      return false;
    }
  };
  
  // USER JOURNEY
  export const getUserJourney = async (userId) => {
    try {
      const journeyData = await getDocument('userJourney', userId);
      
      if (journeyData) {
        return journeyData;
      } else {
        // Create default journey if none exists
        const defaultJourney = {
          timeline: [
            { year: "University", label: "The Spark", description: "Graduated with a head full of dreams (and probably student debt)." },
            { year: "22", label: "The Launchpad", description: "Set the foundation. Real life: unlocked." },
            { year: "23–24", label: "The First Swing", description: "Built a startup. Grit, grind, and glorious mistakes." },
            { year: "25", label: "The Detour", description: "Took a job. Tried adulting. It was... informative." },
            { year: "26", label: "The Escape", description: "Left the 9-5. Freedom tasted like cold brew and uncertainty." },
            { year: "27", label: "The Return", description: "Back in the startup game. Still searching for the million-dollar spark." },
            { year: "30", label: "The Verdict", description: "Millionaire? Job seeker? TBD. Countdown in motion." }
          ]
        };
        
        await setDocument('userJourney', userId, defaultJourney);
        return defaultJourney;
      }
    } catch (error) {
      console.error("Error getting user journey:", error);
      return null;
    }
  };
  
  export const updateUserJourney = async (userId, updateData) => {
    try {
      await updateDocument('userJourney', userId, updateData);
      return true;
    } catch (error) {
      console.error("Error updating user journey:", error);
      return false;
    }
  };
  
  // PROJECTS
  export const getProjects = async (userId) => {
    try {
      const projects = await getUserDocuments('projects', userId);
      return projects;
    } catch (error) {
      console.error("Error getting projects:", error);
      return [];
    }
  };
  
  export const getProject = async (projectId) => {
    try {
      const projectData = await getDocument('projects', projectId);
      
      if (projectData) {
        return {
          id: projectId,
          ...projectData
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting project:", error);
      return null;
    }
  };
  
  export const createProject = async (projectData) => {
    try {
      const projectId = await addDocument('projects', {
        ...projectData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return projectId;
    } catch (error) {
      console.error("Error creating project:", error);
      return null;
    }
  };
  
  export const updateProject = async (projectId, updateData) => {
    try {
      await updateDocument('projects', projectId, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error updating project:", error);
      return false;
    }
  };
  
  export const deleteProject = async (projectId) => {
    try {
      await deleteDocument('projects', projectId);
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  };
  
  // PROJECT MILESTONES
  export const getProjectMilestones = async (projectId) => {
    try {
      const milestones = await getCollection(`projects/${projectId}/milestones`);
      return milestones;
    } catch (error) {
      console.error("Error getting project milestones:", error);
      return [];
    }
  };
  
  export const createProjectMilestone = async (projectId, milestoneData) => {
    try {
      const milestoneId = await addDocument(`projects/${projectId}/milestones`, milestoneData);
      return milestoneId;
    } catch (error) {
      console.error("Error creating project milestone:", error);
      return null;
    }
  };
  
  // FITNESS GOALS
  export const getFitnessGoals = async (userId) => {
    try {
      const fitnessGoals = await queryDocuments('fitnessGoals', 'userId', '==', userId);
      return fitnessGoals;
    } catch (error) {
      console.error("Error getting fitness goals:", error);
      return [];
    }
  };
  
  // Add more functions for other collections as needed
  
  export default {
    createUserProfile,
    updateUserProfile,
    getUserProfile,
    getUserSettings,
    updateUserSettings,
    getUserJourney,
    updateUserJourney,
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectMilestones,
    createProjectMilestone,
    getFitnessGoals,
  };