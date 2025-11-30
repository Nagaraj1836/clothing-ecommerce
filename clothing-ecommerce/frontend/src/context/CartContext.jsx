import React, { createContext, useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    const local = localStorage.getItem('cart');
    if (local) setCart(JSON.parse(local));
  }, []);

  // When user logs in, merge local cart with server cart
  useEffect(() => {
    const mergeCarts = async () => {
      const localCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
      if (user && localCart.items.length) {
        // Convert local items to server shape and call update or add endpoint
        await api.put('/cart/update', { items: localCart.items });
        localStorage.removeItem('cart');
        const { data } = await api.get('/cart');
        setCart(data);
      } else if (user) {
        const { data } = await api.get('/cart');
        setCart(data);
      }
    };
    mergeCarts();
  }, [user]);

  const addToCart = async (product, size, qty=1) => {
    const item = {
      product: product._id,
      name: product.name,
      size,
      qty,
      price: product.price,
      image: product.image
    };
    if (user) {
      const { data } = await api.post('/cart/add', { productId: product._id, size, qty });
      setCart(data);
    } else {
      const local = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
      const idx = local.items.findIndex(i => i.product === product._id && i.size === size);
      if (idx > -1) local.items[idx].qty = qty;
      else local.items.push(item);
      localStorage.setItem('cart', JSON.stringify(local));
      setCart(local);
    }
  };

  // update qty, remove, etc similarly...

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
};
