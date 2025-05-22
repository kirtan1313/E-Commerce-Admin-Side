import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

const UploadCatalog = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // Extract product data from location state
  const { product } = location.state || {};

  console.log("prodct update naviigateion",product);
  




  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("file", event.target.files[0]);

  };


  const handleFormDataSubmit = async (e) => {
    e.preventDefault();

    if (!file || !productName || !category || !price || !stock) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("img", file);
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);

    try {

      const respons = await axios.post('http://localhost:3005/products', formData, {
        headers: {
          'Content-Type': "multipart/form-data",
        }
      })


      if (respons.status === 200) {
        toast.success('Product Upload SuccesFull');
      }

    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Failed to upload product. Please try again.");
    }

    setProductName('')
    setFile('')
    setCategory('')
    setPrice('')
    setStock('')

  }



  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 3,
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
        paddingTop: "88px",
      }}
    >
      <Card>
        <CardContent>
          <ToastContainer />
          <form onSubmit={handleFormDataSubmit}>
            {/* File Upload Section */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Upload Product File</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="file-upload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                    <IconButton component="span" color="primary">
                      <CloudUploadIcon sx={{ fontSize: "40px" }} />
                    </IconButton>
                    <Typography variant="body1">
                      {file ? file.name : "Click to upload file"}
                    </Typography>
                  </label>
                </Box>
              </Grid>

              {/* Product Details Section */}
              <Grid item xs={12}>
                <Typography variant="h6">Product Details</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="Men">Men</MenuItem>
                    <MenuItem value="Women">Women</MenuItem>
                    <MenuItem value="Kids">Kids</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  type="number"
                  variant="outlined"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Upload Catalog
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadCatalog;
