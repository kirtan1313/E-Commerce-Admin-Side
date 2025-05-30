import React, { useState, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

const UploadCatalog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productArray = location.state?.product || []; // Retrieve the array

  // State variables
  const [productName, setProductName] = useState(productArray[1] || "");
  const [category, setCategory] = useState(productArray[2] || "");
  const [price, setPrice] = useState(productArray[3] || "");
  const [stock, setStock] = useState(productArray[4] || "");
  const [productId, setProductId] = useState(productArray[5] || null);
  const [file, setFile] = useState(null);

  // Debugging: Log state changes
  useEffect(() => {
    console.log("File state updated:", file);
  }, [file]);

  useEffect(() => {
    if (productArray.length === 0) {
      console.warn("No product data received for update.");
    } else {
      console.log("Product Data Received:", productArray);
    }
  }, [productArray]);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
      setFile(selectedFile);
    } else {
      console.warn("No file selected");
    }
  };

  // Create new product
  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock", stock);
      if (file) {
        formData.append("img", file);
      }

      const response = await axios.post("http://localhost:3005/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Product created successfully.");
        navigate("/CatalogAdminPage", { replace: true });
      }
    } catch (error) {
      console.error("Error creating product:", error.response || error.message);
      toast.error("Failed to create product. Please try again.");
    }
  };

  // Update existing product
  const handleUpdateProduct = async () => {
    console.log("File in handleUpdateProduct:", file);
    if (!productId) {
      console.error("Product ID is missing. Cannot update product.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock", stock);

      if (file) {
        formData.append("img", file);
        console.log("Appending new file:", file.name);
      } else if (productArray[0]) {
        formData.append("imgUrl", productArray[0]);
        console.log("Using existing image URL:", productArray[0]);
      } else {
        console.error("No file or existing image URL provided.");
        toast.error("Please upload a new image or ensure an existing image is available.");
        return;
      }

      const response = await axios.put(
        `http://localhost:3005/products/${productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success("Product updated successfully.");
        navigate("/CatalogAdminPage", { replace: true });
      }
    } catch (error) {
      console.error("Error updating product:", error.response || error.message);
      toast.error("Failed to update product. Please try again.");
    }
  };

  // Handle form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("File before submit:", file);

    if (!productName || !category || !price || !stock) {
      toast.error("All fields are required.");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (productId) {
        console.log("Calling handleUpdateProduct...");
        await handleUpdateProduct();
      } else {
        await handleCreateProduct();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3, width: "100%", maxWidth: 800, margin: "0 auto", paddingTop: "88px" }}>
      <Card>
        <CardContent>
          <ToastContainer />
          <form onSubmit={handleFormSubmit}>
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
                      {file?.name || "Click to upload file"}
                    </Typography>
                  </label>
                </Box>
              </Grid>

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

              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  {productId ? "Update Product" : "Upload Product"}
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
