import React, { useState, useEffect } from 'react';
import API from '../api';
import { Box, Typography, Card, CardContent, Grid} from '@mui/material';
import './wardrobeList.css';

const WardrobeList = ({ userId }) => {
    const [wardrobe, setWardrobe] = useState([]);

    useEffect(() => {
        const fetchWardrobe = async () => {
            try {
                const response = await API.get(`/api/wardrobe/${userId}`);
                setWardrobe(response.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch wardrobe items');
            }
        };

        fetchWardrobe();
    }, [userId]);

    const groupedWardrobe = wardrobe.reduce((groups, item) => {
        const category = item.category || 'General';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(item);
        return groups;
    }, {});

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
                Your Wardrobe
            </Typography>
            {Object.keys(groupedWardrobe).map((category) => (
                <Box key={category} sx={{ mb: 4, width: '100%', maxWidth: '900px' }}>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            color: '#d63384',
                            mb: 2,
                            textAlign: 'left',
                            fontWeight: 'bold',
                            fontStyle: 'italic', 
                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {category}
                    </Typography>
                    <Grid container spacing={3}>
                        {groupedWardrobe[category].map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item._id}>
                                <Card
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: 3,
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.3s ease',
                                        position: 'relative',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            component="p"
                                            sx={{ color: '#d63384', fontWeight: 'bold', mb: 1 }}
                                        >
                                            {item.type || 'Unknown Type'}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            sx={{ color: '#4a4a4a', mb: 1 }}
                                        >
                                            <strong>Description:</strong> {item.description || 'No description'}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            sx={{ color: '#4a4a4a', mb: 1 }}
                                        >
                                            <strong>Color:</strong>{item.color || 'Unknown Color'}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            sx={{ color: '#4a4a4a', mb: 1 }}
                                        >
                                            <strong>Season:</strong> {item.season || 'Unknown Season'}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            sx={{ color: '#4a4a4a' }}
                                        >
                                            <strong>Occasion:</strong> {item.category || 'General'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    );
};

export default WardrobeList;
