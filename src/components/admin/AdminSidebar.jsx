import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    height: '100vh',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    display: 'block',
    padding: '10px 0',
    color: 'white',
    textDecoration: 'none',
    borderBottom: '1px solid #34495e'
  };

  return (
    <div style={sidebarStyle}>
      <h3>🔑 Admin Panel</h3>
      <nav>
        <Link to="/admin" style={linkStyle}>📊 Dashboard</Link>
        <Link to="/admin/products" style={linkStyle}>🛍️ Product Management</Link>
        <Link to="/admin/orders" style={linkStyle}>📦 Order Management</Link>
        <Link to="/admin/users" style={linkStyle}>🧑‍💻 User Management</Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;