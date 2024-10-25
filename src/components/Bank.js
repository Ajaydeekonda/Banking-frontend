import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bank = ({ bank }) => {
  const navigate = useNavigate();

  return (
    <div className="bank-container">
      <div className="bank-info">
        <p><strong>Name:</strong> {bank.holder}</p>
        <p><strong>Bank:</strong> {bank.bank}</p>
        <p><strong>Account NO:</strong> {bank.accountno}</p>
        <p><strong>Branch Name:</strong> {bank.branch}</p>
        <p><strong>IFSC:</strong> {bank.ifsc}</p>
      </div>
      
      <div className="action-icons">
        <div className="action-button-container">
          <button className="delete-icon" onClick={() => navigate(`/confirm/${bank._id}`)}>🗑️</button>
          <button className="edit-icon" onClick={() => navigate(`/edit/${bank._id}`)}>✏️</button>
        </div>
      </div>
    </div>
  );
};

export default Bank;
