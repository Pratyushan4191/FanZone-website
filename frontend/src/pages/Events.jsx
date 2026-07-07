import React, { useState, useEffect } from 'react';

export default function Events({ showToast }) {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  // Fetch events from backend API
  const fetchEvents = () => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        // Sort by date ascending
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sorted);
      })
      .catch(e => console.error("Error loading events:", e));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventName.trim() || !eventDate) {
      showToast("Please enter an event name and choose a date!");
      return;
    }

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: eventName, date: eventDate })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add event");
        return res.json();
      })
      .then(newEvent => {
        showToast(`Successfully scheduled "${newEvent.name}"!`);
        setEventName('');
        setEventDate('');
        fetchEvents(); // Reload and sort
      })
      .catch(err => {
        console.error("Error adding event:", err);
        showToast("Error creating event. Please try again.");
      });
  };

  return (
    <div id="main">
      <div className="events-dashboard">
        <div className="events-calendar-card">
          <h2><i className="fas fa-calendar-alt" style={{ marginRight: '10px' }}></i> FanZone Community Calendar</h2>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '25px', lineHeight: 1.5 }}>
            Schedule and search upcoming events like viewing parties, game streams, concert meetups, and anime releases. Add your own event to notify the community dashboard!
          </p>

          <form className="events-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Event Title (e.g. Fortnite Custom Lobbies)"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <input 
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-plus" style={{ marginRight: '8px' }}></i> Add Event
            </button>
          </form>

          <div className="events-list">
            {events.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
                No community events scheduled. Be the first to add one!
              </p>
            ) : (
              events.map((event) => {
                const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <div key={event.id} className="event-item">
                    <div className="event-details">
                      <i className="fas fa-calendar-check event-icon"></i>
                      <div>
                        <span className="event-name">{event.name}</span>
                      </div>
                    </div>
                    <span className="event-date">
                      <i className="far fa-clock" style={{ marginRight: '6px' }}></i> {formattedDate}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
