import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, clear } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [shipping, setShipping] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user) { alert('Please login to place order.'); navigate('/login'); return; }
    const res = await api.post('/orders', { items, shippingAddress: shipping });
    clear();
    navigate(`/order/${res.data._id}`);
  };

  const total = items.reduce((s,i)=>s + i.qty * i.price, 0);

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ₹{total}</p>
      <textarea placeholder="Shipping address" value={shipping} onChange={e=>setShipping(e.target.value)} />
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
