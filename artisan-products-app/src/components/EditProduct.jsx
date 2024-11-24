import React from 'react';
import { Modal, Box, TextField, Button, MenuItem, FormControlLabel, Checkbox } from '@mui/material';

const EditProductModal = ({ open, onClose, product, onSave, onChange }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <h2>Edit the product</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={product.name || ''}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={product.price || ''}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Type"
            name="type"
            select
            value={product.type || ''}
            onChange={onChange}
          >
            <MenuItem value="phone">Phone</MenuItem>
            <MenuItem value="laptop">Laptop</MenuItem>
            <MenuItem value="tablet">Tablet</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ step: 0.1, min: 0, max: 5 }}
            value={product.rating || ''}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Warranty years"
            name="warranty_years"
            type="number"
            value={product.warranty_years || ''}
            onChange={onChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={product.available || false}
                name="available"
                onChange={(e) => onChange({ target: { name: 'available', value: e.target.checked } })}
              />
            }
            label="Available"
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onSave}>
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
