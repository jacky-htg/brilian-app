// reducer.js
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  products: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const { id, ...productWithoutId } = action.payload; 
      const newProduct = {
        ...productWithoutId,
        price: parseFloat(productWithoutId.price),
      };

      return {
        ...state,
        products: [...state.products, newProduct]
      };

    default:
      return state;
  }
};

export default productReducer;
