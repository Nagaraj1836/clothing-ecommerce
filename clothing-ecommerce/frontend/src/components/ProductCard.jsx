import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, margin: 8, width: 220 }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <Link to={`/product/${product._id}`}>View</Link>
    </div>
  );
}
