import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Col, Row, Container, Form, Button, Alert } from 'react-bootstrap';
import { auth } from '../firebase-config';
import Navbarback from '../components/Navbarback';
import '../styles/Login.css';
import loginVector from '../assets/login-vector.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage('You have successfully logged in. Redirecting to dashboard...');
      setTimeout(() => navigate('/coloring-game'), 2000);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found. Redirecting to registration...');
        setTimeout(() => navigate('/register'), 2000);
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Failed to login. Please try again.');
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccessMessage('Successfully signed in with Google! Redirecting...');
      setTimeout(() => navigate('/coloring-game'), 2000);
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <>
      <Navbarback />
      <Container className="login-container">
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="login-form">
            <Form onSubmit={handleSubmit}>
              <h2 className="animate-character">Login</h2>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">Sign In</Button>
            </Form>
            <Button className="google-btn mt-3 w-100" onClick={handleGoogleSignIn}>
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                style={{ width: '20px', marginRight: '10px' }}
              /> 
              Sign in with Google
            </Button>
          </Col>
          <Col md={6}>
            <img src={loginVector} alt="Login" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;


