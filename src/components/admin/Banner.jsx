import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../styles/admin/AddBannerForm.css';

const API_URL = 'https://onlinegiftbackend.onrender.com/api/Promobanners';

const emptyBanner = {
  title: '',
  subtitle: '',
  description: '',
  images: [],
  _id: null,
};

function BannerTable() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [formData, setFormData] = useState(emptyBanner);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  
  const fetchBanners = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const apiData = response.data.data || response.data;
      let bannersArray = Array.isArray(apiData) ? apiData : [];
      setBanners(bannersArray);
    } catch (err) {
      console.error("Failed to fetch banners:", err);
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
    setSelectedImageFiles([]);
    setModalAction('add');
    setIsModalOpen(true);
  };

  const handleEditClick = (banner) => {
    setFormData({
      _id: banner._id,
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      description: banner.description || "",
      images: Array.isArray(banner.images) ? banner.images : [],
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
    setFormData(prevData => ({ ...prevData, [name]: value }));
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
    dataToSend.append("subtitle", formData.subtitle);
    dataToSend.append("description", formData.description);

    selectedImageFiles.forEach(file => {
      dataToSend.append("images", file);
    });

    if (modalAction === "add" && selectedImageFiles.length === 0) {
      setError("Please select at least one image");
      setIsLoading(false);
      return;
    }

    try {
      await axios({ method, url, data: dataToSend });
      setIsModalOpen(false);
      setSelectedImageFiles([]);
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleDelete = async (bannerId, title) => {
    if (!window.confirm(`Are you sure you want to DELETE the banner: "${title}"?`)) return;
    setError(null);
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${bannerId}`);
      setBanners(prevBanners => prevBanners.filter(banner => banner._id !== bannerId));
    } catch (err) {
      const serverMessage = err.response?.data?.message || 'Check network and server logs.';
      setError(`Failed to delete banner: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && banners.length === 0) {
    return <div className="loading-message">Loading banners...</div>;
  }

  return (
    <div className="banner-table-container">
      <div className="admin-header">
        <h2> Banner Management</h2>
        <button onClick={handleAddClick} className="add-btn" title="Create a new Banner">
          + ADD NEW BANNER
        </button>
      </div>
      {error && <div className="error-message admin-error">{error}</div>}

      {banners.length === 0 && !isLoading ? (
        <div className="no-data-message">No banners found. Click ADD NEW BANNER to create one.</div>
      ) : (
        <table className="banner-data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Description Preview</th>
              <th>Images Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner._id}>
                <td data-label="Title">{banner.title}</td>
                <td data-label="Subtitle">{banner.subtitle}</td>
                <td data-label="Description" className="banner-description-cell">
                  {banner.description.substring(0, 70)}...
                </td>
                <td data-label="Images Count" className="banner-image-count-cell">
                  {Array.isArray(banner.images) ? banner.images.length : 0}
                </td>
                <td data-label="Actions" className="action-buttons">
                  <button onClick={() => handleEditClick(banner)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(banner._id, banner.title)} className="delete-btn">Delete</button>
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
              <div className="form-group"><label htmlFor="title">Title:</label><input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required /></div>
              <div className="form-group"><label htmlFor="subtitle">Subtitle:</label><input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} required /></div>
              <div className="form-group"><label htmlFor="description">Description:</label><textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="3" /></div>
              <div className="form-group">
                <label htmlFor="images">Upload Images (Multiple Allowed):</label>
                <input type="file" id="images" name="images" multiple accept="image/*" onChange={handleChange} required={modalAction === 'add'} />

                {(modalAction === 'edit' && formData.images.length > 0) && (
                  <small>Currently loaded images: {formData.images.length}</small>
                )}
                {selectedImageFiles.length > 0 && (
                  <small style={{ color: '#007bff', fontWeight: 'bold' }}>{selectedImageFiles.length} new file(s) ready to upload.</small>
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

export default BannerTable;
