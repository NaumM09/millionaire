import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebaseContext'; // Fixed import path
import {  
  addDocument, 
  updateDocument, 
  getUserDocuments,
} from '../firebase';
import './Reading.css';
import book1 from "../images/book1.jpg";
import book2 from "../images/book2.jpg";
import book3 from "../images/book3.jpg";
import book4 from "../images/book4.jpg";
import book5 from "../images/book5.jpg";
import book6 from "../images/book6.jpg";
import book7 from "../images/book7.jpg";
import book8 from "../images/book8.jpg";
import book9 from "../images/book9.jpg";
import book10 from "../images/book10.png";
import book11 from "../images/book11.jpg";

// Map of imported images to use as fallbacks if needed
const bookCovers = {
  book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11
};

// Book placeholder image
const BookPlaceholder = ({ width = 150, height = 220 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={width} 
    height={height} 
    viewBox="0 0 150 220"
    className="book-placeholder"
  >
    <rect width="150" height="220" rx="10" fill="#2c2c2c" />
    <text 
      x="50%" 
      y="50%" 
      textAnchor="middle" 
      fill="#888" 
      fontSize="14"
    >
      Book Cover
    </text>
  </svg>
);

const AddBookModal = ({ isOpen, onClose, onAddBook }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    totalPages: '',
    category: '',
    imageUrl: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook({
      ...newBook,
      totalPages: parseInt(newBook.totalPages),
      status: 'to-read',
      currentPage: 0,
      progress: 0,
      startDate: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input 
              type="text" 
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="form-group">
            <label>Total Pages</label>
            <input 
              type="number" 
              name="totalPages"
              value={newBook.totalPages}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input 
              type="text" 
              name="category"
              value={newBook.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Image URL (optional)</label>
            <input 
              type="text" 
              name="imageUrl"
              value={newBook.imageUrl || ''}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="add-btn">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Reading = () => {
  // Get the current user from Firebase context
  const { currentUser, loading: authLoading } = useFirebase() || { currentUser: null, loading: false };
  
  // State for modal
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // Monthly reading plan
  const [monthlyReads, setMonthlyReads] = useState([]);
  // Lifetime book collection
  const [bookCollection, setBookCollection] = useState([]);

  // Debugging
  useEffect(() => {
    console.log("FirebaseContext currentUser:", currentUser);
    console.log("FirebaseContext loading:", authLoading);
  }, [currentUser, authLoading]);

  // Fetch data from Firebase when component mounts
  useEffect(() => {
    // Wait until auth is ready
    if (authLoading) return;
    
    const fetchData = async () => {
      try {
        console.log("Fetching data, currentUser:", currentUser);
        
        if (!currentUser) {
          console.log("No user found, using default data");
          setDefaultData();
          setLoading(false);
          return;
        }

        // Fetch monthly reads from Firebase
        console.log("Fetching monthly reads for user:", currentUser.uid);
        const monthlyReadsData = await getUserDocuments('monthlyReads', currentUser.uid);
        console.log("Monthly reads data:", monthlyReadsData);
        
        // If no monthly reads found for the user, create default ones
        if (!monthlyReadsData || monthlyReadsData.length === 0) {
          console.log("No monthly reads found, creating defaults");
          await createDefaultMonthlyReads(currentUser.uid);
          const newMonthlyReads = await getUserDocuments('monthlyReads', currentUser.uid);
          console.log("New monthly reads:", newMonthlyReads);
          setMonthlyReads(newMonthlyReads || []);
        } else {
          setMonthlyReads(monthlyReadsData);
        }

        // Fetch books from Firebase
        console.log("Fetching books for user:", currentUser.uid);
        const booksData = await getUserDocuments('books', currentUser.uid);
        console.log("Books data:", booksData);
        setBookCollection(booksData || []);
      } catch (error) {
        console.error("Error fetching reading data:", error);
        // Fallback to default data if there's an error
        setDefaultData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, authLoading]);

  // Create default monthly reads for a new user
  const createDefaultMonthlyReads = async (userId) => {
    const defaultMonthlyReads = [
      {
        month: 'April 2025',
        userId: userId,
        book: {
          title: 'Way of the Wolf',
          author: 'Jordan Belfort',
          category: 'Sales & Motivation',
          status: 'reading',
          totalPages: 250,
          currentPage: 112,
          progress: 45,
          startDate: '2025-04-01',
          imageUrl: 'book1'
        },
        monthlyGoal: {
          completed: false,
          completionDate: null,
        },
        notes: []
      },
      {
        month: 'May 2025',
        userId: userId,
        book: {
          title: 'Surrounded by Idiots',
          author: 'Thomas Erikson',
          category: 'Psychology',
          status: 'reading',
          totalPages: 304,
          currentPage: 0,
          progress: 0,
          startDate: null,
          imageUrl: 'book11',
        },
        monthlyGoal: {
          completed: false,
          completionDate: null,
        },
        notes: []
      }
    ];

    console.log("Creating default monthly reads:", defaultMonthlyReads);
    
    for (const monthlyRead of defaultMonthlyReads) {
      await addDocument('monthlyReads', monthlyRead);
    }
  };

  // Set default data for non-logged-in users or fallback
  const setDefaultData = () => {
    console.log("Setting default data");
    
    setMonthlyReads([
      {
        id: 'default1',
        month: 'April 2025',
        book: {
          title: 'Way of the Wolf',
          author: 'Jordan Belfort',
          category: 'Sales & Motivation',
          status: 'reading',
          totalPages: 250,
          currentPage: 112,
          progress: 45,
          startDate: '2025-04-01',
          imageUrl: book1
        },
        monthlyGoal: {
          completed: false,
          completionDate: null,
        },
        notes: []
      },
      {
        id: 'default2',
        month: 'May 2025',
        book: {
          title: 'Surrounded by Idiots',
          author: 'Thomas Erikson',
          category: 'Psychology',
          status: 'reading',
          totalPages: 304,
          currentPage: 0,
          progress: 0,
          startDate: null,
          imageUrl: book11,
        },
        monthlyGoal: {
          completed: false,
          completionDate: null,
        },
        notes: []
      }
    ]);

    setBookCollection([
      {
        id: 1,
        title: 'Never Split the Difference',
        author: 'Chris Voss',
        status: 'completed',
        totalPages: 288,
        currentPage: 288,
        progress: 100,
        category: 'Negotiation',
        imageUrl: book2,
        completedDate: '2025-01-15'
      },
      {
        id: 2,
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        status: 'completed',
        totalPages: 238,
        currentPage: 238,
        progress: 100,
        category: 'Personal Finance',
        imageUrl: book3,
        completedDate: '2025-02-01'
      },
      {
        id: 3,
        title: 'Atomic Habits',
        author: 'James Clear',
        status: 'completed',
        totalPages: 320,
        currentPage: 320,
        progress: 100,
        category: 'Self-Improvement',
        imageUrl: book4,
        completedDate: '2025-02-15'
      },
      {
        id: 4,
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        status: 'completed',
        totalPages: 336,
        currentPage: 336,
        progress: 100,
        category: 'Personal Finance',
        imageUrl: book5,
        completedDate: '2025-03-01'
      },
      {
        id: 5,
        title: 'The Secret',
        author: 'Rhonda Byrne',
        status: 'completed',
        totalPages: 198,
        currentPage: 198,
        progress: 100,
        category: 'Self-Help',
        imageUrl: book6,
        completedDate: '2025-03-10'
      },
      {
        id: 6,
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        status: 'completed',
        totalPages: 256,
        currentPage: 256,
        progress: 100,
        category: 'Personal Finance',
        imageUrl: book7,
        completedDate: '2025-03-20'
      },
      {
        id: 7,
        title: 'Bamboozled by Jesus',
        author: 'Yvonne Orji',
        status: 'completed',
        totalPages: 272,
        currentPage: 272,
        progress: 100,
        category: 'Memoir',
        imageUrl: book8,
        completedDate: '2025-03-25'
      },
      {
        id: 8,
        title: 'Never Finished',
        author: 'David Goggins',
        status: 'completed',
        totalPages: 320,
        currentPage: 320,
        progress: 100,
        category: 'Motivation',
        imageUrl: book9,
        completedDate: '2025-04-01'
      },
      {
        id: 9,
        title: 'The Diary of a CEO',
        author: 'Steven Bartlett',
        status: 'completed',
        totalPages: 304,
        currentPage: 304,
        progress: 100,
        category: 'Business',
        imageUrl: book10,
        completedDate: '2025-04-10'
      }
    ]);
  };

  // Utility function to get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'reading': return 'in-progress';
      case 'completed': return 'completed';
      case 'to-read': return 'pending';
      default: return '';
    }
  };

  // Update page progress
  const updatePageProgress = async (index, newCurrentPage) => {
    const updatedMonthlyReads = [...monthlyReads];
    const monthlyRead = updatedMonthlyReads[index];
    const book = monthlyRead.book;
    
    book.currentPage = newCurrentPage;
    book.progress = Math.round((newCurrentPage / book.totalPages) * 100);
    
    // Update status
    if (book.progress === 100) {
      book.status = 'completed';
      monthlyRead.monthlyGoal.completed = true;
      monthlyRead.monthlyGoal.completionDate = new Date().toISOString().split('T')[0];
    } else if (book.progress > 0) {
      book.status = 'reading';
    }

    setMonthlyReads(updatedMonthlyReads);
    
    // Update in Firebase if user is logged in
    if (currentUser && monthlyRead.id) {
      try {
        console.log("Updating document in Firebase:", monthlyRead);
        await updateDocument('monthlyReads', monthlyRead.id, monthlyRead);
      } catch (error) {
        console.error("Error updating reading progress:", error);
      }
    }
  };

  // Add book to collection
  const addBookToCollection = async (book) => {
    console.log("Adding book to collection:", book);
    
    // Check if book is already in collection to avoid duplicates
    const existingBook = bookCollection.find(
      b => b.title === book.title && b.author === book.author
    );
    
    if (existingBook) {
      console.log("Book already in collection");
      return;
    }
    
    const newBook = {
      ...book,
      userId: currentUser?.uid || 'guest',
      completedDate: book.completedDate || new Date().toISOString().split('T')[0]
    };

    let newBookWithId;
    
    // Save to Firebase if user is logged in
    if (currentUser) {
      try {
        const bookId = await addDocument('books', newBook);
        newBookWithId = { id: bookId, ...newBook };
        console.log("Book added to Firebase:", newBookWithId);
      } catch (error) {
        console.error("Error adding book to collection:", error);
        // Add locally with a temporary ID if Firebase fails
        newBookWithId = { id: Date.now().toString(), ...newBook };
      }
    } else {
      // Add locally with a temporary ID for non-logged-in users
      newBookWithId = { id: Date.now().toString(), ...newBook };
    }

    setBookCollection(prevCollection => [...prevCollection, newBookWithId]);
  };

  // Manually add a new book
  const handleAddNewBook = async (newBook) => {
    console.log("Adding new book:", newBook);
    
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear();
    
    const newMonthlyRead = {
      month: currentMonth,
      userId: currentUser?.uid || 'guest',
      book: newBook,
      monthlyGoal: {
        completed: false,
        completionDate: null,
      },
      notes: []
    };

    let newMonthlyReadWithId;
    
    // Save to Firebase if user is logged in
    if (currentUser) {
      try {
        const monthlyReadId = await addDocument('monthlyReads', newMonthlyRead);
        newMonthlyReadWithId = { id: monthlyReadId, ...newMonthlyRead };
        console.log("New monthly read added to Firebase:", newMonthlyReadWithId);
      } catch (error) {
        console.error("Error adding new book:", error);
        // Add locally with a temporary ID if Firebase fails
        newMonthlyReadWithId = { id: Date.now().toString(), ...newMonthlyRead };
      }
    } else {
      // Add locally with a temporary ID for non-logged-in users
      newMonthlyReadWithId = { id: Date.now().toString(), ...newMonthlyRead };
    }

    setMonthlyReads(prev => [...prev, newMonthlyReadWithId]);
    setIsAddBookModalOpen(false);
  };

  // Helper to get the correct image based on string or import
  const getBookImage = (imageUrl) => {
    console.log("Getting book image for:", imageUrl);
    
    // If it's a string that matches our imported images
    if (typeof imageUrl === 'string' && bookCovers[imageUrl]) {
      console.log("Using imported image:", imageUrl);
      return bookCovers[imageUrl];
    }
    
    // Otherwise just return whatever it is (URL or imported image)
    return imageUrl;
  };

  if (authLoading || loading) {
    return <div className="loading">Loading your reading journey...</div>;
  }

  console.log("Rendering with:", { monthlyReads, bookCollection });

  return (
    <div className="reading-journal-container">
      <header className="page-header">
        <h1>Reading Journal</h1>
        <p>Monthly reading goals and book collection tracking</p>
        <button 
          onClick={() => setIsAddBookModalOpen(true)} 
          className="add-book-btn"
        >
          + Add New Book
        </button>
      </header>

      <AddBookModal 
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        onAddBook={handleAddNewBook}
      />

      <div className="reading-dashboard">
        {/* Monthly Reading Goal Section */}
        <section className="monthly-reading-goal">
          <h2>Monthly Reading Plan</h2>
          {monthlyReads.length > 0 ? (
            monthlyReads.map((monthRead, index) => (
              <div 
                key={monthRead.id || index} 
                className={`monthly-book-card ${getStatusColor(monthRead.book.status)}`}
              >
                <div className="book-preview">
                  {monthRead.book.imageUrl ? (
                    <img 
                      src={getBookImage(monthRead.book.imageUrl)} 
                      alt={monthRead.book.title} 
                      className="book-cover"
                    />
                  ) : (
                    <BookPlaceholder />
                  )}
                </div>
                
                <div className="book-details">
                  <div className="book-header">
                    <h3>{monthRead.book.title}</h3>
                    <span className={`book-status ${getStatusColor(monthRead.book.status)}`}>
                      {monthRead.book.status}
                    </span>
                  </div>
                  
                  <p className="book-author">by {monthRead.book.author}</p>
                  <p className="book-category">{monthRead.book.category}</p>
                  
                  <div className="book-progress">
                    <label>Reading Progress</label>
                    <div className="page-progress-container">
                      <input 
                        type="range" 
                        min="0" 
                        max={monthRead.book.totalPages} 
                        value={monthRead.book.currentPage}
                        onChange={(e) => updatePageProgress(index, parseInt(e.target.value))}
                      />
                      <div className="page-progress-info">
                        <span>{monthRead.book.currentPage} / {monthRead.book.totalPages} pages</span>
                        <span>{monthRead.book.progress}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {monthRead.monthlyGoal.completed && (
                    <div className="monthly-goal-completed">
                      Completed on {monthRead.monthlyGoal.completionDate}
                    </div>
                  )}

                  {/* Button to add to collection when completed */}
                  {monthRead.monthlyGoal.completed && (
                    <button 
                      onClick={() => addBookToCollection({
                        title: monthRead.book.title,
                        author: monthRead.book.author,
                        category: monthRead.book.category,
                        status: 'completed',
                        totalPages: monthRead.book.totalPages,
                        currentPage: monthRead.book.totalPages,
                        progress: 100,
                        imageUrl: monthRead.book.imageUrl,
                        completedDate: monthRead.monthlyGoal.completionDate
                      })}
                      className="add-to-collection-btn"
                    >
                      Add to Collection
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-books-message">
              <p>No monthly reading plans yet. Add a book to get started!</p>
            </div>
          )}
        </section>

        {/* Book Collection Section */}
        <section className="book-collection">
          <h2>Book Collection</h2>
          {bookCollection.length > 0 ? (
            <div className="books-grid">
              {bookCollection.map(book => (
                <div 
                  key={book.id} 
                  className={`book-card ${getStatusColor(book.status)}`}
                >
                  {book.imageUrl ? (
                    <img 
                      src={getBookImage(book.imageUrl)} 
                      alt={book.title} 
                      className="book-cover"
                    />
                  ) : (
                    <BookPlaceholder />
                  )}
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <div className={`book-status ${getStatusColor(book.status)}`}>
                      {book.status}
                    </div>
                    {book.completedDate && (
                      <div className="completed-date">
                        Finished: {book.completedDate}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-books-message">
              <p>No books in your collection yet. Complete a monthly reading or add books directly.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Reading;