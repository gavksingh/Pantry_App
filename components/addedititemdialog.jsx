import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';

export default function AddEditItemDialog({
  open,
  editingItem,
  itemName,
  itemQuantity,
  itemCategory,
  handleClose,
  handleAddOrUpdateItem,
  setItemName,
  setItemQuantity,
  setItemCategory,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddOrUpdateItem();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">
          {editingItem ? 'Edit Item' : 'Add Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Item Name"
              type="text"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              disabled={!!editingItem}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              margin="dense"
              label="Quantity"
              type="number"
              fullWidth
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              inputProps={{ min: 1 }}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              margin="dense"
              label="Category"
              type="text"
              fullWidth
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {editingItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
