import React, { useState } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import { auth } from '../../configs/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './AuthModal.css';

const AuthModal = () => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && password !== confirmPassword)) {
      setError('Please fill in all fields and ensure passwords match.');
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        // Handle successful login (e.g., redirect, show message)
        handleClose();
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // Handle successful registration (e.g., redirect, show message)
        handleClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

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
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="authEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="authPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {!isLogin && (
              <Form.Group controlId="authConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            {error && <p className="text-danger">{error}</p>}

            <Button className="auth-button" variant="primary" type="submit" block>
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Form>
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
