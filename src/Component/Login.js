import React, { useState } from 'react';
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All fields are mandatory.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User has successfully logged in');
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('userToken', token);
      history.push('/welcome');
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

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
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
