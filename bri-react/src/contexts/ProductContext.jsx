import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category 1', freshness: 'Fresh', price: 100 },
    { id: 2, name: 'Product 2', category: 'Category 2', freshness: 'New', price: 150 },
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
