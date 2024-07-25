import React, { useState, useEffect } from 'react';
import { auth } from './Firebase';
import { Form, Button, Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null); // State for editing
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        const token = await user.getIdToken();
        const response = await axios.get(
          `https://expense-tracker-cd557-default-rtdb.firebaseio.com/expenses.json?auth=${token}`
        );

        if (response.data) {
          const userExpenses = Object.entries(response.data)
            .filter(([_, exp]) => exp.userId === user.uid)
            .map(([id, exp]) => ({ id, ...exp }));
          setExpenses(userExpenses);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      setError('Please log in to add expenses.');
      return;
    }

    try {
      const token = await user.getIdToken();
      if (editingExpense) {
        // Update expense
        const updatedExpense = { amount, description, category, userId: user.uid };
        await axios.put(
          `https://expense-tracker-cd557-default-rtdb.firebaseio.com/expenses/${editingExpense.id}.json?auth=${token}`,
          updatedExpense
        );
        setExpenses(expenses.map(exp => (exp.id === editingExpense.id ? { ...exp, ...updatedExpense } : exp)));
        setEditingExpense(null); // Reset editing state
      } else {
        // Add new expense
        const newExpense = { amount, description, category, userId: user.uid };
        const response = await axios.post(
          `https://expense-tracker-cd557-default-rtdb.firebaseio.com/expenses.json?auth=${token}`,
          newExpense
        );
        setExpenses([...expenses, { id: response.data.name, ...newExpense }]);
      }

      setAmount('');
      setDescription('');
      setCategory('Food');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) {
      setError('Please log in to delete expenses.');
      return;
    }

    try {
      const token = await user.getIdToken();
      await axios.delete(
        `https://expense-tracker-cd557-default-rtdb.firebaseio.com/expenses/${id}.json?auth=${token}`
      );
      setExpenses(expenses.filter(exp => exp.id !== id));
      console.log('Expense successfully deleted');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Add Daily Expense</h2>
          {loading && <p>Loading...</p>}
          {error && <Alert variant="danger">{error}</Alert>}
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
              {editingExpense ? 'Update Expense' : 'Add Expense'}
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.amount}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleEdit(expense)} className="mr-2">Edit</Button>
                      <Button variant="danger" onClick={() => handleDelete(expense.id)}>Delete</Button>
                    </td>
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


