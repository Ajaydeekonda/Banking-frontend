// Add.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [formData, setFormData] = useState({
    holder: '',     
    bank: '',        
    accountno: '',   
    branch: '',      
    ifsc: ''         
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banks/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/bank-details');
      } else {
        console.error('Failed to add bank details');
      }
    } catch (error) {
      console.error('Error adding bank details:', error);
    }
  };

  const handleCancel = () => {
    navigate('/bank-details');
  };

  return (
    <form onSubmit={handleSubmit} className="add-bank-form">
      <div className="form-group">
        <label>Account Holder Name</label>
        <input
          type="text"
          name="holder"  
          value={formData.holder}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Bank Name</label>
        <input
          type="text"
          name="bank"   
          value={formData.bank}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Account Number</label>
        <input
          type="text"
          name="accountno"   
          value={formData.accountno}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Branch Name</label>
        <input
          type="text"
          name="branch"   
          value={formData.branch}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>IFSC Code</label>
        <input
          type="text"
          name="ifsc"
          value={formData.ifsc}
          onChange={handleChange}
        />
      </div>
      <div className="form-btns">
        <button type="submit" className="submit-btn">Confirm</button>
        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default Add;
