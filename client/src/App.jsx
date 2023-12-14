import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  const GetProducts = async () => {
    const response = await axios.get("http://localhost:5000/books")
    setData(response.data)
  }
  useEffect(() => {
    GetProducts()
  }, [])

  const interval = setInterval(GetProducts, 5 * 60 * 1000);
  setTimeout(() => clearInterval(interval), 30 * 60 * 1000);
  return (
    <section>
      <h1>My Products</h1>
      {data ? (
        <div className='container'>
          {data.map(item => (
            <div className='card' key={item.id}>
              <div className="imgbox">
                <img src={item.image} alt="" />
              </div>
              <div className="subtitle">
                <h2>{item.title}</h2>
                <div className="price">
                  <span>{item.description}</span>
                  <span>{item.categfory}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <img className='loading' src="https://i0.wp.com/codemyui.com/wp-content/uploads/2017/09/rotate-pulsating-loading-animation.gif?fit=880%2C440&ssl=1" alt="" />
      )}
    </section>
  );
}

export default App;
