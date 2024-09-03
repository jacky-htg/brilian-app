import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  products: [],
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    default:
      return state;
  }
};

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const deleteProduct = (id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  return (
    <ProductContext.Provider value={{ products: state.products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
