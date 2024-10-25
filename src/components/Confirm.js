import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Confirm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the bank id from the URL

  const handleDelete = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include Bearer token
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/bank-details'); // Redirect to bank details after deletion
      } else {
        console.error('Failed to delete the bank account');
      }
    } catch (error) {
      console.error('Error deleting the bank account:', error);
    }
  };

  return (
    <div className="confirm-container">
      <div className="confirm-box">
        <p>Are you sure you want to delete this bank account?</p>
        <div className="form-btns">
          <button className="confirm-btn" onClick={handleDelete}>Confirm</button>
          <button className="cancel-btn" onClick={() => navigate('/bank-details')}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
