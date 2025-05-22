import React from "react";
import { Box, Typography, Toolbar } from "@mui/material";

const drawerWidth = 240; // Same as AdminPanel

function Logout() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        mt: { xs: 8, sm: 8 }, // Adjust for AppBar height
      }}
    >
      <Toolbar />
      <Typography variant="h4">Logout</Typography>
      <Typography variant="body1">
        You have successfully logged out. Please log in to access the Admin Panel.
      </Typography>
    </Box>
  );
}

export default Logout;
