import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
  CircularProgress, 
  Typography,
  Tooltip,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const InventoryList = ({
  inventory,
  loading,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleOpen,
  handleRemoveItem,
}) => {
  // Show loading spinner if data is being fetched
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  // Show message if inventory is empty
  const inventoryItems = Object.entries(inventory);
  if (inventoryItems.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography variant="h6" color="textSecondary">
          No items in inventory.
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
      {inventoryItems.map(([itemId, item]) => (
        <React.Fragment key={itemId}>
          <ListItem alignItems="flex-start" sx={{ padding: 2 }}>
            <Avatar sx={{ marginRight: 2 }}>{item.name[0]}</Avatar>
            <ListItemText
              primary={<Typography variant="h6">{item.name}</Typography>}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    Quantity: {item.quantity}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    Category: {item.category}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <Tooltip title="Increase Quantity">
                <IconButton edge="end" aria-label="increase" onClick={() => handleIncreaseQuantity(itemId)}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Decrease Quantity">
                <IconButton edge="end" aria-label="decrease" onClick={() => handleDecreaseQuantity(itemId)}>
                  <RemoveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Item">
                <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(itemId)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Item">
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(itemId)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default InventoryList;
