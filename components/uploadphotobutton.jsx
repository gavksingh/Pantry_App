// import React, { useState } from 'react';
// import { Button, CircularProgress } from '@mui/material';
// import UploadIcon from '@mui/icons-material/Upload';
// import { addItem } from '../utils/itemController';

// export default function UploadPhotoButton({ updateInventory }) {
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoading(true);

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await fetch('/api/sendphoto', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload image');
//       }

//       const data = await response.json();
//       console.log('Identified item:', data.itemName);
//       console.log('Category:', data.category);
      
//       // Add the identified item to the inventory with its category
//       await addItem({ name: data.itemName, quantity: 1, category: data.category });

//       // Refresh the inventory list
//       await updateInventory();

//     } catch (error) {
//       console.error('Error uploading image:', error);
//       // Handle error (e.g., show error message to user)
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <input
//         accept="image/*"
//         style={{ display: 'none' }}
//         id="raised-button-file"
//         type="file"
//         onChange={handleFileChange}
//       />
//       <label htmlFor="raised-button-file">
//         <Button
//           variant="contained"
//           color="primary"
//           component="span"
//           startIcon={loading ? <CircularProgress size={24} /> : <UploadIcon />}
//           disabled={loading}
//           sx={{ 
//             mb: { xs: 2, sm: 3 },
//             width: { xs: '100%', sm: 'auto' },
//             border: '2px solid',
//             borderColor: 'primary.main',
//             color: loading ? 'white' : 'primary.main',
//             padding: '10px 20px',
//             borderRadius: '30px',
//             boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//             transition: 'all 0.3s ease-in-out',
//             backgroundColor: loading ? 'primary.main' : 'white',
//             '&:hover': {
//               borderColor: 'primary.dark',
//               backgroundColor: loading ? 'primary.main' : 'primary.light',
//               color: 'white',
//               transform: 'scale(1.05)',
//             },
//             '&:focus': {
//               borderColor: 'primary.light',
//               backgroundColor: loading ? 'primary.main' : 'primary.dark',
//               color: 'white',
//             },
//           }}
//         >
//           {loading ? 'Analyzing...' : 'Upload Photo'}
//         </Button>
//       </label>
//     </>
//   );
// }


import React, { useState } from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { addItem } from '../utils/itemController';

export default function UploadPhotoButton({ updateInventory }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/sendphoto', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('Identified item:', data.itemName);
      console.log('Category:', data.category);
      
      // Add the identified item to the inventory with its category
      await addItem({ name: data.itemName, quantity: 1, category: data.category });

      // Refresh the inventory list
      await updateInventory();

      setMessage('Photo uploaded and item added successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {preview && (
        <Box sx={{ mb: 2 }}>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
        </Box>
      )}
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={loading ? <CircularProgress size={24} /> : <UploadIcon />}
          disabled={loading}
          sx={{ 
            mb: { xs: 2, sm: 3 },
            width: { xs: '100%', sm: 'auto' },
            border: '2px solid',
            borderColor: 'primary.main',
            color: loading ? 'white' : 'primary.main',
            padding: '10px 20px',
            borderRadius: '30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            transition: 'all 0.3s ease-in-out',
            backgroundColor: loading ? 'primary.main' : 'white',
            '&:hover': {
              borderColor: 'primary.dark',
              backgroundColor: loading ? 'primary.main' : 'primary.light',
              color: 'white',
              transform: 'scale(1.05)',
            },
            '&:focus': {
              borderColor: 'primary.light',
              backgroundColor: loading ? 'primary.main' : 'primary.dark',
              color: 'white',
            },
          }}
        >
          {loading ? 'Analyzing...' : 'Upload Photo'}
        </Button>
      </label>
      {message && (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
