import React, { useState, useEffect } from 'react';
import SongCard from '../componets/SongCard';
import '../css/Songs.css';
import Navbar from '../componets/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Songs = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const [listenCount, setListenCount] = useState(0);

  const { id, coverImage, songName, artistName, description, songPath } = location.state;

  const artistDetails = {
    coverImage: coverImage,  
    artistName: artistName,
    songName: songName,
    songPath: songPath,  
    monthlyListeners: listenCount,
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/comments?q=${id}`);
       const fetchedComments = response.data.data.map(comment => ({ user: 'User', text: comment.comment }));
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);

  const handleListenCount = () => {
    setListenCount((prevCount) => prevCount + 1);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        await axios.post('http://localhost:8000/api/v1/comments', {
          comment,
          song: id,
        });
        setComments([...comments, { user: 'You', text: comment }]);
        setComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <div className="artist-profile">
      <div className="profile-header">
        <Navbar />
        <div
          className="cover-image"
          style={{ backgroundImage: `url(${artistDetails.coverImage})` }}
        ></div>
        <div className="profile-info">
          <span className="verified-badge">✔ Verified Artist</span>
          <h1 className="artist-name">{artistDetails.artistName}</h1>
          <p className="monthly-listeners">{artistDetails.monthlyListeners} monthly listeners</p>
        </div>
      </div>

      <div className="profile-actions" onClick={handleListenCount}>
        <audio controls className="audio-player">
          <source src={artistDetails.songPath} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className="song-info">
        <h2>{artistDetails.songName}</h2>
        <p>{description}</p>
        <p>Listen Count: {listenCount}</p>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h2>Comments</h2>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <p><strong>{comment.user}:</strong> {comment.text}</p>
          </div>
        ))}

        {/* Comment Form */}
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentChange}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default Songs;
