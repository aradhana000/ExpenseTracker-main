import React, { useState, useEffect } from 'react';
import { auth } from './Firebase';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { amount, description, category };
    setExpenses([...expenses, newExpense]);
    setAmount('');
    setDescription('');
    setCategory('Food');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Add Daily Expense</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="Enter amount"
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option>Food</option>
                <option>Petrol</option>
                <option>Salary</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Add Expense
            </Button>
          </Form>

          <h3 className="text-center mt-4">Expenses</h3>
          {expenses.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.amount}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No expenses added yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseForm;



