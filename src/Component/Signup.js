import React, {useState} from "react";
import { auth } from './Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if(!email || !password || !confirmPassword){
      setError('All fields are mandatory.');
      return;
    }
    if(password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User has successfully signed up");
      navigate('/login');

    } catch (error){
      setError(error.message);

    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
        <h2 className="text-center">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email-id</Form.Label>
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

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                placeholder="Confirm Password" 
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign up

            </Button>

        </Form>
         <div className="text-center mt-3">
            <span>Have an account? <Link to="/login">Login</Link></span>
          </div>
        </Col>
      </Row>
    </Container>
  );

};
export default Signup;