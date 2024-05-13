import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase-config';
import Navbarback from '../components/Navbarback';
import '../styles/Register.css';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Google Sign-Up
  const handleGoogleSignUp = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess(true);
      setTimeout(() => navigate('/coloring-game'), 2000);
    } catch (error) {
      setError('Google sign-up failed. Please try again.');
    }
  };

  return (
    <>
      <Navbarback />
      <Container className="register-container">
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="form-section">
            <Form className="register-form" onSubmit={handleSubmit}>
              <h2 className="animate-character">Register</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">Registration successful! Redirecting...</Alert>}
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputGroup.Text onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                    {showPassword ? <EyeSlashFill size={20} /> : <EyeFill size={20} />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup>
                  <FormControl
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle">
                    {showConfirmPassword ? <EyeSlashFill size={20} /> : <EyeFill size={20} />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-3">Register</Button>
            </Form>
            <Button className="google-btn mt-3 w-100" onClick={handleGoogleSignUp}>
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                style={{ width: '20px', marginRight: '10px' }}
              /> 
              Register with Google
            </Button>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .password-toggle {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default Register;

