'use client'
import { useState } from 'react'
import { Box, Toolbar, AppBar, Typography, IconButton, Drawer, CssBaseline } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Sidebar from './sidebar'
import Dashboard from './dashboard'

const drawerWidth = 350;  // Ensure drawer width matches sidebar width

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Sidebar
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 40, mr: 2 }} /> {/* Add your logo here */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pantry App
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Drawer for mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Permanent drawer for desktop */}
        <Box
          sx={{
            width: { sm: drawerWidth },
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {drawer}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            padding: 3,
            background: 'linear-gradient(to right, #ece9e6, #ffffff)',
          }}
        >
          <Dashboard selectedCategory={selectedCategory} />
        </Box>
      </Box>
      <Box sx={{ padding: 0.5, backgroundColor: '#333', textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary" sx={{ color: '#fff' }}>
          © 2024 Pantry App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default Homepage
