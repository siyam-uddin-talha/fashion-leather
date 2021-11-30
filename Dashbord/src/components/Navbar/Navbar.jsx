import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Slider from './Slider'


const mdTheme = createTheme();

function DashboardContent() {

    const [mobileBarOpen, setMobileBarOpen] = React.useState(false)

    return (
        <ThemeProvider theme={mdTheme}>
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
                            sx={{ mr: 2, }}
                            onClick={() => setMobileBarOpen(!mobileBarOpen)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"

                        >
                            Fashion Leather
                        </Typography>

                    </Toolbar>
                    <Slider open={mobileBarOpen} setClose={setMobileBarOpen} />
                </AppBar>


            </Box>

        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}