import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/admin/FlashDealsTable.css';

const API_URL = 'https://onlinegiftbackend.onrender.com/api/tshirt';

const CATEGORY_OPTIONS = ["tshirt","hoodie","kids","women","men"];

const emptyProduct = {
  title: '',
  price: '',
  images: [],
  category: CATEGORY_OPTIONS[0],
  _id: null,
};

function TshirtTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [formData, setFormData] = useState(emptyProduct);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);

  const token = localStorage.getItem("adminToken");

  const fetchProducts = useCallback(async ()=>{
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const apiData = response.data.data || response.data;
      setProducts(Array.isArray(apiData) ? apiData : []);
    } catch (err){
      setError('Failed to load products. Check the server and API_URL.',err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  },[]);

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
      images: Array.isArray(product.images) ? product.images : [],
      category: product.category || CATEGORY_OPTIONS[0],
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
    setFormData(prev => ({ ...prev, [name]: value }));
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
    dataToSend.append("category", formData.category);

    selectedImageFiles.forEach(file => dataToSend.append("images", file));
    if (modalAction === "edit" && selectedImageFiles.length === 0 && formData.images.length > 0) {
      formData.images.forEach(img => dataToSend.append("images", img.url));
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
        headers: { 'Content-Type': 'multipart/form-data', Authorization:`Bearer ${token}` },
      });

      setIsModalOpen(false);
      setSelectedImageFiles([]);
      fetchProducts();

    } catch (err) {
      const serverMessage = err.response?.data?.message || err.message || "Check network and server logs.";
      setError(`Failed to save product: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId,title) => {
    if (!window.confirm(`Are you sure you want to DELETE the product: "${title}"?`)) return;
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

  if (isLoading && products.length === 0){
    return <div className="loading-message">Loading products...</div>;
  }

  console.log("IMAGE:", products.images?.[0]?.url);

  return (
    <div className="flash-deal-container">
      <div className="admin-header">
        <h2>T-Shirt Collection Management</h2>
        <button onClick={handleAddClick} className="add-btn" title="Create a new Product">+ ADD NEW PRODUCT</button>
      </div>
      {error && <div className="error-message admin-error">{error}</div>}
      {products.length === 0 && !isLoading ? (
        <div className="no-data-message">No products found. Click ADD NEW PRODUCT to create one.</div>
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
            {products.map(product =>(
              <tr key={product._id}>
                <td data-label="Image">
                  <img
                  src={product.images?.[0]?.url || "/placeholder.jpg"}
                  alt={product.title || "Product Images"}
                  className='deal-image'
                  onError={(e)=>{
                    e.target.src = "/placeholder.jpg"
                  }}
                  />
                </td>
                <td data-label="Title">{product.title}</td>
                <td data-label="Price" className="price-new">₹{product.price}</td>
                <td data-label="Category">{product.category}</td>
                <td data-label="Actions" className="action-buttons">
                  <button onClick={() => handleEditClick(product)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(product._id, product.title)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>


        </table>
      )}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleContentClick}>
            <h3>{modalAction === 'add' ? 'Create New Product' : `Edit Product: ${formData.title}`}</h3>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (String):</label>
                <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                  {CATEGORY_OPTIONS.map(option =>(
                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="imageFile">Upload Images (Multiple Allowed):</label>
                <input
                  type="file"
                  id="image"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  required={modalAction === 'add'}
                />
                {modalAction === 'edit' && formData.images.length > 0 && (
                  <small>Currently loaded images: {formData.images.length}</small>
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
export default TshirtTable;
