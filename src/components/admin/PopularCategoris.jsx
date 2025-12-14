import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/popularcategories'; 

const emptyCategory = {
  title: '',
  itemsCount: 0,
  image: [], 
  _id: null,
};

function PopularCategoryTable() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [formData, setFormData] = useState(emptyCategory);
  const [selectedImageFile, setSelectedImageFile] = useState(null); 

  console.log("Current category form data:", formData);
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const apiData = response.data.data || response.data; 
      let categoriesArray = Array.isArray(apiData) ? apiData : [];
      setCategories(categoriesArray);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError('Failed to load popular categories. Check the server and API_URL.');
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  const handleAddClick = () => {
    setFormData(emptyCategory);
    setSelectedImageFile(null);
    setModalAction('add');
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setFormData({
      ...category,
      itemsCount: category.itemsCount || 0,
      image: Array.isArray(category.image) && category.image.length > 0
          ? category.image
          : [""]
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
      const newValue = (name === 'itemsCount') ? parseInt(value) || 0 : value;
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
    dataToSend.append("itemsCount", String(formData.itemsCount));

    if (selectedImageFile) {
      dataToSend.append("image", selectedImageFile); 
    } else if (modalAction === "edit" && formData.image && formData.image[0]) {
      dataToSend.append("existingImage", formData.image[0]); 
    }
    if (modalAction === "add" && !selectedImageFile) {
      setError("Please select an image file to upload for the category.");
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
      fetchCategories(); 
  
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || err.message || "Check network and server logs.";
      setError(`Failed to save category: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (categoryId, title) => {
    if (!window.confirm(`Are you sure you want to DELETE the category: "${title}"?`)) {
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${categoryId}`);
      setCategories(prevCategories => prevCategories.filter(category => category._id !== categoryId));
    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Check network and server logs.';
      setError(`Failed to delete category: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && categories.length === 0) {
    return <div className="loading-message">Loading popular categories...</div>;
  }

  return (
    <div className="flash-deal-container"> 
      <div className="admin-header">
        <h2> Popular Categories Management</h2>
        <button onClick={handleAddClick} className="add-btn" title="Create a new Popular Category">
          + ADD NEW CATEGORY
        </button>
      </div>
      {error && <div className="error-message admin-error">{error}</div>}
      
      {categories.length === 0 && !isLoading ? (
        <div className="no-data-message">No popular categories found. Click ADD NEW CATEGORY to create one.</div>
      ) : (
        <table className="flash-deal-table"> 
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Items Count</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td data-label="Image">
                    <img
                        src={category.image && category.image[0] ? `http://localhost:5000${category.image[0]}` : 'placeholder.jpg'}
                        alt={category.title || 'Category Image'}
                        className="deal-image" 
                    />
                </td>
                <td data-label="Title">{category.title}</td>
                <td data-label="Items Count" className="price-new">{category.itemsCount}</td>
                <td data-label="Created At">{new Date(category.createdAt).toLocaleDateString()}</td>
                <td data-label="Actions" className="action-buttons">
                  <button onClick={() => handleEditClick(category)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(category._id, category.title)} className="delete-btn">
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
            <h3>{modalAction === 'add' ? 'Create New Category' : `Edit Category: ${formData.title}`}</h3>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="itemsCount">Items Count:</label>
                <input type="number" id="itemsCount" name="itemsCount" value={formData.itemsCount} onChange={handleChange} required min="0" step="1" />
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
                
                {(modalAction === 'edit' && formData.image[0]) && (
                  <small>
                    Current Image: <a href={`http://localhost:5000${formData.image[0]}`} target="_blank" rel="noopener noreferrer">View</a> (Upload new file to replace)
                  </small>
                )}
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Saving...' : (modalAction === 'add' ? 'Create Category' : 'Save Changes')}
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

export default PopularCategoryTable;