import React from 'react';
import { ProductProvider } from './ProductContext';

const Providers = ({ children }) => {
    return (
        <ProductProvider>
            {children}
        </ProductProvider>
    );
};

export default Providers;
