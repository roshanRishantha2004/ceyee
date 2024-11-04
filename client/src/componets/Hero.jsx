// Hero.js
import React from 'react';
import '../css/Hero.css'; // Import your CSS file

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>CeYee</h1>
        <p>Some compelling description goes here. Capture attention and convey your message.</p>
        <button className="hero-button">Learn More</button>
      </div>
    </section>
  );
};

export default Hero;
