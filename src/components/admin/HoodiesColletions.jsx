import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/admin/FlashDealsTable.css'; 
const API_URL = 'http://localhost:5000/api/hoodies'; 

const emptyProduct = {
  title: '',
  price: '', 
  image: '', 
  category: 'hoodies', 
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

  console.log("Current hoodie product form data:", formData);


  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const apiData = response.data.data || response.data; 
      let productsArray = Array.isArray(apiData) ? apiData : [];
      setProducts(productsArray);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError('Failed to load hoodie products. Check the server and API_URL.');
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
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
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
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
      });
  
      setIsModalOpen(false);
      setSelectedImageFile(null);
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
    if (!window.confirm(`Are you sure you want to DELETE the product: "${title}"?`)) {
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
    return <div className="loading-message">Loading hoodie products...</div>;
  }

  return (
    <div className="flash-deal-container"> 
      <div className="admin-header">
        <h2> Hoodie Collection Management</h2>
        <button onClick={handleAddClick} className="add-btn" title="Create a new Hoodie Product">
          + ADD NEW HOODIE
        </button>
      </div>
      {error && <div className="error-message admin-error">{error}</div>}
      
      {products.length === 0 && !isLoading ? (
        <div className="no-data-message">No hoodie products found. Click ADD NEW HOODIE to create one.</div>
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
            {products.map((product) => (
              <tr key={product._id}>
                <td data-label="Image">
                    <img
                        src={product.image ? `http://localhost:5000${product.image}` : 'placeholder.jpg'}
                        alt={product.title || 'Product Image'}
                        className="deal-image" 
                    />
                </td>
                <td data-label="Title">{product.title}</td>
                <td data-label="Price" className="price-new">${product.price}</td>
                <td data-label="Category">{product.category}</td>
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
            <h3>{modalAction === 'add' ? 'Create New Hoodie' : `Edit Hoodie: ${formData.title}`}</h3>
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
                <input type="text" id="category" name="category" value={formData.category} readOnly disabled />
              </div>
              <div className="form-group">
                <label htmlFor="imageFile">Upload Image File:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required={modalAction === 'add'}
                />
                {(modalAction === 'edit' && formData.image) && (
                  <small>
                    Current Image: <a href={`http://localhost:5000${formData.image}`} target="_blank" rel="noopener noreferrer">View</a> (Upload new file to replace)
                  </small>
                )}
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Saving...' : (modalAction === 'add' ? 'Create Hoodie' : 'Save Changes')}
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

export default HoodieTable;