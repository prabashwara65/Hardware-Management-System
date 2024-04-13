import React, { useState } from 'react';
import { Box, Stack, Drawer, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material'; // Import the Menu icon
import DeliveryForm from './DeliveryForm';
import MapView from './MapView';
import MapViewCss from './AlignMap.module.css';
import Footer from './Footer';
import DashboardSidebar from '../../../Components/Dashboard/Dashboard_Sidebar';
import DashboardHome from '../../../Components/Dashboard/Dashboard_Home';

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openHome, setOpenHome] = useState(false);

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleToggleHome = () => {
    setOpenHome(!openHome);
  };

  const handleToggleBoth = () => {
    handleToggleSidebar();
    handleToggleHome();
  };

  return (
    <Box className={MapViewCss.body} position="relative">
      <Stack direction="row-reverse" justifyContent="inherit">
        <DeliveryForm />
        <MapView />
        <IconButton
          onClick={handleToggleBoth} // Call handleToggleBoth function
          sx={{
            position: 'absolute',
            top: -10,
            right: 1245,
            zIndex: 1,
            height: 48,
            width: 48,
            bgcolor: 'transparent', // Make the background transparent
            '&:hover': {
              bgcolor: 'transparent', // Keep the background transparent on hover
            },
          }}
          color="primary"
          aria-label="toggle sidebar"
        >
          <Menu />
        </IconButton>
      </Stack>
      <Drawer anchor="left" open={openSidebar} onClose={handleToggleSidebar}>
        <DashboardSidebar />
      </Drawer>
      <Drawer anchor="right" open={openHome} onClose={handleToggleHome}>
        <DashboardHome />
      </Drawer>
      <Footer />
    </Box>
  );
}

export default App;
