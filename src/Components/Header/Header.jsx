import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <>
      <nav className="shadow p-4 d-flex gap-4">
        <Link to="/home">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Signin</Link>
      </nav>
    </>
  );
};

export default Header;
