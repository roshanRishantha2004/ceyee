import React from 'react';
import '../css/AboutUs.css';
import Navbar from '../componets/Navbar';
import cover from '../images/cover.jpg'
const AboutUs = () => {
    return (
        <>

        <Navbar />
        <div className="about-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Ceyee</h1>
          <p>Your Ultimate Destination for Music Streaming</p>
        </div>
      </section>
      
      <section className="company-mission">
        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>
            At Ceyee, we're more than just a music streaming platform — we're a
            community built around the belief that music connects us all. Our goal is to provide
            high-quality music, personalized playlists, and an experience that fits your life,
            wherever you are.
          </p>
        </div>
        <div className="mission-image">
          <img
            src={cover}
            alt="Ceyee Music Streaming"
          />
        </div>
      </section>
      
      <section className="features">
        <h2>Why Choose Ceyee?</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Personalized Playlists</h3>
            <p>Discover new music tailored to your taste with our smart algorithm.</p>
          </div>
          <div className="feature-item">
            <h3>Endless Music Library</h3>
            <p>Access millions of songs from all genres, from classics to the latest hits.</p>
          </div>
          <div className="feature-item">
            <h3>High-Quality Audio</h3>
            <p>Stream music in the highest quality possible, so you never miss a beat.</p>
          </div>
        </div>
      </section>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Ceyee was founded by a group of passionate music lovers who wanted to create
          a platform that does more than just play songs. We wanted a place where
          people could discover music that resonates with them — music that inspires,
          energizes, and brings joy. Every playlist, every recommendation, every
          song you hear on Ceyee is carefully curated to enhance your listening
          experience. Our goal is to build the most intuitive, fun, and music-filled
          experience for everyone, from casual listeners to audiophiles.
        </p>
      </section>

      <section className="call-to-action">
        <h2>Join the Ceyee Movement</h2>
        <p>Sign up now and start your musical journey with Ceyee.</p>
        <button className="cta-button">Get Started</button>
      </section>
    </div>
        </>
    );
};

export default AboutUs;
