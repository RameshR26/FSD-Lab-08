import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [item, setItem] = useState('laptop');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/analyze/${item}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [item]);

  if (!data) return <h1>Loading Market Intelligence...</h1>;

  const urgentStyle = {
    container: {
      border: data.isUrgent ? '3px solid #d32f2f' : '1px solid #ccc',
      backgroundColor: data.isUrgent ? '#fff8f8' : '#fff',
      padding: '30px',
      borderRadius: '20px',
      textAlign: 'center',
      transition: '0.3s all',
      width: '400px',
      boxShadow: '0px 10px 25px rgba(0,0,0,0.1)'
    },
    button: {
      backgroundColor: data.isUrgent ? '#d32f2f' : '#1976d2',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1.1rem'
    }
  };

  return (
    <div
      style={{
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial'
      }}
    >
      <h2>Smart Market-Aware E-Commerce Card</h2>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setItem('laptop')} style={{marginRight:"10px"}}>
          Check Laptop (Conflict Hub)
        </button>

        <button onClick={() => setItem('shirt')}>
          Check Shirt (Stable Hub)
        </button>
      </div>

      <div style={urgentStyle.container}>
        {data.isUrgent && (
          <div style={{ color: 'red', fontWeight: 'bold', marginBottom:"10px" }}>
            ⚠️ CONFLICT IMPACT DETECTED
          </div>
        )}

        <h1>{data.name}</h1>

        <p style={{ fontSize: '1.5rem', fontWeight:"bold" }}>
          ${data.price}
        </p>

        <p>
          <strong>Latest Headline:</strong><br/>
          "{data.newsHeadline}"
        </p>

        <p>
          <strong>ML Sentiment Score:</strong> {data.sentimentScore}
        </p>

        <h3 style={{ color: data.isUrgent ? 'red' : 'green' }}>
          {data.recommendation}
        </h3>

        <button style={urgentStyle.button}>
          {data.isUrgent
            ? "SECURE STOCK NOW"
            : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}

export default App;