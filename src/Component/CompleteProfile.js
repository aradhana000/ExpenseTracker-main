import React, { useState, useEffect } from 'react';
import { auth } from './Firebase';
import { updateProfile } from 'firebase/auth';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompleteProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError('No user is currently logged in.');
          return;
        }

        const token = await user.getIdToken();
        const response = await axios.get(
          `https://expense-tracker-cd557-default-rtdb.firebaseio.com/expense.json?auth=${token}`
        );

        const userData = Object.values(response.data).find(data => data.userId === user.uid);

        if (userData) {
          setDisplayName(userData.displayName);
          setPhotoURL(userData.photoURL);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    const user = auth.currentUser;
    if (!user) {
      setError('No user is currently logged in.');
      return;
    }

    try {
      await updateProfile(user, { displayName, photoURL });
      console.log('Profile updated successfully');

      await axios.post('https://expense-tracker-cd557-default-rtdb.firebaseio.com/expense.json', {
        userId: user.uid,
        displayName,
        photoURL
      });

      navigate('/welcome');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Complete Your Profile</h2>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formDisplayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control 
                type="text" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
                required 
                placeholder="Enter your display name" 
              />
            </Form.Group>

            <Form.Group controlId="formPhotoURL">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control 
                type="text" 
                value={photoURL} 
                onChange={(e) => setPhotoURL(e.target.value)} 
                placeholder="Enter URL for your profile picture" 
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CompleteProfile;

