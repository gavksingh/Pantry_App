
import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddItemButton = ({ handleOpen }) => {
  return (
    <Button
      variant="outlined" // Changed from contained to outlined for a modern look
      startIcon={<AddIcon />}
      onClick={() => handleOpen()}
      sx={{ 
        mb: { xs: 2, sm: 3 }, 
        mr: { xs: 0, sm: 2 },
        width: { xs: '100%', sm: 'auto' },
        border: '2px solid', // Add a border
        borderColor: 'primary.main', // Change border color
        color: 'primary.main', // Change text color
        padding: '10px 20px', // Add padding
        borderRadius: '30px', // Add rounded corners
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', // Add shadow for depth
        transition: 'all 0.3s ease-in-out', // Add transition for smooth effects
        '&:hover': {
          borderColor: 'primary.dark', // Change border color on hover
          backgroundColor: 'primary.light', // Change background color on hover
          color: 'white', // Change text color on hover
          transform: 'scale(1.05)', // Slightly enlarge the button on hover
        },
        '&:focus': {
          borderColor: 'primary.light', // Change border color on focus
          backgroundColor: 'primary.dark', // Change background color on focus
          color: 'white', // Change text color on focus
        },
      }}
    >
      Add Item
    </Button>
  );
};

export default AddItemButton;
