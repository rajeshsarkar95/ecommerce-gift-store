import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/admin/FlashDealsTable.css';
const API_URL = 'https://onlinegiftbackend.onrender.com/api/flashdeals';
const emptyDeal = {
  tittle: '',
  price: 0,
  oldPrice: 0,
  images: [],
  _id: null,
};
function FlashDealTable() {
  const [flashDeals, setFlashDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [formData, setFormData] = useState(emptyDeal);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const fetchDeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const apiData = response.data;
      let dealsArray = [];
      if (apiData && apiData.success === true && Array.isArray(apiData.data)) {
        dealsArray = apiData.data;
      }
      else if (Array.isArray(apiData)) {
        dealsArray = apiData;
      }
      else if (apiData && apiData.data && typeof apiData.data === 'object') {
        if (apiData.data.tittle || apiData.data.price) {
          dealsArray = [apiData.data];
        }
      }
      setFlashDeals(dealsArray);
    } catch (err) {
      console.error("Failed to fetch flash deals:", err);
      setError('Failed to load flash deals. Check the server and API_URL.');
      setFlashDeals([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const handleAddClick = () => {
    setFormData(emptyDeal);
    setSelectedImageFile(null);
    setModalAction('add');
    setIsModalOpen(true);
  };

  const handleEditClick = (deal) => {
    setFormData({
      ...deal,
      price: deal.price || 0,
      oldPrice: deal.oldPrice || 0,
  
      _id: deal._id,
  
      // ALWAYS ensure images is an array with one valid string
      images:
        Array.isArray(deal.images) && deal.images.length > 0
          ? deal.images
          : (deal.image ? [deal.image] : [""]),
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
      const newValue = (name === 'price' || name === 'oldPrice') ? parseFloat(value) || 0 : value;
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
    dataToSend.append("tittle", formData.tittle);
    dataToSend.append("price", String(formData.price));
    dataToSend.append("oldPrice", String(formData.oldPrice));

    if (selectedImageFile) {
      dataToSend.append("images", selectedImageFile);
    } else if (modalAction === "edit" && formData.images && formData.images[0]) {
      dataToSend.append("existingImage", formData.images[0]);
    }
    if (modalAction === "add" && !selectedImageFile) {
      setError("Please select an image file to upload.");
      setIsLoading(false);
      return;
    }
  
    try {
      await axios({
        method: method,
        url: url,
        data: dataToSend,
      });
  
      setIsModalOpen(false);
      setSelectedImageFile(null);
      fetchDeals();
  
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || err.message || "Check network and server logs.";
      setError(`Failed to save deal: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleDelete = async (dealId, tittle) => {
    if (!window.confirm(`Are you sure you want to DELETE the deal: "${tittle}"?`)) {
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${dealId}`);
      setFlashDeals(prevDeals => prevDeals.filter(deal => deal._id !== dealId));
    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Check network and server logs.';
      setError(`Failed to delete deal: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading && flashDeals.length === 0) {
    return <div className="loading-message">Loading flash deals...</div>;
  }

  return (
    <div className="flash-deal-container">
      <div className="admin-header">
        <h2> Flash Deals Management</h2>
        <button onClick={handleAddClick} className="add-btn" title="Create a new Flash Deal">
          + ADD NEW DEAL
        </button>
      </div>
      {error && <div className="error-message admin-error">{error}</div>}
      {flashDeals.length === 0 && !isLoading ? (
        <div className="no-data-message">No flash deals found. Click ADD NEW DEAL to create one.</div>
      ) : (
        <table className="flash-deal-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>New Price</th>
              <th>Old Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flashDeals.map((deal) => {
              const discount = deal.oldPrice && deal.oldPrice > 0
                ? (((deal.oldPrice - deal.price) / deal.oldPrice) * 100).toFixed(0)
                : 'N/A';

              return (
                <tr key={deal._id}>
                  <td data-label="Image">
                    <img
                      src={deal.images && deal.images[0] ? `https://onlinegiftbackend.onrender.com${deal.images[0]}` : 'placeholder.jpg'}
                      alt={deal.tittle || 'Flash Deal'}
                      className="deal-image"
                    />
                  </td>
                  <td data-label="Title">{deal.tittle}</td>
                  <td data-label="New Price" className="price-new">${deal.price ? deal.price.toFixed(2) : '0.00'}</td>
                  <td data-label="Old Price" className="price-old">${deal.oldPrice ? deal.oldPrice.toFixed(2) : '0.00'}</td>
                  <td data-label="Discount" className="discount">{discount}% OFF</td>
                  <td data-label="Actions" className="action-buttons">
                    <button onClick={() => handleEditClick(deal)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(deal._id, deal.tittle)} className="delete-btn">
                      Delete
                    </button>
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
            <h3>{modalAction === 'add' ? 'Create New Flash Deal' : `Edit Deal: ${formData.tittle}`}</h3>
            <hr />
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="tittle">Title:</label>
                <input type="text" id="tittle" name="tittle" value={formData.tittle} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="price">New Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0.01" step="0.01" />
              </div>

              <div className="form-group">
                <label htmlFor="oldPrice">Old Price:</label>
                <input type="number" id="oldPrice" name="oldPrice" value={formData.oldPrice} onChange={handleChange} required min="0.01" step="0.01" />
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
                {(modalAction === 'edit' && formData.images[0]) && (
                  <small>Current Image: <a href={`https://onlinegiftbackend.onrender.com${formData.images[0]}`} target="_blank" rel="noopener noreferrer">View</a> (Upload new file to replace)</small>
                )}
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Saving...' : (modalAction === 'add' ? 'Create Deal' : 'Save Changes')}
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

export default FlashDealTable;