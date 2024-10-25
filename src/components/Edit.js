import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    holder: '',
    bank: '',
    accountno: '',
    branch: '',
    ifsc: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banks/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bank details');
        }

        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching bank details:', error);
        setError('Could not fetch bank details. Please try again later.');
      }
    };

    fetchBankDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banks/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Include Bearer token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update bank details');
      }

      navigate('/bank-details');
    } catch (error) {
      console.error('Error updating bank details:', error);
      setError('Could not update bank details. Please try again later.');
    }
  };

  const handleCancel = () => {
    navigate('/bank-details');
  };

  return (
    <form onSubmit={handleSubmit} className="edit-bank-form">
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label>Account Holder Name</label>
        <input
          type="text"
          name="holder"
          value={formData.holder}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Bank Name</label>
        <input
          type="text"
          name="bank"
          value={formData.bank}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Account Number</label>
        <input
          type="text"
          name="accountno"
          value={formData.accountno}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Branch Name</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>IFSC Code</label>
        <input
          type="text"
          name="ifsc"
          value={formData.ifsc}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Update</button>
      <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default Edit;
