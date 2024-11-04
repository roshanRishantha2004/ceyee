import React, { useState, useEffect } from 'react'
import Navbar from '../componets/Navbar'
import Hero from '../componets/Hero'
import SongCard from '../componets/SongCard'
import '../css/Home.css'
import coverImg from '../images/cover.jpg'
export const Home = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/songs/get');
        const data = await response.json();
        console.log('Fetched data:', data.data.response);
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
        <h1>Popular Songs</h1>
        <div className="song-list">
          {value.length > 0 ? (
            value.map((song, index) => (
              <SongCard
                key={index}
                coverImage={song.song} // Use a fallback image if `coverImage` is missing
                artistName={song.artist}
                songName={song.songPath}
              />
            ))
          ) : (
            <p>No songs available</p> // Display a message when no data is available
          )}
        </div>
      </div>
    </>
  );

}
