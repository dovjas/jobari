import React, { useState } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import './AuthModal.css';

const AuthModal = () => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      <Nav className="ml-auto">
        <Button variant="primary" onClick={handleShow}>
          Login / Register
        </Button>
      </Nav>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <Form>
              <Form.Group controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button className="auth-button" variant="primary" type="submit" block>
                Login
              </Button>
            </Form>
          ) : (
            <Form>
              <Form.Group controlId="registerEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="registerConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>

              <Button className="auth-button" variant="primary" type="submit" block>
                Register
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleForm} block>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuthModal;
