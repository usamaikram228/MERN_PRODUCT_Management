import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const ProductInput = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !company || !category || !price || !image) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem('user'))._id;
    // Create a FormData object to send the data including the image
    const formData = new FormData();
    formData.append('name', name);
    formData.append('company', company);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('userId', userId);
    formData.append('image', image);

    // Now you can make an API call to send the formData to your server
    //Example:
    fetch('http://localhost:5000/add-product', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then((data) => {
        setSuccess(true);
        setTimeout(() => {
          setName('');
          setCompany('');
          setCategory('');
          setPrice('');
          setImage(null);
          setSuccess(false);
        }, 6000); 
       
      })
      .catch(error => console.error(error)).catch(error => {
        console.error("Fetch error:", error);
      });


  };

  return (
    <div className="product-input">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <span>*Required</span>}
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span>*Required</span>}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <span>*Required</span>}
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <span>*Required</span>}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {error && !image && <span>*Required</span>}
      
        {success && <p style={{ color: 'green' }}>Product inserted successfully!</p>}

        <button type="submit" >Add Product</button>
      </form>
    </div>
  );
};

export default ProductInput;
