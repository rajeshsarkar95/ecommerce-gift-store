import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/admin/FlashDealsTable.css';

const API_URL = 'https://onlinegiftbackend.onrender.com/api/hoodies';

const emptyProduct = {
  title: '',
  price: '',
  category: 'hoodies',
  image: null, 
  _id: null,
};

function HoodieTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [formData, setFormData] = useState(emptyProduct);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const token = localStorage.getItem("adminToken");

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data?.data || []);
    } catch (err) {
      setError('Failed to load hoodie products.',err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddClick = () => {
    setFormData(emptyProduct);
    setSelectedImageFile(null);
    setModalAction('add');
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setFormData({
      _id: product._id,
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image, 
    });
    setSelectedImageFile(null);
    setModalAction('edit');
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files?.length) {
      setSelectedImageFile(files[0]);
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const method = modalAction === 'add' ? 'post' : 'put';
    const url =
      modalAction === 'add'
        ? API_URL
        : `${API_URL}/${formData._id}`;

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('price', formData.price);
    formPayload.append('category', formData.category);

    if (selectedImageFile) {
      formPayload.append('image', selectedImageFile);
    }

    if (modalAction === 'add' && !selectedImageFile) {
      setError('Please select an image.');
      setIsLoading(false);
      return;
    }

    try {
      await axios({
        method,
        url,
        data: formPayload,
        headers: { 'Content-Type': 'multipart/form-data', Authorization:`Bearer ${token}` },
      });

      setIsModalOpen(false);
      setSelectedImageFile(null);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;

    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`,
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch {
      setError('Failed to delete product.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && products.length === 0) {
    return <div className="loading-message">Loading hoodie products...</div>;
  }

  return (
    <div className="flash-deal-container">
      <div className="admin-header">
        <h2> Hoodie Collection Management</h2>
        <button onClick={handleAddClick} className="add-btn">
          + ADD NEW HOODIE
        </button>
      </div>

      {error && <div className="error-message admin-error">{error}</div>}

      {products.length === 0 && !isLoading ? (
        <div className="no-data-message">No hoodie products found.</div>
      ) : (
        <table className="flash-deal-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image?.url}
                    alt={product.title}
                    className="deal-image"
                  />
                </td>
                <td>{product.title}</td>
                <td className="price-new">₹{product.price}</td>
                <td>{product.category}</td>
                <td className="action-buttons">
                  <button onClick={() => handleEditClick(product)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product._id, product.title)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalAction === 'add' ? 'Create New Hoodie' : `Edit Hoodie`}</h3>
            <hr />

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input name="price" value={formData.price} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input value={formData.category} readOnly disabled />
              </div>

              <div className="form-group">
                <label>Upload Image</label>
                <input type="file" name="image" accept="image/*" onChange={handleChange} />
                {modalAction === 'edit' && formData.image?.url && (
                  <small>
                    Current Image:{' '}
                    <a href={formData.image.url} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </small>
                )}
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  {modalAction === 'add' ? 'Create Hoodie' : 'Save Changes'}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>

            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HoodieTable;
