import React from 'react';
import { useQuery } from "@tanstack/react-query";
import {api} from "../../api/api";  
import "../../styles/TopBar.css";
function TopBar() {
  const {data} = useQuery({
    queryKey: ['topbar'],
    queryFn: async () => {
      const response = await api.get('/topbar');
      return response.data;
    }
  })
    const topBar = data?.[0]
  return (
    <div className="top-bar">
      <div className='top-fetch'>
      <p> Phone:{topBar?.phone}</p>
      <p>Phone: {topBar?.phone}</p>
      <p>Email: {topBar?.email}</p>
      <p>Facebook: {topBar?.facebook}</p>
      <p>Instagram: {topBar?.instagram}</p>
      </div>
    </div>
  );
}

export default TopBar;
