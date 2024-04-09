// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Col, Row, Container, Form, Button } from 'react-bootstrap';
// import '../styles/Login.css'; // Make sure you have this CSS file for styling
// import Navbarback from '../components/Navbarback'; // Ensure this component exists for your navbar

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Placeholder: Implement your login logic here (e.g., API call)
//     console.log('Login attempt:', { email, password });
    
//     // Simulate an API call
//     setTimeout(() => {
//       // Assuming login is successful
//       console.log('Login successful');
//       navigate('/dashboard'); // Adjust as needed for your project's route
//     }, 1000);
//   };

//   return (
//     <>
//       <Navbarback />
//       <Container className="mt-5">
//         <Row className="justify-content-center">
//           <Col md={6}>
//             <Form onSubmit={handleSubmit} className="form-container">
//               <h2 className="text-center mb-4">Login</h2>
//               {error && <div className="alert alert-danger">{error}</div>}
//               <Form.Group controlId="formBasicEmail" className="mb-3">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formBasicPassword" className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </Form.Group>
//               <div className="d-grid">
//                 <Button variant="primary" type="submit">
//                   Sign In
//                 </Button>
//               </div>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Login;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Col, Row, Container, Form, Button } from 'react-bootstrap';
// import '../styles/Login.css'; // Ensure this file exists and contains your CSS
// import Navbarback from '../components/Navbarback'; // Update as per your project structure
// import loginVector from '../assets/login-vector.svg'; // Ensure this asset exists

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login attempt:', { email, password });
//     // Placeholder: Replace with actual login logic
//     navigate('/dashboard'); // Adjust according to your routing
//   };

//   return (
//     <>
//       <Navbarback />
//       <Container className="login-container">
//         <Row className="justify-content-center align-items-center">
//           <Col md={6} className="login-form">
//             <Form onSubmit={handleSubmit}>
//               <h2 className="animate-character">Login</h2>
//               {error && <p className="text-danger">{error}</p>}
//               <Form.Group controlId="formBasicEmail">
//                 <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
//               </Form.Group>
//               <Form.Group controlId="formBasicPassword" className="mt-3">
//                 <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//               </Form.Group>
//               <Button variant="primary" type="submit" className="mt-3 w-100">Sign In</Button>
//             </Form>
//           </Col>
//           <Col md={6}>
//             <img src={loginVector} alt="Login" className="img-fluid"/>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Login;
// login.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { Col, Row, Container, Form, Button, Alert } from 'react-bootstrap';
// import { auth } from '../firebase-config'; // Make sure this is the correct path to your firebase-config
// import Navbarback from '../components/Navbarback';
// import '../styles/Login.css'; // Verify this path matches your CSS file's location
// import loginVector from '../assets/login-vector.svg'; // Verify this path matches your asset's location

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('/dashboard'); // Adjust according to your app's routing
//     } catch (error) {
//       if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
//         setError('Incorrect email or password. Please try again or register.');
//       } else {
//         setError('Failed to login. Please try again.');
//       }
//     }
//   };

//   return (
//     <>
//       <Navbarback />
//       <Container className="login-container">
//         <Row className="justify-content-center align-items-center">
//           <Col md={6} className="login-form">
//             <Form onSubmit={handleSubmit}>
//               <h2 className="animate-character">Login</h2>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form.Group controlId="formBasicEmail" className="mb-3">
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formBasicPassword" className="mb-3">
//                 <Form.Control
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit" className="w-100">Sign In</Button>
//             </Form>
//           </Col>
//           <Col md={6}>
//             <img src={loginVector} alt="Login" className="img-fluid" />
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Col, Row, Container, Form, Button, Alert } from 'react-bootstrap';
import { auth } from '../firebase-config'; // Ensure this is the correct path to your firebase-config
import Navbarback from '../components/Navbarback';
import '../styles/Login.css'; // Verify this path matches your CSS file's location
import loginVector from '../assets/login-vector.svg'; // Verify this path matches your asset's location

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage('You have successfully logged in. Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000); // Adjust according to your app's routing
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found. Redirecting to registration...');
        setTimeout(() => navigate('/register'), 2000); // Adjust '/register' as per your routing setup
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Failed to login. Please try again.');
      }
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


