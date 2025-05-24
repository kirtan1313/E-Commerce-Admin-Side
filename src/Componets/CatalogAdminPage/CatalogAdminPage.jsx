import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

const drawerWidth = 240;

const CatalogTable = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Fetch products initially
    useEffect(() => {
        axios.get('http://localhost:3005/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Handle the updated product if passed from UploadCatelog
    useEffect(() => {
        console.log("Location state in CatalogTable:", location.state);
        if (location.state && location.state.updatedProduct) {
            const updatedProduct = location.state.updatedProduct;
            console.log('Upadte Productt Replace', updatedProduct);

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
                )
            );
        }
    }, [location.state]);


    const handleUpdate = (updatedProduct) => {
        const { img, productName, category, price, stock, _id } = updatedProduct;

        navigate("/UploadCatelog", {
            state: { product: [img, productName, category, price, stock, _id] },
            
        });
        console.log('img',img);
    };




    const handleDelete = (deleteProduct) => {
        console.log('id', deleteProduct);

        axios
            .delete(`http://localhost:3005/products/${deleteProduct}`)
            .then(() => {
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.id !== deleteProduct)
                );
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
    };


    return (
        <TableContainer
            component={Paper}
            sx={{
                flexGrow: 1,
                paddingLeft: '20px',
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                paddingTop: '97px',
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                {product.img ? (
                                    <Box
                                        component="img"
                                        src={`http://localhost:3005/${product.img}`}
                                        alt={product.productName}
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '8px',
                                        }}
                                    />
                                ) : (
                                    <Typography>No Image</Typography>
                                )}
                            </TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleUpdate(product)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{ ml: 1 }}
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CatalogTable;
