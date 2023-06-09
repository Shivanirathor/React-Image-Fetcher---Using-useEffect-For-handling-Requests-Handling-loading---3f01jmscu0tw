import React, { useState, useEffect } from 'react'
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';


const App = () => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  const fetchData = (id) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then(response => response.json())
      .then(data => {
        setPhotoData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id !== '') {
      fetchData(id);
    }
  }, [id]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setId(inputValue);
  };

  return (
    <div className="App">
      <input type="number" value={id} onChange={handleInputChange} />
      {loading && <Loader />}
      {photoData && (
        <PhotoFrame url={photoData.url} title={photoData.title} />
      )}
    </div>
  );
}

export default App;
