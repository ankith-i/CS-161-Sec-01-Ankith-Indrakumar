// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
// import { GoogleLogin } from 'react-google-login';
// import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'; // Make sure react-bootstrap-icons is installed
// import axios from 'axios'; // For demonstration; adjust according to your API calls

// // Replace these imports with the actual paths in your project
// import Navbarback from '../components/Navbarback';
// import '../styles/Register.css'; // Adjust the import path as needed

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }
//     // Implement your registration logic here, e.g., an API call
//     console.log('Registering user', formData);
//     // Placeholder for successful registration logic
//   };

//   const handleGoogleSuccess = async (response) => {
//     console.log('Google sign in success', response);
//     // Placeholder for your Google sign-in success logic
//   };

//   const handleGoogleFailure = (error) => {
//     console.error('Google Sign In was unsuccessful. Try again later.', error);
//     setError('Google Sign In was unsuccessful. Try again later.');
//   };

//   return (
//     <>
//       <Navbarback />
//       <Container className="register-container">
//         <Row className="justify-content-center align-items-center">
//           <Col md={6} className="form-section">
//             <Form className="register-form" onSubmit={handleSubmit}>
//               <h2 className="animate-character">Register</h2>
//               {error && <div className="alert alert-danger">{error}</div>}

//               {/* First Name Field */}
//               <Form.Group className="mb-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="First Name"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               {/* Last Name Field */}
//               <Form.Group className="mb-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="Last Name"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               {/* Email Field */}
//               <Form.Group className="mb-3">
//                 <Form.Control
//                   type="email"
//                   placeholder="Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               {/* Password Field */}
//               <Form.Group className="mb-3">
//                 <InputGroup>
//                   <FormControl
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                   <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <EyeSlashFill /> : <EyeFill />}
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>

//               {/* Confirm Password Field */}
//               <Form.Group className="mb-3">
//                 <InputGroup>
//                   <FormControl
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm Password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                   />
//                   <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                     {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>

//               <Button variant="primary" type="submit" className="w-100 mb-3">Register</Button>

//               <GoogleLogin
//                 clientId="1083183332182-vhaoiodb9tsemsnenjjskp5jd258g7j5.apps.googleusercontent.com" // Remember to replace with your actual client ID
//                 buttonText="Register with Google"
//                 onSuccess={handleGoogleSuccess}
//                 onFailure={handleGoogleFailure}
//                 cookiePolicy={'single_host_origin'}
//                 className="w-100 mt-3"
//               />
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Register;

// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from '../firebase-config'; // Adjust the path to your firebase-config.js
// import { GoogleLogin } from 'react-google-login';
// import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

// import Navbarback from '../components/Navbarback'; // Adjust the import path as needed
// import '../styles/Register.css'; // Adjust the import path as needed

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       // User registration successful, now add additional user details to Firestore
//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//       });
//       console.log('User registered with email:', userCredential.user.email);
//       // Redirect or clear form here as needed
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   // Implement handleGoogleSuccess and handleGoogleFailure as needed for Google Sign In

//   return (
//     <>
//       <Navbarback />
//       <Container className="register-container">
//         <Row className="justify-content-center align-items-center">
//           <Col md={6} className="form-section">
//             <Form className="register-form" onSubmit={handleSubmit}>
//               <h2 className="animate-character">Register</h2>
//               {error && <div className="alert alert-danger">{error}</div>}

//               {/* Form Fields */}
//               <Form.Group className="mb-3">
//                 <Form.Control type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Control type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <InputGroup>
//                   <FormControl type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
//                   <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <EyeSlashFill /> : <EyeFill />}
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <InputGroup>
//                   <FormControl type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
//                   <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                     {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>
//               <Button variant="primary" type="submit" className="w-100 mb-3">Register</Button>
              
//               {/* Google Login Placeholder */}
//               {/* Implement GoogleLogin component here as needed */}
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Register;

// registration.jsx
// registration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  const [success, setSuccess] = useState(false); // Add success state
  const navigate = useNavigate();

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
        lastName: formData.lastName,
      });
      setSuccess(true);
      // Redirect to login page after a short delay
      setTimeout(() => navigate('/login'), 2000); // Adjust '/login' as per your routing setup
    } catch (error) {
      setError(error.message);
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
              {success && <Alert variant="success">Registration successful! Redirecting to login...</Alert>}
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
                  <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
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
                  <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-3">Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;

