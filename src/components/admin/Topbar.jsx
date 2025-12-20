import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../../styles/admin/topbar.css';
const API_URL = 'https://onlinegiftbackend.onrender.com/api/topbar';
const emptyData = {
  phone: "",
  email: "",
  facebook: "",
  instagram: ""
};
const isDataEmptyCheck = (data) => {
  return !data || (!data.phone && !data.email && !data.facebook && !data.instagram);
};
function Topbar({ isAdmin = true, initialFetchedData = null }) {
  const [topBarData, setTopBarData] = useState(initialFetchedData || emptyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('edit');
  const [formData, setFormData] = useState(initialFetchedData || emptyData);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  useEffect(() => {
    if (initialFetchedData) {
        setIsLoading(false);
        setTopBarData(initialFetchedData);
        return;
    }

    const fetchData = async () => {
        setError(null);
        try {
            const response = await axios.get(API_URL);
            const data = response.data;
            let fetchedData = emptyData;
            if (Array.isArray(data) && data.length > 0) {
                fetchedData = data[0];
            } else if (data && !Array.isArray(data)) {
                fetchedData = data;
            }
            setTopBarData(fetchedData);
            setFormData(fetchedData); 
        } catch (err) {
            console.error("Fetch Error:", err);
            if (err.response && err.response.status === 404) {
                 console.log("No topbar data found, treating as empty.");
                 setTopBarData(emptyData);
                 setFormData(emptyData);
            } else {
                 setError(`Failed to load data: ${err.message}`);
                 setTopBarData(emptyData);
                 setFormData(emptyData);
            }
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
  }, [initialFetchedData]); 
  useEffect(() => {
    setFormData(topBarData);
  }, [topBarData]);
  const isDataEmpty = isDataEmptyCheck(topBarData);
  const handleEditClick = () => {
    if (isDataEmpty) return;
    setFormData(topBarData);
    setModalAction('edit');
    setIsModalOpen(true);
  };
  const handleAddClick = () => {
    setFormData(emptyData);
    setModalAction('add');
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    const method = modalAction === 'add' ? 'post' : 'put'; 
    const url = modalAction === 'add' ? API_URL : `${API_URL}/${topBarData._id}`;
    const dataToSend = (method === 'post') ? formData : { ...formData, _id: topBarData._id }; 

    try {
        const response = await axios({
            method: method,
            url: url,
            data: dataToSend, 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = response.data;
        setTopBarData(result);
        setIsModalOpen(false);
    } catch (err) {
        console.error(`${method.toUpperCase()} Error:`, err.response ? err.response.data : err.message);
        const errorMessage = err.response && err.response.data ? (err.response.data.message || err.response.data) : err.message;
        setError(`Failed to save data: ${errorMessage}`);
    } finally {
        setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    if (isDataEmpty || !topBarData._id || !window.confirm(`Are you sure you want to DELETE this topbar record?`)) {
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
        await axios.delete(`${API_URL}/${topBarData._id}`);
        setTopBarData(emptyData); 
        console.log("Topbar data successfully deleted.");
    } catch (err) {
        console.error("DELETE Error:", err.response ? err.response.data : err.message);
        const errorMessage = err.response && err.response.data ? (err.response.data.message || err.response.data) : err.message;
        setError(`Failed to delete data: ${errorMessage}`);
    } finally {
        setIsLoading(false);
    }
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleContentClick = (e) => e.stopPropagation();
  if (isLoading) {
    return <div className="topbar-container loading">Loading Topbar Data...</div>;
  }
  return (
    <>
      <div className="topbar-container">
        <div className="topbar-left">
          <span className="contact-item phone">
            <span className="icon">&#x260E;</span>{topBarData.phone || 'N/A'}
          </span>
          <span className="contact-item email">
            <span className="icon">&#x2709;</span>{topBarData.email || 'N/A'}
          </span>
        </div>
        <div className="topbar-right">
          {topBarData.facebook && <a href={topBarData.facebook} target="_blank" rel="noopener noreferrer" className="social-icon facebook-icon" title="Facebook">f</a>}
          {topBarData.instagram && <a href={topBarData.instagram} target="_blank" rel="noopener noreferrer" className="social-icon instagram-icon" title="Instagram">i</a>}

          {isAdmin && (
            <span className="admin-controls">
              {error && <span className="admin-error">{error}</span>}
              <button onClick={handleAddClick} title="Add New Topbar Info" className="add-btn" disabled={!isDataEmpty}>ADD</button> 
              {!isDataEmpty && (
                <>
                  <button onClick={handleEditClick} title="Edit Topbar Info" className="edit-btn">EDIT</button>
                  <button onClick={handleDelete} title="Delete Topbar Info" className="delete-btn">DELETE</button>
                </>
              )}
            </span>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleContentClick}>
            <h2>{modalAction === 'add' ? 'Add New Topbar Information' : 'Edit Topbar Information'}</h2>
            <p>Fill in the contact and social media links below.</p>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="facebook">Facebook URL:</label>
                <input type="url" id="facebook" name="facebook" value={formData.facebook || ''} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="instagram">Instagram URL:</label>
                <input type="url" id="instagram" name="instagram" value={formData.instagram || ''} onChange={handleChange} />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Processing...' : (modalAction === 'add' ? 'Create Record' : 'Save Changes')}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal} disabled={isLoading}>Cancel</button>
              </div>
            </form>
            <button className="close-button" onClick={handleCloseModal} disabled={isLoading}>&times;</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Topbar;