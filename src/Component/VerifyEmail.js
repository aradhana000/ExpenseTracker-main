import React, { useEffect, useState } from 'react';
import { auth } from './Firebase';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      user.reload().then(() => {
        if (user.emailVerified) {
          setMessage('Email successfully verified. Redirecting...');
          setTimeout(() => navigate('/welcome'), 3000);
        } else {
          setMessage('Please check your email for the verification link.');
        }
      }).catch(setError);
    }
  }, [navigate]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Email Verification</h2>
          {message && <Alert variant="info">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {!message && !error && (
            <Button variant="primary" onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyEmail;
