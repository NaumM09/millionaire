// src/firebase/firestore.js
import { 
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp
  } from 'firebase/firestore';
  import { db } from './config';
  
  // Add a document to a collection
  export const addDocument = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  };
  
  // Set a document with custom ID
  export const setDocument = async (collectionName, docId, data) => {
    try {
      await setDoc(doc(db, collectionName, docId), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docId;
    } catch (error) {
      throw error;
    }
  };
  
  // Get a document by ID
  export const getDocument = async (collectionName, docId) => {
    try {
      const docSnap = await getDoc(doc(db, collectionName, docId));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };
  
  // Get all documents from a collection
  export const getCollection = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      throw error;
    }
  };
  
  // Query documents with filters, ordering, and limits
  export const queryDocuments = async (
    collectionName,
    filters = [],
    sortBy = null,
    limitTo = null
  ) => {
    try {
      let q = collection(db, collectionName);
      
      // Add filters
      if (filters.length > 0) {
        filters.forEach((filter) => {
          q = query(q, where(filter.field, filter.operator, filter.value));
        });
      }
      
      // Add ordering
      if (sortBy) {
        q = query(q, orderBy(sortBy.field, sortBy.direction || 'asc'));
      }
      
      // Add limit
      if (limitTo) {
        q = query(q, limit(limitTo));
      }
      
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      throw error;
    }
  };
  
  // Update a document
  export const updateDocument = async (collectionName, docId, data) => {
    try {
      await updateDoc(doc(db, collectionName, docId), {
        ...data,
        updatedAt: serverTimestamp()
      });
      return docId;
    } catch (error) {
      throw error;
    }
  };
  
  // Delete a document
  export const deleteDocument = async (collectionName, docId) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      return true;
    } catch (error) {
      throw error;
    }
  };
  
  // Get user-specific documents
  export const getUserDocuments = async (collectionName, userId) => {
    try {
      const q = query(
        collection(db, collectionName),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      throw error;
    }
  };