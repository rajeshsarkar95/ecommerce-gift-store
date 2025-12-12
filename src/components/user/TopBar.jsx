import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/TopBar.css";

function TopBar() {
  const [topBar, setTopBar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopBar = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/topbar");
        setTopBar(response.data[0]); // single object
      } catch (error) {
        console.error("Error fetching TopBar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBar();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="top-bar">
      <div className="top-fetch">
        <p>Phone: {topBar?.phone}</p>
        <p>Email: {topBar?.email}</p>
        <p>Facebook: {topBar?.facebook}</p>
        <p>Instagram: {topBar?.instagram}</p>
      </div>
    </div>
  );
}

export default TopBar;
