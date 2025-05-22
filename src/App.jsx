import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react'
import AdminPanel from './Componets/AdminPannel/AdminPannel';
import { Route, Routes } from 'react-router';
import Dashboard from './Componets/Dashboard/Dashboard';
import Users from './Componets/UploadCatelog/UploadCatelog';
import Orders from './Componets/Orders/Orders';
import Logout from './Componets/Logout/Logout';
import UploadCatelog from './Componets/UploadCatelog/UploadCatelog';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'monospace',
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <AdminPanel />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/UploadCatelog" element={<UploadCatelog />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
