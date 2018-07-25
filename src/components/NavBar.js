import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navi">
      <NavLink
        style={{ marginRight: '10px' }}
        to="/forecast"
      >
        Forecast
      </NavLink>
      <NavLink
        style={{ marginRight: '10px' }}
        to="/login"
      >
        Log In
      </NavLink>
      <NavLink
        style={{ marginRight: '10px' }}
        to="/signup"
      >
        Sign Up
      </NavLink>
    </div>
  );
}

export default NavBar;
