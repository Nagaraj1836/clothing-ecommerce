import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then(r => setOrder(r.data)).catch(() => {});
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h2>Order Confirmed</h2>
      <p>Order ID: {order._id}</p>
      <p>Total: ₹{order.totalPrice}</p>
      <ul>
        {order.items.map(i => <li key={i.product}>{i.name} ({i.size}) x{i.qty} — ₹{i.price}</li>)}
      </ul>
    </div>
  );
}
