import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', type: '', price: '', rating: '', warranty_years: '', available: false });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`http://localhost:5001/products/${id}`, product)
      : axios.post('http://localhost:5001/products', product);

    request
      .then(() => navigate('/'))
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Type" name="type" value={product.type} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Price" name="price" value={product.price} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Rating" name="rating" value={product.rating} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Warranty Years" name="warranty_years" value={product.warranty_years} onChange={handleChange} fullWidth margin="normal" />
        
        <Stack direction="row" spacing={2} mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default ProductForm;
