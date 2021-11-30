import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useHistory } from 'react-router';
import { RiAdminLine, RiHome6Line } from "react-icons/ri";

const actions = [
    { icon: <RiHome6Line />, name: 'Home', path: '/' },
    { icon: <AddOutlinedIcon />, name: 'Add Product', path: '/create-new/product' },
    { icon: <RiAdminLine />, name: 'Add Admin', path: '/admin/register' },

];

export default function SpeedDialPad() {


    const history = useHistory()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleDialClick = (path) => {
        history.push(path)
    }

    return (
        <Box sx={{
            transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed',
            bottom: '1rem',
            right: ' 1rem',
            height: ' 100vh !important'
        }}>

            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen={window.innerWidth > 778 ? false : true}
                        onClick={() => handleDialClick(action.path)}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
