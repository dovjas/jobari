import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import { auth } from '../../configs/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import './AuthModal.css';
import { setUserId } from "firebase/analytics";

const AuthModal = () => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  
  //Track authentication state
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      setUser(user);
      if(user){
          // Redirect to dashboard if user is already logged in
          navigate('/dashboard');
      }
    });
    return () => unsubscribe();
  },[navigate]);


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
        navigate('/dashboard');
        // Handle successful login (e.g., redirect, show message)
        handleClose();
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
        // Handle successful registration (e.g., redirect, show message)
        handleClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async() =>{
    try{
      await signOut(auth);
      setUser(null) // Reset user state
      navigate('/');
    }catch(err){
      setError(err.message);
    };
  };

  return (
    <>
      <Nav className="ml-auto">
      { user ? (
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
        ) : (
        <Button variant="primary" onClick={handleShow}>
          Login / Register
        </Button>
        )}
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
