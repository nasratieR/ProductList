import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct } from '../services/apiService';
import { Link } from 'react-router-dom';
import EditProductModal from './EditProduct';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete._id);
      setProducts(products.filter((product) => product._id !== productToDelete._id));
      setSnackbarMessage(`The product "${productToDelete.name}" was deleted successfully.`);
      setIsSnackbarOpen(true);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditedProduct(product);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    await updateProduct(editingProduct._id, editedProduct);
    setProducts(products.map((product) => (product._id === editingProduct._id ? editedProduct : product)));
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h4">Products</Typography>
        <Link to="/add" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add Product
          </Button>
        </Link>
      </div>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card variant="outlined" sx={{ minHeight: '250px', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Type:</strong> {product.type}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> {product.price}€
                </Typography>
                <Typography variant="body2">
                  <strong>Rating:</strong> {product.rating}
                </Typography>
                <Typography variant="body2">
                  <strong>Warranty Years:</strong> {product.warranty_years}
                </Typography>
                <Typography variant="body2">
                  <strong>Available:</strong> {product.available ? 'Yes' : 'No'}
                </Typography>
              </CardContent>
              <CardActions sx={{ marginTop: 'auto', justifyContent: 'space-between' }}>
                <Button size="small" color="primary" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => confirmDelete(product)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {editingProduct && (
        <EditProductModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={editedProduct}
          onSave={handleSave}
          onChange={handleChange}
        />
      )}

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the product "{productToDelete?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert onClose={() => setIsSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductList;
