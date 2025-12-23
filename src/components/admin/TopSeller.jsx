import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/admin/FlashDealsTable.css'; 

const API_URL = 'https://onlinegiftbackend.onrender.com/api/topseller'; 

const emptyProduct = {
  title: '',
  price: '', 
  oldPrice: 0, 
  images: [], 
  _id: null,
};

function TopSellerTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [formData, setFormData] = useState(emptyProduct);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]); 

  console.log("Current top seller product form data:", formData);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const apiData = response.data.data || response.data; 
      let productsArray = Array.isArray(apiData) ? apiData : [];
      setProducts(productsArray);
    } catch (err) {
      console.error("Failed to fetch top sellers:", err);
      setError('Failed to load top sellers. Check the server and API_URL.');
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
    setSelectedImageFiles([]);
    setModalAction('add');
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setFormData({
      ...product,
      oldPrice: product.oldPrice || 0,
      images: Array.isArray(product.images) ? product.images : (product.images ? [product.images] : []),
    });
    setSelectedImageFiles([]);
    setModalAction("edit");
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => setIsModalOpen(false);
  const handleContentClick = (e) => e.stopPropagation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'images' && files) {
      setSelectedImageFiles(Array.from(files));
      return;
    }
    
    setFormData(prevData => {
      const newValue = (name === 'oldPrice') ? parseFloat(value) || 0 : value;
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
    dataToSend.append("title", formData.title);
    dataToSend.append("price", formData.price); 
    dataToSend.append("oldPrice", String(formData.oldPrice));

    selectedImageFiles.forEach(file => {
        dataToSend.append("images", file); 
    });

    if (modalAction === "edit" && selectedImageFiles.length === 0 && formData.images.length > 0) {
        formData.images.forEach(imgObj => dataToSend.append("existingImages", imgObj.url)); 
    }

    if (modalAction === "add" && selectedImageFiles.length === 0) {
      setError("Please select at least one image file to upload for the product.");
      setIsLoading(false);
      return;
    }
  
    try {
      await axios({
        method: method,
        url: url,
        data: dataToSend,
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
      });
  
      setIsModalOpen(false);
      setSelectedImageFiles([]);
      fetchProducts(); 
  
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || err.message || "Check network and server logs.";
      setError(`Failed to save product: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId, title) => {
    if (!window.confirm(`Are you sure you want to DELETE the top seller product: "${title}"?`)) {
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${productId}`);
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Check network and server logs.';
      setError(`Failed to delete product: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && products.length === 0) {
    return <div className="loading-message">Loading top sellers...</div>;
  }

  return (
    <div className="flash-deal-container"> 
      <div className="admin-header">
        <h2> Top Sellers Management</h2>
        <button onClick={handleAddClick} className="add-btn" title="Create a new Top Seller Product">
          + ADD NEW TOP SELLER
        </button>
      </div>
      {error && <div className="error-message admin-error">{error}</div>}
      
      {products.length === 0 && !isLoading ? (
        <div className="no-data-message">No top seller products found. Click ADD NEW TOP SELLER to create one.</div>
      ) : (
        <table className="flash-deal-table"> 
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Current Price</th>
              <th>Old Price</th>
              <th>Images Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td data-label="Image">
                    <img
                        src={product.images && product.images[0]?.url ? product.images[0].url : 'placeholder.jpg'}
                        alt={product.title || 'Product Image'}
                        className="deal-image" 
                    />
                </td>
                <td data-label="Title">{product.title}</td>
                <td data-label="Current Price" className="price-new">₹{product.price}</td>
                <td data-label="Old Price" className="price-old">₹{product.oldPrice ? product.oldPrice.toFixed(2) : '0.00'}</td>
                <td data-label="Images Count">{product.images ? product.images.length : 0}</td>
                <td data-label="Actions" className="action-buttons">
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
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleContentClick}>
            <h3>{modalAction === 'add' ? 'Create New Top Seller' : `Edit Top Seller: ${formData.title}`}</h3>
            <hr />
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Current Price (String):</label>
                <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="oldPrice">Old Price:</label>
                <input type="number" id="oldPrice" name="oldPrice" value={formData.oldPrice} onChange={handleChange} required min="0" step="0.01" />
              </div>
              <div className="form-group">
                <label htmlFor="imageFile">Upload Images (Multiple Allowed):</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple 
                  accept="image/*"
                  onChange={handleChange}
                  required={modalAction === 'add'}
                />
                
                {(modalAction === 'edit' && formData.images.length > 0) && (
                  <small>
                    Currently loaded images: **{formData.images.length}**.
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

export default TopSellerTable;
