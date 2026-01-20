// pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocument} from '../firebase'; // Import the Firebase utility functions
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import './Home.css';

// Custom SVG icons (unchanged)
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
);

const CakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
    <path d="M2 21h20" />
    <path d="M7 8v2" />
    <path d="M12 8v2" />
    <path d="M17 8v2" />
    <path d="M7 4h.01" />
    <path d="M12 4h.01" />
    <path d="M17 4h.01" />
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isBirthday, setIsBirthday] = useState(false);
  const [userData, setUserData] = useState(null);
  const [journeyTimeline, setJourneyTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetDate, setTargetDate] = useState(null);
  
  // Listen for authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data
          const userData = await getDocument('users', user.uid);
          
          if (userData) {
            setUserData(userData);
          }
          
          // Fetch user settings for countdown target date
          const userSettings = await getDocument('userSettings', user.uid);
          
          if (userSettings && userSettings.targetDate) {
            // Convert Firestore timestamp to JS Date
            setTargetDate(userSettings.targetDate.toDate());
          } else {
            // Default to 30th birthday if not set
            setTargetDate(new Date('2028-04-09T00:00:00'));
          }
          
          // Fetch journey timeline
          const userJourney = await getDocument('userJourney', user.uid);
          
          if (userJourney && userJourney.timeline) {
            setJourneyTimeline(userJourney.timeline);
          } else {
            // Use default timeline if not set
            setJourneyTimeline([
              { year: "University", label: "The Spark", description: "Graduated with a head full of dreams (and probably student debt)." },
              { year: "22", label: "The Launchpad", description: "Set the foundation. Real life: unlocked." },
              { year: "23–24", label: "The First Swing", description: "Built a startup. Grit, grind, and glorious mistakes." },
              { year: "25", label: "The Detour", description: "Took a job. Tried adulting. It was... informative." },
              { year: "26", label: "The Escape", description: "Left the 9-5. Freedom tasted like cold brew and uncertainty." },
              { year: "27", label: "The Return", description: "Back in the startup game. Still searching for the million-dollar spark." },
              { year: "30", label: "The Verdict", description: "Millionaire? Job seeker? TBD. Countdown in motion." }
            ]);
          }
          
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      } else {
        // No user is signed in, use default values
        setTargetDate(new Date('2028-04-09T00:00:00'));
        setJourneyTimeline([
          { year: "University", label: "The Spark", description: "Graduated with a head full of dreams (and probably student debt)." },
          { year: "22", label: "The Launchpad", description: "Set the foundation. Real life: unlocked." },
          { year: "23–24", label: "The First Swing", description: "Built a startup. Grit, grind, and glorious mistakes." },
          { year: "25", label: "The Detour", description: "Took a job. Tried adulting. It was... informative." },
          { year: "26", label: "The Escape", description: "Left the 9-5. Freedom tasted like cold brew and uncertainty." },
          { year: "27", label: "The Return", description: "Back in the startup game. Still searching for the million-dollar spark." },
          { year: "30", label: "The Verdict", description: "Millionaire? Job seeker? TBD. Countdown in motion." }
        ]);
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  // Check if today is birthday
  useEffect(() => {
    const today = new Date();
    const birthMonth = 3; // April (0-indexed in JavaScript, so 3 is April)
    const birthDay = 9;
    
    if (today.getMonth() === birthMonth && today.getDate() === birthDay) {
      setIsBirthday(true);
    }
  }, []);
  
  // Calculate time until target date
  useEffect(() => {
    if (!targetDate) return;
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        // Calculate total seconds, minutes, hours, days
        const totalSeconds = Math.floor(difference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        
        // Calculate years, months, days
        const years = Math.floor(totalDays / 365);
        const months = Math.floor((totalDays % 365) / 30);
        const days = Math.floor(totalDays % 30);
        
        // Calculate remaining hours, minutes, seconds
        const hours = Math.floor(totalHours % 24);
        const minutes = Math.floor(totalMinutes % 60);
        const seconds = Math.floor(totalSeconds % 60);
        
        setTimeLeft({ years, months, days, hours, minutes, seconds });
      }
    };
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  const quickLinks = [
    { path: '/projects', label: 'Projects', icon: <BriefcaseIcon /> },
    { path: '/fitness', label: 'Fitness Goals', icon: <ActivityIcon /> },
    { path: '/trading-journal', label: 'Trading Journal', icon: <ChartIcon /> },
    { path: '/reading', label: 'Reading List', icon: <BookIcon /> },
  ];
  
  if (loading) {
    return <div className="loading">Loading your journey...</div>;
  }
  
  return (
    <div className="home-container">
      <div className="home-gradient-bg"></div>
      
      {isBirthday && (
        <div className="birthday-message">
          <div className="cake-icon"><CakeIcon /></div>
          <h2>Happy Birthday {userData?.displayName || 'Naum'}!</h2>
          <p>It's your day! May your inbox overflow with VC offers and your coffee always stay hot. Keep going, you've got this.</p>
          <div className="confetti"></div>
        </div>
      )}
      
      <div className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="title">27.</h1>
            <h2 className="subtitle">The Countdown Has Begun</h2>
            <p className="vision-statement">
              From big dreams to bootstrapped realities. Tracking the journey to a million — or a decent fallback plan.
            </p>
          </div>
            
          <div className="countdown-container">
            <h3>Time Left Until 30</h3>
            <div className="countdown-grid">
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.years}</span>
                <span className="countdown-label">YEARS</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.months}</span>
                <span className="countdown-label">MONTHS</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.days}</span>
                <span className="countdown-label">DAYS</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.hours}</span>
                <span className="countdown-label">HOURS</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.minutes}</span>
                <span className="countdown-label">MINUTES</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.seconds}</span>
                <span className="countdown-label">SECONDS</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Journey Section */}
        <section className="journey-section">
          <div className="journey-header">
            <div className="rocket-icon"><RocketIcon /></div>
            <h2>The Million Dollar Journey</h2>
          </div>
          
          <div className="journey-timeline">
            {journeyTimeline.map((milestone, index) => (
              <div className={`timeline-item ${milestone.year === "27" ? 'current' : ''}`} key={index}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{milestone.year}</span>
                  <h4 className="timeline-label">{milestone.label}</h4>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
              </div>
            ))}
            <div className="timeline-line"></div>
          </div>
          
          <div className="journey-message">
            <p>
              I made a deal with myself when I graduated: become a dollar millionaire by 30 or settle for a 9-to-5. 
              It was bold, dramatic — and possibly a cry for help.
            </p>

            <p>
              At 23, I threw myself into the startup life. It was exhilarating, chaotic, and occasionally fueled by instant noodles.
              At 25, I hit pause and tried the "real job" thing. It was stable... and soul-numbing.
              By 26, I'd had enough — I quit, again, and found myself right back at the start-up gates at 27.
            </p>

            <p>
              Have I found *the* million-dollar idea yet? Maybe. Maybe not. But I've definitely found the fire again.
              If you're a millionaire with a map — or just someone who vibes with the hustle — my inbox is open.
              Encouragement, wisdom, memes… I'll take it all. This is my journey. You're welcome to walk alongside it.
            </p>
            
            <div className="cta-buttons">
              <a href={`mailto:${userData?.email || 'naum@forexfuturescrypto.com'}`} className="cta-button primary">Drop Some Wisdom</a>
              <button className="cta-button secondary">Follow the Madness</button>
            </div>
          </div>
        </section>
        
        <section className="quick-links">
          <h3>Navigate My Journey</h3>
          <div className="links-grid">
            {quickLinks.map((link) => (
              <Link to={link.path} className="link-card" key={link.path}>
                <div className="link-icon">{link.icon}</div>
                <div className="link-text">{link.label}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      
      <footer className="home-footer">
        <div className="quote-container">
          <p className="quote">"The best way to predict the future is to build it — while questioning your life choices halfway through."</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;