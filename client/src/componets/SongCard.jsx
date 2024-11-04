import React from 'react';
import '../css/SongCard.css';
import { AiFillStar } from 'react-icons/ai';


const SongCard = ({ coverImage, songName, artistName, releaseDate, rating }) => {
  return (
    <div className="song-card">
      <div
        className="cover-image"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>
      <div className="song-details">
        <h3 className="song-name">{songName}</h3>
        <p className="artist-name">{artistName}</p>
        <p className="release-date">Released: {releaseDate}</p>
        <div className="rating">
         ey
        </div>
        <button className="listen-button">Listen</button>
      </div>
    </div>
  );
};

export default SongCard;
