import React from 'react'
import SongCard from '../componets/SongCard';
import '../css/Songs.css'
const Songs = () => {
    return (
        <div className="artist-profile">
        <div className="profile-header">
          <span className="verified-badge">✔ Verified Artist</span>
          <h1 className="artist-name">Piyath Rajapakse</h1>
          <p className="monthly-listeners">158,181 monthly listeners</p>
        </div>
        <div className="profile-actions">
          <button className="play-button">▶ Play</button>
          <button className="follow-button">Follow</button>
          <button className="more-options">•••</button>
        </div>
  
        {/* Comment Section */}
        <div className="comment-section">
          <h2>Comments</h2>
          <div className="comment">
            <p><strong>User1:</strong> Great song, loved it!</p>
          </div>
          <div className="comment">
            <p><strong>User2:</strong> Amazing work, keep it up!</p>
          </div>
          
          {/* Comment Form */}
          <form className="comment-form">
            <input type="text" placeholder="Add a comment..." />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
      );
}

export default Songs