import React, { useState, useEffect } from 'react';
import './App.css';
import Loader from './Loader';
import PhotoFrame from './PhotoFrame';

const App = () => {
  const [number, setNumber] = useState('');
  const [photoData, setPhotoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (number !== '') {
        setIsLoading(true);

        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${number}`);
          const data = await response.json();
          setPhotoData(data);
        } catch (error) {
          console.log('Error:', error);
        }

        setIsLoading(false);
      }
    };

    fetchData();
  }, [number]);

  return (
    <div className="App">
      <input type="number" value={number} onChange={handleInputChange} placeholder="Enter a number" />

      {isLoading && <Loader />}

      {photoData && <PhotoFrame url={photoData.url} title={photoData.title} />}
    </div>
  );
};

export default App;
