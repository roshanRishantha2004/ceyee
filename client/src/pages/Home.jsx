import React, { useState, useEffect } from 'react';
import Navbar from '../componets/Navbar';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [artist, setArtist] = useState([]);
  const endPont = 'https://ceyee-backend2.vercel.app'

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${endPont}/api/v1/songs`);
        const data = await response.json();
        setValue(data.data.response); 
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    getData();
  }, []);

  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${endPont}/api/v1/artists`);
        const data = await response.json();
        console.log(data.data)
        setArtist(data.data); 
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    getData();
  }, []);
  return (
    <div className="home-page">
      <Navbar />
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to Ceyee</h1>
          <p>Your ultimate music destination</p>
          <button className="cta-button">Explore Music</button>
        </div>
      </section>

      {/* Featured Music Section */}
      <section className="featured-music">
        <h2>Featured Albums & Playlists</h2>
        
 <div className="music-items">
          {value.length > 0 ? (
            value.map((song, index) => (
             
          <div className="music-item">
            <img
              src={song.img}
              alt="Album 1"
              className="music-image"
            />
            <h3>{song.name}</h3>
            <p>{song.description}</p>
            <button
          className="listen-button" onClick={() => navigate('/songs', {
            state: {
              id: song._id,
              coverImage: song.img,
              songName: song.name,
              artistName: song.name,
              description: song.description,
              songPath: song.path
            }
          })}>
          Listen
        </button>
          </div>
          
            ))
          ) : (
            <p className="no-songs">No songs available</p>
          )}

        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="featured-artists">
        <h2>Featured Artists</h2>
        <div className="artists">
           {artist.length > 0 ? (
            artist.map((artist, index) => (
             <div>
              <img
              src={artist.imgUrl}
              alt="Artist 1"
              className="artist-image"
            />
            <h3>{artist.name}</h3>
            <p>{artist.description}</p>
          </div>
          
            ))
          ) : (
            <p className="no-songs">No songs available</p>
          )}

        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action">
        <h2>Join Ceyee Today</h2>
        <p>Start streaming your favorite music, discover new hits, and enjoy an amazing audio experience.</p>
        <button className="cta-button">Sign Up</button>
      </section>
    </div>
  );
};

export default HomePage;