import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { items, updateItem, removeItem, clear } = useContext(CartContext);
  const navigate = useNavigate();
  const total = items.reduce((s,i)=>s + i.qty * i.price, 0);

  if (items.length === 0) return <div>Your cart is empty. <Link to="/products">Shop</Link></div>;

  return (
    <div>
      <h2>Your Cart</h2>
      {items.map(it => (
        <div key={it.product + it.size} style={{ borderBottom: '1px solid #ddd', padding: 8 }}>
          <img src={it.image} alt={it.name} width={80} />
          <strong>{it.name}</strong> ({it.size}) — ₹{it.price}
          <input type="number" min="1" value={it.qty} onChange={e=>updateItem(it.product, it.size, Number(e.target.value))} />
          <button onClick={()=>removeItem(it.product, it.size)}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <button onClick={()=>navigate('/checkout')}>Checkout</button>
      <button onClick={()=>clear()}>Clear</button>
    </div>
  );
}
