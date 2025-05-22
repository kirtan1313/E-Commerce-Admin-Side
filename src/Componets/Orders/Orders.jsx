import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  Avatar,
} from "@mui/material";

const drawerWidth = 240; // Sidebar width

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: "#001",
      customer: "John Doe",
      status: "Pending",
      amount: "$120",
      orderName: "Wireless Headphones",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "#002",
      customer: "Jane Smith",
      status: "Completed",
      amount: "$80",
      orderName: "Smart Watch",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "#003",
      customer: "Sam Green",
      status: "Canceled",
      amount: "$50",
      orderName: "Bluetooth Speaker",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "#004",
      customer: "Alex Brown",
      status: "Ready",
      amount: "$200",
      orderName: "Gaming Keyboard",
      image: "https://via.placeholder.com/50",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }, // Account for the sidebar margin
        paddingTop: "78px",
      }}
    >

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.orderName}</TableCell>
                  <TableCell>
                    <Avatar
                      alt={order.orderName}
                      src={order.image}
                      variant="rounded"
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Ready">Ready</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Canceled">Canceled</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Orders;
