import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import UploadForm from '../../components/admin/UploadForm';
import ProductTable from '../../components/admin/ProductTable';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div style={{ padding: '20px' }}>
        <h2>📝 Product Management</h2>
        <div style={{ marginBottom: '40px' }}>
          <h3>Upload New Product</h3>
          <UploadForm />
        </div>
        <h3>Existing Products</h3>
        <ProductTable />
      </div>
    </AdminLayout>
  );
};
export default AdminDashboard;