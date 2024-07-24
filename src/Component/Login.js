import React, { useState } from 'react';
import { auth } from './Firebase';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verifyMessage, setVerifyMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setVerifyMessage('');

    if (!email || !password) {
      setError('All fields are mandatory.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User has successfully logged in');

      if (!user.emailVerified) {
        setVerifyMessage('Please verify your email address.');
        sendVerificationEmail();
      } else {
        const token = await user.getIdToken();
        localStorage.setItem('userToken', token);
        navigate('/welcome');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setVerifyMessage('Verification email sent. Please check your email.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {verifyMessage && <Alert variant="info">{verifyMessage}</Alert>}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
            {verifyMessage && (
              <Button
                variant="secondary"
                className="w-100 mt-3"
                onClick={sendVerificationEmail}
              >
                Resend Verification Email
              </Button>
            )}
          </Form>
          <div className="text-center mt-3">
            <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
