import React, { useState } from 'react';
import './Reading.css';
import book1 from "../images/book1.jpg";  // Your imported image
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
  // State for modal
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
// Monthly reading plan
const [monthlyReads, setMonthlyReads] = useState([
  {
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
      imageUrl: book1  // Correctly assign the imported image
    },
    monthlyGoal: {
      completed: false,
      completionDate: null,
    },
    notes: []
  },
  {
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
  // Lifetime book collection
  const [bookCollection, setBookCollection] = useState([
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
  const updatePageProgress = (index, newCurrentPage) => {
    const updatedMonthlyReads = [...monthlyReads];
    const book = updatedMonthlyReads[index].book;
    
    book.currentPage = newCurrentPage;
    book.progress = Math.round((newCurrentPage / book.totalPages) * 100);
    
    // Update status
    if (book.progress === 100) {
      book.status = 'completed';
      updatedMonthlyReads[index].monthlyGoal.completed = true;
      updatedMonthlyReads[index].monthlyGoal.completionDate = new Date().toISOString().split('T')[0];
    } else if (book.progress > 0) {
      book.status = 'reading';
    }

    setMonthlyReads(updatedMonthlyReads);
  };

  // Add book to collection
  const addBookToCollection = (book) => {
    const newBook = {
      id: bookCollection.length + 1,
      ...book,
      completedDate: book.completedDate || new Date().toISOString().split('T')[0]
    };

    setBookCollection(prevCollection => [...prevCollection, newBook]);
  };

  // Manually add a new book
  const handleAddNewBook = (newBook) => {
    // Add to monthly reads
    const updatedMonthlyReads = [...monthlyReads];
    updatedMonthlyReads.push({
      month: new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear(),
      book: newBook,
      monthlyGoal: {
        completed: false,
        completionDate: null,
      },
      notes: []
    });

    setMonthlyReads(updatedMonthlyReads);
    setIsAddBookModalOpen(false);
  };

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
          {monthlyReads.map((monthRead, index) => (
            <div 
              key={monthRead.month} 
              className={`monthly-book-card ${getStatusColor(monthRead.book.status)}`}
            >
              <div className="book-preview">
                {monthRead.book.imageUrl ? (
                  <img 
                    src={monthRead.book.imageUrl} 
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
                      imageUrl: monthRead.book.imageUrl, // Add the image URL to the collection
                      completedDate: monthRead.monthlyGoal.completionDate
                    })}
                    className="add-to-collection-btn"
                  >
                    Add to Collection
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Book Collection Section */}
        <section className="book-collection">
          <h2>Book Collection</h2>
          <div className="books-grid">
            {bookCollection.map(book => (
              <div 
                key={book.id} 
                className={`book-card ${getStatusColor(book.status)}`}
              >
                {book.imageUrl ? (
                  <img 
                    src={book.imageUrl} 
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
        </section>
      </div>
    </div>
  );
};

export default Reading;