import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddWardrobeItem from './components/addWardrobeItem';
import OutfitSuggestion from './components/outfitSuggestion';
import WardrobeList from './components/wardrobeList';
import './components/welcomPage.css';
import './global.css';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/add-item" element={<AddWardrobeItem />} />
                <Route path="/outfit-suggestion" element={<OutfitSuggestion userId="12345" />} />
                <Route path="/wardrobe-list" element={<WardrobeList userId="12345" />} />
            </Routes>
        </div>
    );
};

const WelcomePage = () => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                mt: 0,
                p: 3,
                backgroundImage: `url('/images/clothing-pattern.png')`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    color: '#d63384',
                    mb: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    p: 2,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                    backgroundImage: 'linear-gradient(45deg, #ff7eb3, #d63384)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                }}
            >
                Welcome to StyleMaite
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {[
                    { text: 'Add a Wardrobe Item', to: '/add-item' },
                    { text: 'Give Me an Outfit Suggestion', to: '/outfit-suggestion' },
                    { text: 'View Current Wardrobe', to: '/wardrobe-list' },
                ].map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: 2,
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                p: 2,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    sx={{
                                        color: '#4a4a4a',
                                        mb: 2,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {item.text}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={item.to}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#d63384',
                                        '&:hover': {
                                            backgroundColor: '#b02a6b',
                                            transform: 'scale(0.95)',
                                            transition: 'transform 0.3s ease',
                                        },
                                    }}
                                >
                                    Go
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default App;
