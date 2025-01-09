import React, { useState, useEffect } from 'react';
import API from '../api';
import './outfitSuggestion.css';
import { Box, Typography, Card, CardContent, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const OutfitSuggestion = ({ userId }) => {
    const [weather, setWeather] = useState(null);
    const [suggestions, setSuggestions] = useState({});
    const [categories, setCategories] = useState({
        Shirt: true,
        Pants: true,
        Jacket: true,
        Dress: true,
        Shoes: true,
    });

    const [selectedOccasion, setSelectedOccasion] = useState(''); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await API.get(`/suggest-outfit/${userId}`);
                console.log('API Response:', response.data);
                setWeather(response.data.weather);
                setSuggestions({});
                setLoading(false);
            } catch (err) {
                console.error(err);
                alert('Failed to retrieve weather information.');
                setLoading(false);
            }
        };

        fetchWeather();
    }, [userId]);

    const handleGenerateSuggestions = async () => {
        try {
            const response = await API.get(`/suggest-outfit/${userId}`);
            const wardrobe = response.data.suggestion;
            const season = response.data.weather.season;
            const newSuggestions = {};

            wardrobe.forEach((item) => {
                if (
                    (item.category === selectedOccasion || selectedOccasion === '') &&
                    (item.season === season || item.season === 'Any')
                ) {
                    if (!newSuggestions[item.type]) {
                        newSuggestions[item.type] = item;
                    }
                }
            });

            Object.keys(newSuggestions).forEach((type) => {
                if (!newSuggestions[type]) {
                    newSuggestions[type] = `No items available for ${season} in this category.`;
                }
            });

            setSuggestions(newSuggestions);
        } catch (err) {
            console.error(err);
            alert('Failed to generate outfit suggestions.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

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
                    mb: 2,
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                }}
            >
                Outfit Suggestions
            </Typography>
            {weather && (
                <Card
                    sx={{
                        backgroundColor: '#ffe4f3',
                        borderRadius: 3,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        width: '300px',
                        mb: 3,
                        p: 2,
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{ color: '#d63384', fontWeight: 'bold' }}
                        >
                            Temperature: {weather.temperature}°F
                        </Typography>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{ color: '#4a4a4a', fontWeight: 'medium' }}
                        >
                            Condition: {weather.condition}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            <FormControl sx={{ mb: 3, width: '300px' }}>
                <InputLabel id="specific-occasion-label">Select Occasion</InputLabel>
                <Select
                    labelId="specific-occasion-label"
                    id="specific-occasion"
                    value={selectedOccasion}
                    label="Select Occasion"
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                >
                    <MenuItem value="">All Occasions</MenuItem>
                    <MenuItem value="Casual">Casual</MenuItem>
                    <MenuItem value="Formal">Formal</MenuItem>
                    <MenuItem value="Sportswear">Sportswear</MenuItem>
                    <MenuItem value="Workwear">Workwear</MenuItem>
                    <MenuItem value="General">General</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={2} sx={{ maxWidth: '500px', mb: 3 }}>
                {Object.entries(categories).map(([category, isSelected]) => (
                    <Grid item xs={6} sm={4} key={category}>
                        <Button
                            variant="outlined"
                            sx={{
                                width: '100%',
                                backgroundColor: isSelected ? '#d63384' : '#ffffff',
                                color: isSelected ? '#ffffff' : '#d63384',
                                border: `2px solid #d63384`,
                                '&:hover': {
                                    backgroundColor: '#b02a6b',
                                    color: '#ffffff',
                                },
                            }}
                            onClick={() =>
                                setCategories((prev) => ({
                                    ...prev,
                                    [category]: !prev[category],
                                }))
                            }
                        >
                            {category}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Button
                onClick={handleGenerateSuggestions}
                variant="contained"
                sx={{
                    mt: 2,
                    mb: 4,
                    backgroundColor: '#d63384',
                    '&:hover': { backgroundColor: '#b02a6b' },
                }}
            >
                Generate Suggestions
            </Button>
            {Object.keys(suggestions).length > 0 && (
                <Box
                    sx={{
                        mt: 3,
                        textAlign: 'left',
                        maxWidth: '800px',
                        mx: 'auto',
                        backgroundColor: '#fff',
                        p: 2,
                        borderRadius: 3,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ mb: 2, color: '#d63384', fontWeight: 'bold' }}
                    >
                        Suggested Outfit:
                    </Typography>
                    <ul>
                        {Object.entries(suggestions).map(([category, suggestion]) => (
                            <li key={category}>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 'medium',
                                        color: '#4a4a4a',
                                        mb: 1,
                                    }}
                                >
                                    {typeof suggestion === 'string' ? (
                    <span>
                        <strong>{category}</strong>: {suggestion}
                    </span>
                ) : (
                    <span>
                        <strong>{category}</strong>: {suggestion.description || 'No description'} - {suggestion.color} ({suggestion.season})
                    </span>
                )}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
        </Box>
    );
};

export default OutfitSuggestion;
