import React, { useState } from 'react';
import API from '../api';
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid } from '@mui/material';
import './addWardrobeItem.css';

const AddWardrobeItem = () => {
    const wardrobeTypes = ['Shirt', 'Pants', 'Jacket', 'Dress', 'Shoes'];
    const wardrobeColors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Grey', 'Black', 'White'];
    const wardrobeSeasons = ['Winter', 'Summer', 'Spring', 'Fall', 'Any'];

    const [formData, setFormData] = useState({
        userId: '',
        type: '',
        color: '',
        season: '',
        description: '',
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('api/wardrobe/add', formData);
            console.log('Item added:', response.data);
            alert('Wardrobe item added successfully!');
            // Clear form after successful submission
            setFormData({
                userId: '',
                type: '',
                color: '',
                season: '',
                description: '',
                category: '',
            });
        } catch (err) {
            if (err.response && err.response.status === 400) {
                alert('Error: Duplicate wardrobe item not allowed.');
            } else {
                alert('Failed to add wardrobe item. Please try again.');
            }
            console.error(err);
        }
    };

    return (
        <Box
            sx={{
                textAlign: 'center',
                p: 3,
                backgroundColor: '#f8f0fc',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    color: '#d63384',
                    mb: 3,
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                }}
            >
                Add Wardrobe Item
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: '#ffffff',
                    p: 3,
                    borderRadius: 3,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="User ID"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                {wardrobeTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="color-label">Color</InputLabel>
                            <Select
                                labelId="color-label"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                            >
                                {wardrobeColors.map((color) => (
                                    <MenuItem key={color} value={color}>
                                        {color}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="season-label">Season</InputLabel>
                            <Select
                                labelId="season-label"
                                name="season"
                                value={formData.season}
                                onChange={handleChange}
                            >
                                {wardrobeSeasons.map((season) => (
                                    <MenuItem key={season} value={season}>
                                        {season}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            placeholder="Describe the item"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <MenuItem value="Casual">Casual</MenuItem>
                                <MenuItem value="Formal">Formal</MenuItem>
                                <MenuItem value="Sportswear">Sportswear</MenuItem>
                                <MenuItem value="Workwear">Workwear</MenuItem>
                                <MenuItem value="General">General</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#d63384',
                                '&:hover': { backgroundColor: '#b02a6b' },
                                p: 1.5,
                                fontSize: '16px',
                            }}
                        >
                            Add Item
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AddWardrobeItem;
