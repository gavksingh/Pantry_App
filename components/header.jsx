"use client";

import React, { useState } from 'react';
import { Box, Typography, Paper, Container, Grid } from '@mui/material';
import InventoryList from './inventorylist';
import AddItemButton from './additembutton';
import UploadPhotoButton from './uploadphotobutton';
import AddEditItemDialog from './addedititemdialog';
import { useInventory } from './useInventory';

const backgroundImage = 'url(/static/background.jpg)';

const Dashboard = ({ selectedCategory }) => {
  const {
    inventory,
    loading,
    open,
    itemName,
    itemQuantity,
    itemCategory,
    editingItem,
    categories,
    handleOpen,
    handleClose,
    handleAddOrUpdateItem,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    setItemName,
    setItemQuantity,
    setItemCategory,
    updateInventory,
  } = useInventory();

  const filteredInventory = selectedCategory === 'All' 
    ? inventory 
    : Object.fromEntries(Object.entries(inventory).filter(([_, item]) => item.category === selectedCategory));

  return (
    <Box sx={{
      display: 'flex',
      bgcolor: 'background.default',
      minHeight: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'rgba(255, 255, 255, 0.8)' }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'primary.light' }}>
                <Typography variant="h4" color="textPrimary" gutterBottom>
                  Inventory Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <AddItemButton handleOpen={handleOpen} />
                  <UploadPhotoButton updateInventory={updateInventory} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
                <InventoryList
                  inventory={filteredInventory}
                  loading={loading}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  handleOpen={handleOpen}
                  handleRemoveItem={handleRemoveItem}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <AddEditItemDialog
          open={open}
          editingItem={editingItem}
          itemName={itemName}
          itemQuantity={itemQuantity}
          itemCategory={itemCategory}
          categories={categories}
          handleClose={handleClose}
          handleAddOrUpdateItem={handleAddOrUpdateItem}
          setItemName={setItemName}
          setItemQuantity={setItemQuantity}
          setItemCategory={setItemCategory}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
