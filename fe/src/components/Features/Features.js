import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaClipboardList, FaChartLine, FaBell } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  return (
    <div className="features-section">
      <Container>
        <h2 className="features-title">Key Features</h2>
        <Row>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <FaClipboardList size={50} className="feature-icon" />
                <Card.Title>Track Applications</Card.Title>
                <Card.Text>
                  Keep a detailed record of all your job applications in one place.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <FaChartLine size={50} className="feature-icon" />
                <Card.Title>Analyze Progress</Card.Title>
                <Card.Text>
                  Monitor your job search performance with easy-to-read analytics.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <FaBell size={50} className="feature-icon" />
                <Card.Title>Get Notifications</Card.Title>
                <Card.Text>
                  Receive timely reminders and updates about your job applications.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Features;
