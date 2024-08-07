import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Divider,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import FolderIcon from '@mui/icons-material/Folder';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  const [openCategory, setOpenCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleToggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleClearCategory = () => {
    setSelectedCategory('All'); // or any default category you prefer for full inventory
  };

  const categories = {
    'Food & Drink': [
      'Produce',
      'Dairy & Eggs',
      'Meat & Seafood',
      'Bakery',
      'Snacks',
      'Beverages',
      'Canned Goods',
      'Pasta & Grains',
      'Condiments',
      'Spices',
      'Frozen Foods',
      'Breakfast',
      'Organic',
      'Gluten-Free',
      'International',
    ],
    Household: [
      'Cleaning Supplies',
      'Laundry',
      'Paper Goods',
      'Trash Bags',
      'Air Fresheners',
      'Pest Control',
      'Light Bulbs',
      'Batteries',
    ],
    Health: [
      'Vitamins',
      'Medications',
      'Fitness',
      'Medical Supplies',
    ],
    Kids: [
      'Diapers & Wipes',
      'Baby Food',
      'Baby Care',
      'Children\'s Health',
      'Baby Gear',
    ],
    'Pet Supplies': [
      'Pet Food',
      'Pet Treats',
      'Pet Toys',
      'Pet Grooming',
      'Pet Health',
      'Pet Accessories',
    ],
    Electronics: [
      'Phones',
      'Computers',
      'Audio',
      'TV & Theater',
      'Cameras',
      'Gaming',
      'Smart Home',
    ],
    'Clothing & Accessories': [
      'Men\'s Clothing',
      'Women\'s Clothing',
      'Kids\' Clothing',
      'Shoes',
      'Accessories',
      'Jewelry',
      'Watches',
    ],
    // Add other main categories here...
  };

  return (
    <Box
      sx={{
        width: 350,
        height: '100%',
        overflow: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      <List sx={{ padding: 0 }}>
        <ListItem>
          <Typography variant="h6" color="primary">Categories</Typography>
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={handleClearCategory}
          sx={{
            bgcolor: selectedCategory === 'All' ? 'primary.light' : 'transparent',
            '&:hover': {
              bgcolor: selectedCategory === 'All' ? 'primary.light' : 'rgba(0, 0, 0, 0.08)', // Adjust hover color as needed
            },
          }}
        >
          <ListItemIcon>
            <CategoryIcon color={selectedCategory === 'All' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="All Items" />
        </ListItem>
        <Divider />
        {Object.keys(categories).map((mainCategory) => (
          <React.Fragment key={mainCategory}>
            <ListItem button onClick={() => handleToggleCategory(mainCategory)}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={mainCategory} />
              {openCategory === mainCategory ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCategory === mainCategory}>
              <List component="div" disablePadding>
                {categories[mainCategory].map((subCategory) => (
                  <ListItem
                    key={subCategory}
                    button
                    selected={selectedCategory === subCategory}
                    onClick={() => handleCategorySelect(subCategory)}
                    sx={{
                      pl: 4,
                      '&.Mui-selected': {
                        bgcolor: 'primary.light',
                        '&:hover': { bgcolor: 'primary.light' },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <FolderIcon color={selectedCategory === subCategory ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={subCategory} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
