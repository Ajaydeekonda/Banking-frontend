import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main-container">
      <div className="button-container">
        <Link to="/register">
          <button className="auth-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="auth-button">Login</button>
        </Link>
        <Link to="/admin/users">
          <button className="auth-button">Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
