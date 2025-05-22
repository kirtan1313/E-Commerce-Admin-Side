import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const drawerWidth = 240; // Same as AdminPanel

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
  { name: "May", revenue: 6000 },
];

function Dashboard() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingLeft: '20px',
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        paddingTop: '57px',
      }}
    >
      <Box sx={{ p: {xs:1,md:3} }}>

        {/* Statistics Cards */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            mb: 3,
          }}
        >
          {[
            { title: "Total Users", value: "1,250" },
            { title: "Orders", value: "325" },
            { title: "Revenue", value: "$8,450" },
            { title: "Active Sessions", value: "120" },
          ].map((stat, index) => (
            <Card key={index} sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 200 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  {stat.title}
                </Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Charts Section */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              flex: '1 1 calc(66.66% - 24px)',
              minWidth: 300,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Revenue Over Time
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
          <Box
            sx={{
              flex: '1 1 calc(33.33% - 24px)',
              minWidth: 200,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Quick Stats</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography>Total Products: 320</Typography>
              <Typography>Total Categories: 25</Typography>
              <Typography>Pending Orders: 12</Typography>
            </Paper>
          </Box>
        </Box>

        {/* Recent Orders Table */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recent Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { id: "#001", customer: "John Doe", status: "Completed", amount: "$120" },
                  { id: "#002", customer: "Jane Smith", status: "Pending", amount: "$80" },
                  { id: "#003", customer: "Sam Green", status: "Canceled", amount: "$50" },
                ].map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
