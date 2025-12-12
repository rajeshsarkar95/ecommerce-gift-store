import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// Reusing a consistent admin table stylesheet
import '../../styles/admin/FlashDealsTable.css'; 

// --- Configuration ---
// Make sure this API URL points to your actual Mug endpoint
const API_URL = 'http://localhost:5000/api/mugs'; 

// Define the structure for an empty product item
const emptyProduct = {
  name: '',
  price: 0, 
  oldPrice: 0, // Optional field, default to 0
  image: '', // Single string for image URL
  _id: null,
};

function MugTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [formData, setFormData] = useState(emptyProduct);
  const [selectedImageFile, setSelectedImageFile] = useState(null); // Single file for upload

  console.log("Current mug product form data:", formData);

  // --- Data Fetching Logic (Read) ---
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const apiData = response.data.data || response.data; 
      let productsArray = Array.isArray(apiData) ? apiData : [];
      setProducts(productsArray);
    } catch (err) {
      console.error("Failed to fetch mug products:", err);
      setError('Failed to load mug products. Check the server and API_URL.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- Modal Open/Close Handlers ---
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
      oldPrice: product.oldPrice || 0,
      image: product.image || '', // Ensure image is a string
    });
    setSelectedImageFile(null);
    setModalAction("edit");
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => setIsModalOpen(false);
  const handleContentClick = (e) => e.stopPropagation();

  // --- Form Change Handlers ---
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files.length > 0) {
      setSelectedImageFile(files[0]);
      return;
    }
    
    setFormData(prevData => {
      // Parse price fields as numbers
      const newValue = (name === 'price' || name === 'oldPrice') ? parseFloat(value) || 0 : value;
      return {
        ...prevData,
        [name]: newValue
      };
    });
  };

  // --- Form Submission Logic (Create/Update) ---
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
    dataToSend.append("oldPrice", String(formData.oldPrice));

    if (selectedImageFile) {
      dataToSend.append("image", selectedImageFile); // New image file
    } else if (modalAction === "edit" && formData.image) {
      // Pass the existing image URL back if no new file is selected
      dataToSend.append("existingImage", formData.image); 
    }
    
    // Validation: Require new file if adding
    if (modalAction === "add" && !selectedImageFile) {
      setError("Please select an image file to upload for the mug.");
      setIsLoading(false);
      return;
    }
  
    try {
      await axios({
        method: method,
        url: url,
        data: dataToSend,
        headers: {
            'Content-Type': 'multipart/form-data', // Crucial for file upload
        },
      });
  
      setIsModalOpen(false);
      setSelectedImageFile(null);
      fetchProducts(); // Refresh data
  
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || err.message || "Check network and server logs.";
      setError(`Failed to save mug: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // --- Deletion Logic ---
  const handleDelete = async (productId, name) => {
    if (!window.confirm(`Are you sure you want to DELETE the mug: "${name}"?`)) {
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${productId}`);
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Check network and server logs.';
      setError(`Failed to delete mug: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render ---
  if (isLoading && products.length === 0) {
    return <div className="loading-message">Loading mug products...</div>;
  }

  return (
    <div className="flash-deal-container"> 
      <div className="admin-header">
        <h2> Mug Collection Management</h2>
        <button onClick={handleAddClick} className="add-btn" title="Create a new Mug Product">
          + ADD NEW MUG
        </button>
      </div>
      {error && <div className="error-message admin-error">{error}</div>}
      
      {products.length === 0 && !isLoading ? (
        <div className="no-data-message">No mug products found. Click ADD NEW MUG to create one.</div>
      ) : (
        <table className="flash-deal-table"> 
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Current Price</th>
              <th>Old Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
                const hasDiscount = product.oldPrice > product.price && product.oldPrice > 0;
                const discountPercentage = hasDiscount 
                    ? (((product.oldPrice - product.price) / product.oldPrice) * 100).toFixed(0)
                    : '0';

                return (
                    <tr key={product._id}>
                        <td data-label="Image">
                            <img
                                src={product.image ? `http://localhost:5000${product.image}` : 'placeholder.jpg'}
                                alt={product.name || 'Mug Image'}
                                className="deal-image" 
                            />
                        </td>
                        <td data-label="Name">{product.name}</td>
                        <td data-label="Current Price" className="price-new">
                            ${product.price ? product.price.toFixed(2) : '0.00'}
                        </td>
                        <td data-label="Old Price" className="price-old">
                            {hasDiscount ? `$${product.oldPrice.toFixed(2)}` : 'N/A'}
                        </td>
                        <td data-label="Discount" className="discount">
                            {hasDiscount ? `${discountPercentage}% OFF` : ''}
                        </td>
                        <td data-label="Actions" className="action-buttons">
                            <button onClick={() => handleEditClick(product)} className="edit-btn">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(product._id, product.name)} className="delete-btn">
                                Delete
                            </button>
                        </td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      )}

      {/* --- Modal Component --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleContentClick}>
            <h3>{modalAction === 'add' ? 'Create New Mug' : `Edit Mug: ${formData.name}`}</h3>
            <hr />
            <form onSubmit={handleSubmit}>

              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              {/* Price Input */}
              <div className="form-group">
                <label htmlFor="price">Current Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0.01" step="0.01" />
              </div>
              
              {/* Old Price Input */}
              <div className="form-group">
                <label htmlFor="oldPrice">Old Price (Optional for Sale):</label>
                <input type="number" id="oldPrice" name="oldPrice" value={formData.oldPrice} onChange={handleChange} min="0" step="0.01" />
              </div>

              {/* Image Upload Input (Single File) */}
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
                  {isLoading ? 'Saving...' : (modalAction === 'add' ? 'Create Mug' : 'Save Changes')}
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

export default MugTable;