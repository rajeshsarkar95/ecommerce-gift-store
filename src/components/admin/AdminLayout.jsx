import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  const layoutStyle = {
    display: 'flex',
    minHeight: '100vh'
  };

  const contentStyle = {
    flexGrow: 1,
    padding: '30px',
    backgroundColor: '#ecf0f1' 
  };

  return (
    <div style={layoutStyle}>
      <AdminSidebar />
      <main style={contentStyle}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;