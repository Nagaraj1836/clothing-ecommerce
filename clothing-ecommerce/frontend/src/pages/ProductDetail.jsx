import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const { addItem } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(()=>{ api.get(`/products/${id}`).then(r=>{ setProduct(r.data); setSize(r.data.sizes?.[0]||''); }); },[id]);

  if(!product) return <div>Loading...</div>;

  const handleAdd = () => {
    if(!size){ alert('Select size'); return; }
    addItem(product, size, qty);
    navigate('/cart');
  };

  return (
    <div style={{ padding: 20 }}>
      <img src={product.image} alt={product.name} style={{ width: 300 }} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <div>
        <label>Size:</label>
        <select value={size} onChange={e => setSize(e.target.value)}>
          {product.sizes.map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label>Qty:</label>
        <input type="number" min="1" value={qty} onChange={e=>setQty(Number(e.target.value))} />
      </div>
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}
