import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/admin/FlashDealsTable.css';

const API_URL = 'https://onlinegiftbackend.onrender.com/api/featuredproducts';

const emptyProduct = {
  name: '',
  price: 0,
  oldprice: 0,
  image: '',
  _id: null,
};

function FeaturedProductTable() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [formData, setFormData] = useState(emptyProduct);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const token = localStorage.getItem("adminToken");

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(API_URL);
      const apiData = res.data;
      let productsArray = Array.isArray(apiData.products) ? apiData.products : [];
      productsArray = productsArray.map((item, index) => ({
        _id: item._id || index,
        name: item.name || item.title || "",
        price: Number(item.price || item.newPrice || 0),
        oldprice: Number(item.oldprice || item.oldPrice || 0),
        image: item.image || item.images || ""
      }));
      setProducts(productsArray);
    } catch (err) {
      console.error("Failed to fetch featured products:", err);
      setError("Failed to fetch featured products. Check server.");
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
      ...product,
      price: product.price || 0,
      oldprice: product.oldprice || 0,
      image: product.image || '',
    });
    setSelectedImageFile(null);
    setModalAction("edit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleContentClick = (e) => e.stopPropagation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files.length > 0) {
      setSelectedImageFile(files[0]);
      return;
    }

    setFormData(prevData => {
      const newValue = (name === 'price' || name === 'oldprice') ? parseFloat(value) || 0 : value;
      return {
        ...prevData,
        [name]: newValue
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const method = modalAction === "add" ? "post" : "put";
    const url = modalAction === "add"
      ? API_URL
      : `${API_URL}/${formData._id}`;

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("price", String(formData.price));
    dataToSend.append("oldprice", String(formData.oldprice));

    if (selectedImageFile) {
      dataToSend.append("image", selectedImageFile);
    } else if (modalAction === "edit" && formData.image) {
      dataToSend.append("existingImage", formData.image);
    }

    if (modalAction === "add" && !selectedImageFile) {
      setError("Please select an image file to upload for the product.");
      setIsLoading(false);
      return;
    }

    try {
      await axios({
        method: method,
        url: url,
        data: dataToSend,
        headers: { 'Content-Type': 'multipart/form-data', Authorization:`Bearer ${token}` },
      });

      setIsModalOpen(false);
      setSelectedImageFile(null);
      fetchProducts();
    } catch (err) {
      const serverMessage = err.response?.data?.message || err.message || "Check network and server logs.";
      setError(`Failed to save product: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId, name) => {
    if (!window.confirm(`Are you sure you want to DELETE the featured product: "${name}"?`)) return;

    setError(null);
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${productId}`,
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        });
      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Check network and server logs.';
      setError(`Failed to delete product: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && products.length === 0) {
    return <div className="loading-message">Loading featured products...</div>;
  }

  return (
    <div className="flash-deal-container">
      <div className="admin-header">
        <h2>Featured Products Management</h2>
        <button onClick={handleAddClick} className="add-btn" title="Create a new Featured Product">
          + ADD NEW FEATURED PRODUCT
        </button>
      </div>

      {error && <div className="error-message admin-error">{error}</div>}

      {products.length === 0 && !isLoading ? (
        <div className="no-data-message">No featured products found. Click ADD NEW FEATURED PRODUCT to create one.</div>
      ) : (
        <table className="flash-deal-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Current Price</th>
              <th>Old Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              // eslint-disable-next-line no-unused-vars
              const discount = product.oldprice && product.oldprice > 0
                ? (((product.oldprice - product.price) / product.oldprice) * 100).toFixed(0)
                : 'N/A';
              return (
                <tr key={product._id || index}>
                  <td data-label="Image">
                    <img
                      src={product.image }
                      alt={product.name || 'Featured Product Image'}
                      className="deal-image"
                    />

                  </td>
                  <td data-label="Name">{product.name}</td>
                  <td data-label="Current Price" className="price-new">₹{product.price?.toFixed(2) || '0.00'}</td>
                  <td data-label="Old Price" className="price-old">₹{product.oldprice?.toFixed(2) || '0.00'}</td>
                  <td data-label="Actions" className="action-buttons">
                    <button onClick={() => handleEditClick(product)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(product._id, product.name)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleContentClick}>
            <h3>{modalAction === 'add' ? 'Create New Featured Product' : `Edit Product: ${formData.name}`}</h3>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Current Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0.01" step="0.01" />
              </div>
              <div className="form-group">
                <label htmlFor="oldprice">Old Price:</label>
                <input type="number" id="oldprice" name="oldprice" value={formData.oldprice} onChange={handleChange} required min="0.01" step="0.01" />
              </div>
              <div className="form-group">
                <label htmlFor="imageFile">Upload Image File:</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} required={modalAction === 'add'} />
                {modalAction === 'edit' && formData.image && (
                  <small>
                    Current Image: <a href={`https://onlinegiftbackend.onrender.com/{formData.image}`} target="_blank" rel="noopener noreferrer">View</a> (Upload new file to replace)
                  </small>
                )}
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Saving...' : (modalAction === 'add' ? 'Create Product' : 'Save Changes')}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal} disabled={isLoading}>Cancel</button>
              </div>
            </form>
            <button className="close-button" onClick={handleCloseModal} disabled={isLoading}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeaturedProductTable;
