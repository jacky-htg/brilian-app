import React, { useState, useEffect, useCallback  } from 'react';
import Input from '../components/form/Input';
import Radio from '../components/form/Radio';
import Textarea from '../components/form/Textarea';
import Select from '../components/form/Select';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useProducts } from '../contexts/ProductContext';

function CreateProduct() {
    const navigateTo = useNavigate()
    const { setProducts } = useProducts();
    const [product, setProduct] = useState({
        id: '',
        name: '',
        category: '',
        freshness: '',
        image: null,
        description: '',
        price: ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isTouched, setIsTouched] = useState({});

    const validateProductName = (name) => {
        const regex = /^[a-zA-Z0-9 ]*$/;
        if (!name) {
          return 'Product name is required';
        } else if (name.length > 25) {
          return 'Product name cannot exceed 25 characters';
        } else if (!regex.test(name)) {
          return 'Product name should not contain special characters';
        }
        return '';
    };

    const validateProductImage = (image) => {
        if (!image) {
          return 'Product image is required';
        } else if (!['image/jpeg', 'image/png'].includes(image.type)) {
          return 'Only JPG and PNG formats are allowed';
        }
        return '';
    };

    const validateForm = useCallback(() => {
        const newErrors = {};
        newErrors.name = validateProductName(product.name);
        newErrors.image = validateProductImage(product.image);
        newErrors.category = product.category ? '' : 'Product category is required';
        newErrors.freshness = product.freshness ? '' : 'Product freshness is required';
        newErrors.price = product.price ? '' : 'Product price is required';
        newErrors.description = product.description ? '' : 'Product description is required';
    
        setErrors(newErrors);
        setIsFormValid(Object.values(newErrors).every((error) => error === ''));
    }, [product]);

    useEffect(() => {
        validateForm();
    }, [validateForm]);

    const anotherFunc = useCallback(() => {
      console.log(product)
      console.log(isTouched)
    }, [product, isTouched])

    function myCallback() {
      console.log(product)
      console.log(errors)
      anotherFunc()
    }
    useEffect(myCallback, [product, errors, anotherFunc]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
          ...prevProduct,
          [name]: value
        }));
        setIsTouched((prevIsTouched) => ({
            ...prevIsTouched,
            [name]: true
        }));
    };

    const handleFileChange = (e) => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: e.target.files[0]
        }));
        setIsTouched((prevIsTouched) => ({
            ...prevIsTouched,
            image: true
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
          const newProduct = {...product, id: uuidv4()} 
          setProduct(newProduct)
          setProducts(prevProducts => [...prevProducts, newProduct]);
          console.log('Form submitted successfully', newProduct);
          navigateTo('/products');
        } else {
          console.log('Form is invalid');
        }
    };
    
  return (
    <div className="container">
      <h1>Create Product</h1>
      <h3>Detail Product</h3>
      <form onSubmit={handleSubmit}>
        <Input 
          label="Product name" 
          name="name"
          type="text" 
          value={product.name} 
          onChange={handleChange} 
          error={isTouched.name ? errors.name : ''} 
        />

        <Select
          label="Product Category" 
          name="category"
          value={product.category} 
          onChange={handleChange}
          error={isTouched.category ? errors.category : ''} 
        >
            <option value="">Please choose...</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothes">Clothes</option>
        </Select>

        <Radio 
          label="Product Freshness" 
          name="freshness"
          options={['Brand New', 'Second Hand', 'Refurbished']}
          value={product.freshness} 
          onChange={handleChange}
          error={isTouched.freshness ? errors.freshness : ''} 
        />

        <Input 
          label="Image of Product" 
          type="file" 
          name="image"
          onChange={handleFileChange}
          error={isTouched.image ? errors.image : ''} 
        />

        <Textarea 
          label="Additional Description" 
          name="description"
          value={product.description} 
          onChange={handleChange}
          error={isTouched.description ? errors.description : ''}  
        />

        <Input 
          label="Product price" 
          type="text" 
          name="price"
          value={product.price} 
          onChange={handleChange}
          error={isTouched.price ? errors.price : ''} 
        />

        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
}

export default CreateProduct;
