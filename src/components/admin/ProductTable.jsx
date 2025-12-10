import React from 'react';

// Mock Data - In a real app, this would come from an API call
const mockProducts = [
  { id: 1, name: "Luxury T-Shirt", price: 29.99, category: "T-Shirt", image: "[Image path]" },
  { id: 2, name: "Winter Hoodie", price: 59.50, category: "Hoodie", image: "[Image path]" },
  { id: 3, name: "Coffee Mug", price: 12.00, category: "Mug", image: "[Image path]" },
];

const ProductTable = () => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #ccc' }}>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {mockProducts.map((product) => (
          <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.category}</td>
            <td></td>
            <td>
              <button>Edit</button> / <button style={{ color: 'red' }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;