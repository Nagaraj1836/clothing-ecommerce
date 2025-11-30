import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const fetchProducts = async () => {
    const res = await api.get('/products', { params: { page, limit: 12, search } });
    setProducts(res.data.products);
    setTotalPages(res.data.pages);
  };

  return (
    <div>
      <h2>Products</h2>
      <input placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
      <div>
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span>{page}/{totalPages}</span>
        <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  );
}
