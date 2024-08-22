import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Your job search companion, helping you track and manage your applications with ease.</p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul>
              <li><a href="/features">email@email.com</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="social-links">
              <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12} className="text-center">
            <p>&copy; 2024 Jobari. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
