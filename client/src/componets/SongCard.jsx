import React from 'react';
import '../css/SongCard.css';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
const SongCard = ({ id, coverImage, songName, artistName, description, songPath }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/songs', {
      state: {
        id: id,
        coverImage: coverImage,
        songName: songName,
        artistName: artistName,
        description: description,
        songPath: songPath
      }
    })
  }
  return (
    <div className="song-card">
      <div
        className="cover-image"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>
      <div className="song-details">
        <h3 className="song-name">{songName}</h3>
        <p className="artist-name">{artistName}</p>
        <p className="release-date">{description}</p>
        <div className="rating">
          <AiFillStar className="star-icon" />
        </div>
        <button
          className="listen-button"
          onClick={handleNavigate}>
          Listen
        </button>
      </div>
    </div>
  );
};

export default SongCard;
