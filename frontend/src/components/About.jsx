import React, { useState, useEffect, useRef } from 'react';
import "../styles/About.css";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries; // Get the first entry
      setIsVisible(entry.isIntersecting); // Set state based on entry intersecting
    });

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <>
      <section id='About' ref={aboutRef} style={{ marginTop: "150px" }}>
        <div className='text-center mt-5'>
          <h1 className='mt-5 typing-effect animate-character'>ABOUT THE GAME</h1>
          {/* Conditionally apply the animate-text class based on visibility */}
          <div className={isVisible ? 'animate-text' : ''}>
            <p className='fade-effect lead gradient-text'>
              Welcome to the Map Coloring Game! The objective of this game is simple yet challenging: color the map using the fewest colors possible without having adjacent areas share the same color.
            </p>
            <p className='mt-4 fade-effect lead gradient-text'>
              Here's how you can play:
            </p>
            <ul className='fade-effect lead gradient-text'>
              <li>Select a region on the map to color it.</li>
              <li>Choose a color that has not been used by any adjacent region.</li>
              <li>Try to complete the map using the minimum number of colors.</li>
              <li>There's no time limit, so take your time to strategize!</li>
              <li>Once you're done, submit your solution to see if you've solved the puzzle with the least colors possible.</li>
            </ul>
            <p className='mt-4 fade-effect lead gradient-text'>
              This game is a fun way to exercise your problem-solving and logical thinking skills. It's based on the Four Color Theorem, a concept in mathematics that states that a minimum of four colors is sufficient to color any map in such a way that no two adjacent regions have the same color.
            </p>
            <p className='mt-4 fade-effect lead gradient-text'>
              So, are you ready to take on the challenge? Dive in and let's see how well you can do!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
