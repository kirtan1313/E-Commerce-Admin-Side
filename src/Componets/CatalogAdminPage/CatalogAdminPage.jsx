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

const drawerWidth = 240;

const CatalogTable = () => {
    const [products, setProducts] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const openEditDialog = (product) => {
    setCurrentProduct(product); // Set the product to be edited
    setOpenEdit(true); // Open the edit dialog
};
const closeEditDialog = () => {
    setOpenEdit(false);
    setCurrentProduct(null);
};



    useEffect(() => {
        axios
            .get('http://localhost:3005/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleUpdate = (updatedProduct) => {
        console.log('updatedProduct', updatedProduct);

        if (!updatedProduct || !updatedProduct) {
            console.error('Invalid product data');
            return;
        }

        axios
            .put(`http://localhost:3005/products/${updatedProduct}`, updatedProduct)
            .then((response) => {
                console.log('Product updated successfully:', response.data);

                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === updatedProduct.id ? response.data : product
                    )
                );
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };


    const handleDelete = (id) => {
        console.log('ididid', id);

        axios
            .delete(`http://localhost:3005/products/${id}`)
            .then(() => {
                console.log('Product deleted successfully');
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.id !== id)
                );
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
            });
    };








    return (
        <TableContainer component={Paper} sx={{
            flexGrow: 1,
            paddingLeft: '20px',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            paddingTop: '97px',
        }}>
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
                                    onClick={() => handleUpdate(product._id)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{ ml: 1 }}
                                    onClick={() => {
                                        handleDelete(product._id)
                                        console.log('dddddd', product._id);
                                    }}
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
