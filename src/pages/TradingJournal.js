// pages/TradingJournal.js
import React, { useState, useMemo } from 'react';
import './TradingJournal.css';

// Custom SVG icons
const TrendUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF3E58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const BadgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1v6a2 2 0 0 0 2 2h6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6V1h2Z" />
    <path d="M12 1h4a2 2 0 0 1 2 2v4h-6V1Z" />
    <path d="M12 15h2" />
    <path d="M12 18h4" />
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const TradingJournal = () => {
  // Initial account balance and challenge settings
  const INITIAL_BALANCE = 25000;
  const PHASE1_TARGET = 27500;
  const PHASE2_TARGET = 27000;
  
  // Current date for today's cell highlight
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  
  // State for the calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  
  // Current challenge phase
  const [challengePhase, setChallengePhase] = useState(1);
  
  // Sample trade data with USD currency - Fixed duplicate ID issue
  const [trades] = useState([
    {
      id: 0,
      date: "2025-03-27",
      symbol: "NAS100",
      type: "Long",
      entryPrice: 20003.656,
      exitPrice: 19954.409,
      quantity: 10,
      profit: -235.92,
      profitPercentage: -2.07,
      status: "closed",
      notes: "Was honestly hopeful. Also did not look at the high timeframe",
    },
    {
      id: 1,
      date: "2025-04-01",
      symbol: "NAS100",
      type: "Long",
      entryPrice: 18012.75,
      exitPrice: 17640.50,
      quantity: 10,
      profit: -516.30,
      profitPercentage: -2.07,
      status: "closed",
      notes: "Was honestly hopeful. Also did not look at the high timeframe",
    },
    {
      id: 2,
      date: "2025-04-03",
      symbol: "NAS100",
      type: "Short",
      entryPrice: 17490.25,
      exitPrice: 18265.13,
      quantity: 10,
      profit: 774.88,
      profitPercentage: 4.43,
      status: "closed",
      notes: "Market meltdown. Fear index showed extreme selling. Global Panic",
    },
    {
      id: 3,
      date: "2025-04-04",
      symbol: "NAS100",
      type: "Short",
      entryPrice: 17340.50,
      exitPrice: 17046.18,
      quantity: 5,
      profit: 306.16,
      profitPercentage: 1.22,
      status: "closed",
      notes: "Took an L during a.m session. Market was extremely volatile due to news Data and Powell speech. Took an entry again during PM session.",
    },
    {
      id: 4,
      date: "2025-04-04",
      symbol: "NAS100",
      type: "Short",
      entryPrice: 17268.885,
      exitPrice: 17262.027,
      quantity: 5,
      profit: 34.29,
      profitPercentage: 0.14,
      status: "closed",
      notes: "Moved Stop loss to break even.",
    },
    {
      id: 5, // Fixed sequence
      date: "2025-04-07",
      symbol: "NAS100",
      type: "Short",
      entryPrice: 17216.821,
      exitPrice: 17111.128,
      quantity: 5,
      profit: 528.47,
      profitPercentage: 2.11,
      status: "closed",
      notes: "This one was honest riding the sell pressure. also considering that price kept rejecting at the previous weekly low.",
    },
    {
      id: 6, // Fixed sequence
      date: "2025-04-08",
      symbol: "GER30",
      type: "Long",
      entryPrice: 20074.739,
      exitPrice: 20098.984,
      quantity: 5,
      profit: 133.03,
      profitPercentage: 2.11,
      status: "closed",
      notes: "This entry was impulsive - i admit. it was based off other indices going higher",
    },
    {
      id: 7, // Fixed sequence
      date: "2025-04-08",
      symbol: "GER30",
      type: "Long",
      entryPrice: 20046.332,
      exitPrice: 20016.90,
      quantity: 5,
      profit: -161.54,
      profitPercentage: 2.11,
      status: "closed",
      notes: "Due to the first entry being profitable - figured price was retracing lower to give me a better entry. ",
    },
    {
      id: 8, // Fixed sequence
      date: "2025-04-08",
      symbol: "GER30",
      type: "Long",
      entryPrice: 20045.933,
      exitPrice: 20000.80,
      quantity: 5,
      profit: -247.63,
      profitPercentage: 2.11,
      status: "closed",
      notes: "Price was indeed retracing lower but not at the level i was looking at.",
    },
    {
      id: 9, // Fixed sequence
      date: "2025-04-08",
      symbol: "NAS100",
      type: "Short",
      entryPrice: 17763.876,
      exitPrice: 17677.127,
      quantity: 5,
      profit: -116.26,
      profitPercentage: 2.11,
      status: "closed",
      notes: "Here the entry was based on price retesting a low and then rejecting - it created an impulse up",
    },
    {
      id: 10, // Fixed sequence
      date: "2025-04-08",
      symbol: "NAS100",
      type: "Short",
      entryPrice: 17639.374,
      exitPrice: 17657.675,
      quantity: 5,
      profit: -91.21,
      profitPercentage: 2.11,
      status: "closed",
      notes: "This trade was a stupid one i admit. Saw the rejections on GER30 and figured NAS100 is also pushing higer to reject lower",
    },
    {
      id: 11, // Fixed sequence
      date: "2025-04-04",
      symbol: "GER30",
      type: "Long",
      entryPrice: 20008.45,
      exitPrice: 19930.82,
      quantity: 5,
      profit: -426.09,
      profitPercentage: 2.11,
      status: "closed",
      notes: "Price was now below a 50% fib level and the previous candle rejected off the body of an oder block - risk exposure was too high.",
    },
    {
      id: 12, // Fixed sequence
      date: "2025-04-08",
      symbol: "NAS100",
      type: "Short",
      entryPrice: 17680.30,
      exitPrice: 176999.111,
      quantity: 5,
      profit: -94.06,
      profitPercentage: 2.11,
      status: "closed",
      notes: "Still expecting price to go lower to fill the daily liquidity void it created on the open. Price had rejected a high.",
    },
    {
      id: 13, // Fixed sequence
      date: "2025-04-08",
      symbol: "GER30",
      type: "Long",
      entryPrice: 19976.933,
      exitPrice: 20160.672,
      quantity: 5,
      profit: 1006.84,
      profitPercentage: 2.11,
      status: "closed",
      notes: "Price now came in and rejected at the low of the order block - it felt like a safer re-entry and it was",
    },
    {
      id: 14, // Fixed sequence
      date: "2025-04-08",
      symbol: "GER30",
      type: "Long",
      entryPrice: 20080.058,
      exitPrice: 20081.10,
      quantity: 2,
      profit: 2.27,
      profitPercentage: 2.11,
      status: "closed",
      notes: "Closed my previous position and waited for a retracement on swing levels to re-enter. Got taken out at Break even.",
    },
    {
      id: 15, // Fixed sequence
      date: "2025-04-08",
      symbol: "NAS100",
      type: "Long",
      entryPrice: 17695.207,
      exitPrice: 17670.584,
      quantity: 2,
      profit: -49.25,
      profitPercentage: 2.11,
      status: "closed",
      notes: "Saw US30 Pushing higher.",
    },
    {
      id: 16, // Fixed sequence
      date: "2025-04-08",
      symbol: "NAS100",
      type: "Long",
      entryPrice: 17691.207,
      exitPrice: 17670.584,
      quantity: 2,
      profit: -26.11,
      profitPercentage: 2.11,
      status: "closed",
      notes: "Price came into a Fair Value Gap and the previous hourly candle had closed bullish indicating a rejection and push to the upside.",
    },
  ]);
  
  // Dynamic calculations using useMemo to avoid recalculation on every render
  const tradingStats = useMemo(() => {
    // Make sure we're working with unique trades (no duplicates)
    const uniqueTrades = Array.from(new Map(trades.map(trade => [trade.id, trade])).values());
    
    const closedTrades = uniqueTrades.filter(trade => trade.status === "closed");
    const winningTrades = closedTrades.filter(trade => trade.profit > 0);
    const losingTrades = closedTrades.filter(trade => trade.profit < 0);
    
    // Basic stats
    const totalProfit = closedTrades.reduce((sum, trade) => sum + trade.profit, 0);
    const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;
    
    // Current account balance
    const currentBalance = INITIAL_BALANCE + totalProfit;
    
    // Challenge progress
    let challengeTarget = challengePhase === 1 ? PHASE1_TARGET : PHASE2_TARGET;
    let progressPercentage = ((currentBalance - INITIAL_BALANCE) / (challengeTarget - INITIAL_BALANCE)) * 100;
    
    // Ensure percentage doesn't exceed 100%
    progressPercentage = Math.min(100, Math.max(0, progressPercentage));
    
    // Advanced stats
    const totalWinAmount = winningTrades.reduce((sum, trade) => sum + trade.profit, 0);
    const totalLossAmount = losingTrades.reduce((sum, trade) => sum + trade.profit, 0);
    
    // Average trade metrics
    const avgWin = winningTrades.length > 0 ? totalWinAmount / winningTrades.length : 0;
    const avgLoss = losingTrades.length > 0 ? Math.abs(totalLossAmount / losingTrades.length) : 0;
    
    // Profit factor
    const profitFactor = Math.abs(totalLossAmount) > 0 ? totalWinAmount / Math.abs(totalLossAmount) : winningTrades.length > 0 ? Infinity : 0;
    
    // Return on investment (ROI)
    const roi = (totalProfit / INITIAL_BALANCE) * 100;
    
    // Challenge status
    let challengeStatus = "In Progress";
    let remainingAmount = challengeTarget - currentBalance;
    
    if (challengePhase === 1 && currentBalance >= PHASE1_TARGET) {
      challengeStatus = "Phase 1 Complete";
      remainingAmount = 0;
    } else if (challengePhase === 2 && currentBalance >= PHASE2_TARGET) {
      challengeStatus = "Challenge Complete - Funded!";
      remainingAmount = 0;
    }
    
    // Calculate daily drawdown (mock calculation for demo)
    const dailyDrawdown = -1.2; // This would normally be calculated from the day's trades
    
    return {
      closedTrades,
      winningTrades,
      losingTrades,
      totalProfit,
      winRate,
      avgWin,
      avgLoss,
      profitFactor,
      roi,
      currentBalance,
      challengeTarget,
      progressPercentage,
      challengeStatus,
      remainingAmount,
      dailyDrawdown
    };
  }, [trades, challengePhase, INITIAL_BALANCE, PHASE1_TARGET, PHASE2_TARGET]);
  
  // Automatically update challenge phase if target reached
  React.useEffect(() => {
    if (challengePhase === 1 && tradingStats.currentBalance >= PHASE1_TARGET) {
      setChallengePhase(2);
    }
  }, [tradingStats.currentBalance, challengePhase, PHASE1_TARGET]);
  
  // Get days in month for calendar
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Format date for comparison
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  // Check if date has trades
  const hasTradesOnDate = (date) => {
    const formattedDate = formatDate(date);
    return trades.some(trade => trade.date === formattedDate);
  };
  
  // Get trades for a specific date
  const getTradesForDate = (date) => {
    const formattedDate = formatDate(date);
    // Get unique trades for the date by using a Map
    const uniqueTrades = Array.from(
      new Map(
        trades
          .filter(trade => trade.date === formattedDate)
          .map(trade => [trade.id, trade])
      ).values()
    );
    return uniqueTrades;
  };
  
  // Get profit for a specific date
  const getProfitForDate = (date) => {
    const formattedDate = formatDate(date);
    // Make sure we only count each trade once by using unique IDs
    const uniqueTrades = Array.from(
      new Map(
        trades
          .filter(trade => trade.date === formattedDate && trade.status === 'closed')
          .map(trade => [trade.id, trade])
      ).values()
    );
    return uniqueTrades.reduce((sum, trade) => sum + trade.profit, 0);
  };
  
  // Handle date selection
  const handleDateClick = (day) => {
    const newSelectedDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(newSelectedDate);
  };
  
  // Generate calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDayOfMonth = getFirstDayOfMonth(selectedYear, selectedMonth);
    
    const days = [];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Week days header
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Create empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    
    // Create cells for days in month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const isToday = day === currentDay && selectedMonth === currentMonth && selectedYear === currentYear;
      const isSelected = day === selectedDate.getDate() && selectedMonth === selectedDate.getMonth() && selectedYear === selectedDate.getFullYear();
      const hasTrades = hasTradesOnDate(date);
      const dayProfit = hasTrades ? getProfitForDate(date) : 0;
      const isProfitDay = dayProfit > 0;
      const isLossDay = dayProfit < 0;
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`day 
            ${isToday ? 'today' : ''} 
            ${isSelected ? 'selected' : ''} 
            ${hasTrades ? 'has-trades' : ''} 
            ${isProfitDay ? 'profit-day' : ''} 
            ${isLossDay ? 'loss-day' : ''}`
          }
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasTrades && (
            <div className="trade-indicator">
              {dayProfit !== 0 && (
                <span className={`day-profit ${isProfitDay ? 'positive' : 'negative'}`}>
                  {dayProfit > 0 ? '+' : ''}${dayProfit.toFixed(0)}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="month-selector">
            <button 
              onClick={() => setSelectedMonth(prev => prev === 0 ? 11 : prev - 1)} 
              className="month-nav"
            >
              &lt;
            </button>
            <h3>{monthNames[selectedMonth]} {selectedYear}</h3>
            <button 
              onClick={() => setSelectedMonth(prev => prev === 11 ? 0 : prev + 1)} 
              className="month-nav"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="weekdays">
          {weekDays.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="days-grid">
          {days}
        </div>
      </div>
    );
  };
  
  // Selected date trades - ensure we get unique trades
  const selectedDateTrades = getTradesForDate(selectedDate);
  
  // Get unique trade count for display
  const uniqueTradeCount = Array.from(new Map(trades.map(trade => [trade.id, trade])).values()).length;
  
  return (
    <div className="trading-journal-container">
      <header className="page-header">
        <h1>Trading Journal</h1>
        <p>Track trades, analyse performance, and improve strategy</p>
      </header>
      
      <div className="trading-dashboard">
        {/* Challenge Progress Section */}
        <section className="challenge-progress">
          <div className="challenge-header">
            <div className="phase-badge">
              <BadgeIcon />
              <span>Phase {challengePhase}</span>
            </div>
            <h2>Prop Firm Challenge</h2>
            <div className="target-info">
              <TargetIcon />
              <span>Target: ${challengePhase === 1 ? PHASE1_TARGET : PHASE2_TARGET}</span>
            </div>
          </div>
          
          <div className="progress-container">
            <div className="progress-info">
              <div className="challenge-status">{tradingStats.challengeStatus}</div>
              <div className="balance-display">
                ${tradingStats.currentBalance.toFixed(2)}
                <span className="balance-change">
                  {tradingStats.totalProfit >= 0 ? '+' : ''}${tradingStats.totalProfit.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${tradingStats.progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="progress-details">
              <div className="progress-percentage">{tradingStats.progressPercentage.toFixed(1)}% Complete</div>
              {tradingStats.remainingAmount > 0 && (
                <div className="progress-remaining">${tradingStats.remainingAmount.toFixed(2)} to {challengePhase === 1 ? 'Phase 2' : 'Funding'}</div>
              )}
            </div>
          </div>
          
          <div className="challenge-metrics">
            <div className="metric-item">
              <div className="metric-label">Daily Drawdown</div>
              <div className={`metric-value ${tradingStats.dailyDrawdown < 0 ? 'negative' : ''}`}>
                {tradingStats.dailyDrawdown}%
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Max Drawdown Limit</div>
              <div className="metric-value">-5%</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Profit Target</div>
              <div className="metric-value">10%</div>
            </div>
            {challengePhase === 2 && (
              <div className="metric-item">
                <div className="metric-label">Next Payout</div>
                <div className="metric-value">14 days</div>
              </div>
            )}
          </div>
        </section>
        
        {/* Performance Stats */}
        <section className="performance-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Win Rate</h3>
              <div className="stat-value">{tradingStats.winRate.toFixed(1)}%</div>
            </div>
            <div className="stat-card">
              <h3>Total P&L</h3>
              <div className={`stat-value ${tradingStats.totalProfit >= 0 ? 'positive' : 'negative'}`}>
                ${Math.abs(tradingStats.totalProfit).toFixed(2)}
              </div>
            </div>
            <div className="stat-card">
              <h3>Total Trades</h3>
              <div className="stat-value">{uniqueTradeCount}</div>
            </div>
            <div className="stat-card">
              <h3>Open Positions</h3>
              <div className="stat-value">
                {Array.from(
                  new Map(
                    trades
                      .filter(t => t.status === 'open')
                      .map(trade => [trade.id, trade])
                  ).values()
                ).length}
              </div>
            </div>
          </div>
        </section>
        
        {/* Calendar and Trades View */}
        <div className="journal-layout">
          <section className="calendar-section">
            <h2>Trading Calendar</h2>
            {renderCalendar()}
          </section>
          
          <section className="trades-section">
            <h2>
              {selectedDateTrades.length > 0 
                ? `Trades for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` 
                : 'Recent Trades'}
            </h2>
            
            <div className="trades-list">
              {(selectedDateTrades.length > 0 ? selectedDateTrades : Array.from(new Map(trades.slice(0, 3).map(trade => [trade.id, trade])).values())).map(trade => (
                <div key={trade.id} className="trade-card">
                  <div className="trade-header">
                    <div className="trade-symbol">{trade.symbol}</div>
                    <div className={`trade-type ${trade.type.toLowerCase()}`}>{trade.type}</div>
                  </div>
                  
                  <div className="trade-details">
                    <div className="trade-data">
                      <div className="data-row">
                        <span className="label">Entry:</span>
                        <span className="value">${trade.entryPrice.toFixed(2)}</span>
                      </div>
                      <div className="data-row">
                        <span className="label">Exit:</span>
                        <span className="value">{trade.exitPrice ? `$${trade.exitPrice.toFixed(2)}` : 'Open'}</span>
                      </div>
                      <div className="data-row">
                        <span className="label">Quantity:</span>
                        <span className="value">{trade.quantity}</span>
                      </div>
                    </div>
                    
                    <div className="trade-results">
                      {trade.status === 'closed' ? (
                        <>
                          <div className={`profit-amount ${trade.profit >= 0 ? 'positive' : 'negative'}`}>
                            {trade.profit >= 0 ? '+' : '-'}${Math.abs(trade.profit).toFixed(2)}
                          </div>
                          <div className={`profit-percentage ${trade.profit >= 0 ? 'positive' : 'negative'}`}>
                            {trade.profit >= 0 ? '+' : '-'}{Math.abs(trade.profitPercentage).toFixed(2)}%
                          </div>
                          <div className="trade-indicator-icon">
                            {trade.profit >= 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                          </div>
                        </>
                      ) : (
                        <div className="open-position">
                          Currently Open
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {trade.notes && (
                    <div className="trade-notes">
                      <div className="notes-header">Notes:</div>
                      <p>{trade.notes}</p>
                    </div>
                  )}
                  
                  {trade.tags && trade.tags.length > 0 && (
                    <div className="trade-tags">
                      {trade.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  
                  <div className="trade-actions">
                    <button className="action-btn">
                      <FileIcon /> Notes
                    </button>
                    <button className="action-btn">
                      <ChartIcon /> Chart
                    </button>
                  </div>
                </div>
              ))}
              
              {selectedDateTrades.length === 0 && (
                <div className="add-trade-card">
                  <div className="add-icon">
                    <PlusIcon />
                  </div>
                  <p>Add New Trade</p>
                </div>
              )}
              
              {selectedDateTrades.length > 0 && (
                <div className="trade-actions-row">
                  <button className="primary-btn">
                    <PlusIcon /> Add Trade for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TradingJournal;