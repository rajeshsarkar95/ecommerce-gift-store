import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/admin/FlashDealsTable.css';

const API_URL = 'https://onlinegiftbackend.onrender.com/api/customebanner';

const emptyBanner = {
  title: '',
  subtitle: '',
  descriptions: '',
  backgroundImage: '',
  _id: null,
};

function CustomGiftBannerTable() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [formData, setFormData] = useState(emptyBanner);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchBanners = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const apiData = response.data;
      let bannersArray = [];
      if (apiData && apiData.success === true && Array.isArray(apiData.data)) {
        bannersArray = apiData.data;
      } else if (Array.isArray(apiData)) {
        bannersArray = apiData;
      } else if (apiData && apiData.data && typeof apiData.data === 'object' && apiData.data.title) {
        bannersArray = [apiData.data];
      } else if (apiData && apiData.title) {
        bannersArray = [apiData];
      }
      setBanners(bannersArray);
    } catch (err) {
      console.error("Failed to fetch custom banners:", err);
      setError('Failed to load banners. Check the server and API_URL.');
      setBanners([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleAddClick = () => {
    setFormData(emptyBanner);
    setSelectedImageFile(null);
    setModalAction('add');
    setIsModalOpen(true);
  };

  const handleEditClick = (banner) => {
    setFormData({
      ...banner,
      _id: banner._id,
    });
    setSelectedImageFile(null);
    setModalAction('edit');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleContentClick = (e) => e.stopPropagation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'backgroundImage' && files && files.length > 0) {
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

    const method = modalAction === 'add' ? 'post' : 'put';
    const url = modalAction === 'add' ? API_URL : `${API_URL}/${formData._id}`;

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('subtitle', formData.subtitle);
    dataToSend.append('descriptions', formData.descriptions);

    if (selectedImageFile) {
      dataToSend.append('backgroundImage', selectedImageFile);
    }
    if (modalAction === 'add' && !selectedImageFile) {
      setError('Please select an image file to upload.');
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
          Authorization: `Bearer ${token}`

        }
      });
      setIsModalOpen(false);
      setSelectedImageFile(null);
      fetchBanners();
    } catch (err) {
      const serverMessage = err.response?.data?.message || err.message || 'Check network and server logs.';
      setError(`Failed to save banner: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (bannerId, title) => {
    if (!window.confirm(`Are you sure you want to DELETE the banner: "${title}"?`)) {
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      await axios.delete(`${API_URL}/${bannerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setBanners(prevBanners => prevBanners.filter(banner => banner._id !== bannerId));

    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Check network and server logs.';
      setError(`Failed to delete banner: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading && banners.length === 0) {
    return <div className="loading-message">Loading custom gift banners...</div>;
  }

  return (
    <div className="flash-deal-container">
      <div className="admin-header">
        <h2>Custom  Banner Management</h2>
        <button
          onClick={handleAddClick}
          className="add-btn"
          title="Create a new Custom Banner"
        >
          + ADD NEW BANNER
        </button>
      </div>
      {error && <div className="error-message admin-error">{error}</div>}

      {banners.length === 0 && !isLoading ? (
        <div className="no-data-message">No custom gift banners found. Click ADD NEW BANNER to create one.</div>
      ) : (
        <table className="flash-deal-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner._id}>
                <td data-label="Image">
                  <img
                    src={banner.backgroundImage ? `${banner.backgroundImage}` : 'placeholder.jpg'}
                    alt={banner.title || 'Custom Banner'}
                    className="deal-image"
                  />
                </td>
                <td data-label="Title">{banner.title}</td>
                <td data-label="Subtitle">{banner.subtitle}</td>
                <td data-label="Description" className="description-cell">
                  {banner.descriptions.substring(0, 50)}...
                </td>
                <td data-label="Actions" className="action-buttons">
                  <button
                    onClick={() => handleEditClick(banner)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id, banner.title)}
                    className="delete-btn"
                  >
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
            <h3>{modalAction === 'add' ? 'Create New Banner' : `Edit Banner: ${formData.title}`}</h3>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="subtitle">Subtitle:</label>
                <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="descriptions">Description:</label>
                <textarea id="descriptions" name="descriptions" value={formData.descriptions} onChange={handleChange} required rows="3"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="imageFile">Background Image File:</label>
                <input
                  type="file"
                  id="imageFile"
                  name="backgroundImage"
                  accept="image/*"
                  onChange={handleChange}
                  required={modalAction === 'add'}
                />
                {(modalAction === 'edit' && formData.backgroundImage) && (
                  <small>Current Image: <a href={`${formData.backgroundImage}`} target="_blank" rel="noopener noreferrer">View</a> (Upload new file to replace)</small>
                )}
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Saving...' : (modalAction === 'add' ? 'Create Banner' : 'Save Changes')}
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

export default CustomGiftBannerTable;