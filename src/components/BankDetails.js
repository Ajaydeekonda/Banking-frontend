import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bank from './Bank'; // Import Bank component

const BankDetails = () => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);

  // Fetch the bank details from the backend (assuming an endpoint exists)
  useEffect(() => {
    const fetchBankDetails = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banks`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch bank details');
        }
        
        setBanks(data);
      } catch (err) {
        console.error('Error fetching bank details:', err);
       
      }
    };

    fetchBankDetails();
  }, []);

  return (
    <div className="bank-details-container">
      <button className="add-btn" onClick={() => navigate('/add')}>Add Bank</button>
      
      {banks.map((bank) => (
        <Bank key={bank._id} bank={bank} />  
      ))}
    </div>
  );
};

export default BankDetails;
