import React, { useState } from 'react';
import { auth } from './Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Forgot Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            {loading && <Spinner animation="border" />}

            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
              Send Password Reset Email
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Button variant="link" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
