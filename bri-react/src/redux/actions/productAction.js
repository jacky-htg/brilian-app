/*export const addProduct = (product) => async (dispatch) => {
    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const newProduct = await response.json();
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };
  */
  export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  
    try {
      const response = await fetch('http://localhost:8080/products');
      const data = await response.json();
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
  };

/*  export const deleteProduct = (id) => async (dispatch) => {
    try {
      await fetch(`http://localhost:8080/products/${id}`, { method: 'DELETE' });
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  */