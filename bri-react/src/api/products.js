const API_URL = 'http://localhost:9000/products';

export const fetchProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

export const addProduct = async (product) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to add product');
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
};
