import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import SearchBar from './SearchBar';

import Profile from './Profile'
import CartItems from './CartItems'
import FavoriteItems from './FavoriteItems'
import Notifications from './Notifications';
import MobileBar from './MobileBar';



export default function AppHeader() {

    const [mobileBarOpen, setMobileBarOpen] = useState(false)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='app_header' style={{
                background: 'white',
                color: '#606688',
                boxShadow: 'none',
            }} >
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                        onClick={() => setMobileBarOpen(!mobileBarOpen)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Fashion Leather
                    </Typography>

                    <SearchBar />

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <CartItems />
                        <FavoriteItems />
                    </Box>
                    <Notifications />
                    <Profile />

                </Toolbar>
                <MobileBar open={mobileBarOpen} setClose={setMobileBarOpen} />
            </AppBar>


        </Box>
    );
}