import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';
import BankDetails from './components/BankDetails'; 
import Add from './components/Add'; 
import Edit from './components/Edit';
import Confirm from './components/Confirm';
import Admin from "./components/Admin";
import UserBanks from './components/UserBanks';

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bank-details" element={<BankDetails />} /> 
        <Route path="/add" element={<Add />} /> 
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/confirm/:id" element={<Confirm />} />
        <Route path="/admin/users" element={<Admin/>} />
        <Route path='/admin/users/:id' element={<UserBanks/>}  />
      </Routes>
    </Router>
  );
}

export default App;
