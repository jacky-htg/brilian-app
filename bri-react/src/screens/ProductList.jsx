import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';

const ProductList = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useProducts();
  
  const handleDelete = (id) => {
    console.log(id, products)
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="container" style={styles.container}>
        <h1>List of Products</h1>
      <button 
        onClick={() => navigate('/products/create')} 
        style={styles.addButton}
      >
        ADD
      </button>
      <table style={styles.table}>
        <thead style={styles.header}>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Freshness</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.freshness}</td>
              <td>${product.price}</td>
              <td>
                <div style={styles.buttonContainer}>
                  <button onClick={() => navigate(`/products/${product.id}`)} style={styles.actionButton}>
                    View
                  </button>
                  <button onClick={() => navigate(`/products/${product.id}/edit`)} style={styles.actionButton}>
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  header: {
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
  addButton: {
    marginBottom: '10px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    gap: '5px',
  },
  actionButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default ProductList;
