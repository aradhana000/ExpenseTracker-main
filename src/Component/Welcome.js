import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';

const Welcome = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6} className="text-center">
          <h2>Welcome to Expense Tracker</h2>
          <p>Your profile is incomplete. Please complete your profile to access all features.</p>
          <Link to="/complete-profile">
            <Button variant="primary">Complete Profile</Button>
          </Link>
          <ExpenseForm/>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
