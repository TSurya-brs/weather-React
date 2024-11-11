import React, { useState } from 'react';
import './Flicker.css';

const Flicker = () => {
  const api_url = "https://api.flickr.com/services/rest/";
  const api_key = "d12447f70e875413282a48b9cbe48257";

  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const data_fetch = async (params) => {
    const extension = {
      api_key: api_key,
      format: 'json',
      method: 'flickr.photos.search',
      extras: 'url_h',
      nojsoncallback: '1',
      page: '1',
      ...params
    };

    try {
      const response = await fetch(api_url + "?" + new URLSearchParams(extension));
      if (!response.ok) {
        throw new Error("Data not found");
      }

      const result = await response.json();
      setPhotos(result.photos.photo);
      setError('');
    } catch (err) {
      setError(err.message);
      setPhotos([]);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      data_fetch({ tags: searchTerm });
    }
  };

  return (
    <div className="flicker-container">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search for images..." 
      />
      <button onClick={handleSearch}>Search...</button>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="grid-container">
        {photos.map(photo => (
          <div className="grid-item" key={photo.id}>
            <img src={photo.url_h} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flicker;
