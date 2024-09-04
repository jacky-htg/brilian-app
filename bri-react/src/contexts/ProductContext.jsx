import React, { createContext, useReducer, useContext } from 'react';
import { fetchProducts as fetchProductsAPI, addProduct as addProductAPI, deleteProduct as deleteProductAPI } from '../api/products';

const initialState = {
  products: [],
  loading: false,
  error: null
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
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

  const fetchProducts = async () => {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
    try {
      const data = await fetchProductsAPI();
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
  };

  const addProduct = async (product) => {
    try {
      const newProduct = await addProductAPI(product);
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductAPI(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products: state.products, 
      loading: state.loading,
      error: state.error,
      fetchProducts,
      addProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
