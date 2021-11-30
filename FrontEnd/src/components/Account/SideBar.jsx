import { List, ListItemButton, ListItemText, } from '@mui/material'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

import { CgBorderAll, CgAttribution } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";

const NavgitaLinks = [
    {
        title: 'Account',
        path: '',
        icon: <ManageAccountsOutlinedIcon />
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <AiOutlineSetting />

    },
    {
        title: 'My Orders',
        path: '/orders',
        icon: <CgBorderAll />
    },
    {
        title: 'My Cancalations',
        path: '/cancle-products',
        icon: <CgAttribution />

    },
]


const SideBar = ({ item }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(item ? item : 0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <>
            {window.innerWidth > 818 ? <Box sx={{ width: '12rem', borderRight: '1px solid #ddd' }} maxWidth='sm' >
                <List component="nav" aria-label="side bar" >
                    {
                        NavgitaLinks.map((e, i) => {
                            return <ListItemButton key={i} selected={selectedIndex === i}
                                onClick={(event) => handleListItemClick(event, i)} >

                                <Link to={`/my/account${e.path}`} className={'acc t-d-n c-black a-hover'} >

                                    <ListItemText primary={e.title} />

                                </Link>
                            </ListItemButton>
                        })
                    }
                </List>

            </Box> : <BottomNavigator selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />}

        </>
    )
}

const BottomNavigator = ({ selectedIndex, setSelectedIndex }) => {

    const history = useHistory()

    const pushToLocation = (path) => {
        history.push(`/my/account${path}`)
    }

    return (
        <Box sx={{ width: '100%' }} className >
            <BottomNavigation
                showLabels
                value={selectedIndex}
                onChange={(event, newValue) => {
                    setSelectedIndex(newValue);
                }}
            >
                {NavgitaLinks.map((e, i) => {
                    return <BottomNavigationAction label={e.title} icon={e.icon} key={i} onClick={() => pushToLocation(e.path)} />
                })}


            </BottomNavigation>
        </Box>
    );
}


export default SideBar
