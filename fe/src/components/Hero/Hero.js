import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaBriefcase, FaHandshake, FaBullseye } from 'react-icons/fa'; 
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <Container>
        <h1 className="hero-title">Land Your Dream Job</h1>
        <p className="hero-subtitle">
          Track your job applications and stay organized on your job search journey.
        </p>
        <Button variant="primary" href="/register">Get Started</Button>
        <div className="hero-icons">
          <div className="icon-wrapper">
            <FaBriefcase size={50} />
            <p>Apply for Jobs</p>
          </div>
          <div className="icon-wrapper">
            <FaHandshake size={50} />
            <p>Receive Offers</p>
          </div>
          <div className="icon-wrapper">
            <FaBullseye size={50} />
            <p>Achieve Your Goals</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
