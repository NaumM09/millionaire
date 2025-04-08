// context/FirebaseContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDocument } from './firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

// Create the context
const FirebaseContext = createContext();

// Create a hook for using the context
export const useFirebase = () => useContext(FirebaseContext);

// Create the provider component
export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Fetch user data from Firestore
          const userData = await getDocument('users', user.uid);
          
          if (userData) {
            setUserData(userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Value to be provided to consumers
  const value = {
    currentUser,
    userData,
    loading,
    // You can add more Firebase-related functions here
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;