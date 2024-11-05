// Home.js
import React, { useState, useEffect } from 'react';
import Navbar from '../componets/Navbar';
import Hero from '../componets/Hero';
import SongCard from '../componets/SongCard';
import Footer from '../componets/Footer.jsx';
import '../css/Home.css';

export const Home = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/songs');
        const data = await response.json();
        setValue(data.data.response); 
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <div className="home">
        <div className="update-banner">
          <p>🎉 Check out our latest updates and new features!</p>
        </div>
        <h1 className="section-title">Popular Songs</h1>
        <div className="song-list">
          {value.length > 0 ? (
            value.map((song, index) => (
              <SongCard
                key={index}
                id={song._id}
                coverImage={song.img || 'default-image-url.jpg'}
                artistName={song.artist?.name || 'Unknown Artist'}
                artistImage={song.artist?.imgUrl || 'default-artist-image.jpg'}
                songName={song.songPath}
                description={song.description}
                songPath={song.path}
              />
            ))
          ) : (
            <p className="no-songs">No songs available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
