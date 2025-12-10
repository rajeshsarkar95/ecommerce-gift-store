import React, { useState } from 'react';

const UploadForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please select an image.');
      return;
    }
    console.log('Submitting Product Data:', { productName, price, oldPrice, category, imageFile });

    alert('Product submitted (check console for data).');
    setProductName('');
    setPrice('');
    setOldPrice('');
    setCategory('');
    setImageFile(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', maxWidth: '400px' }}>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Old Price (Optional)"
        value={oldPrice}
        onChange={(e) => setOldPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default UploadForm;