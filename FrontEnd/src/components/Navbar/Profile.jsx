import React, { useCallback, useEffect } from 'react'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Popper from '@mui/material/Popper';


import Logout from '@mui/icons-material/Logout';

import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import UseGetData from '../../api/UseGetData'
import { BiUser } from 'react-icons/bi';
import { FiLogIn } from 'react-icons/fi';



export default function AccountMenu() {

    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const dispatch = useDispatch()
    const { login } = useSelector(state => state.User)


    const GetUser = useCallback(async () => {
        try {
            const res = await UseGetData(`/api/home/`)
            if (res) {
                dispatch({ type: `USER_SUCCESS`, payload: res.data })
            }
            if (res.data.message === 'not login') dispatch({ type: `USER_FAIL` })
        } catch (error) {
            console.log(error.message)
        }

    }, [dispatch]
    )

    useEffect(() => {
        GetUser()
    }, [GetUser, dispatch])






    const handleUserAccount = async (link) => {
        try {
            if (link === '/user/out') {

                const logout = await UseGetData('/user/logout')
                if (logout.data) {
                    window.location = '/'
                } else {
                    console.log('error in logout ');
                }
            } else {

                history.push(link)
            }
            setAnchorEl(null);

        } catch (error) {
            console.log(error);
        }

    }

    const ManuItems = [
        {
            title: 'My account',
            icon: <BiUser />,
            path: '/my/account'
        },
        {
            title: 'Log out',
            icon: <Logout />,
            path: '/user/out'
        },

    ]

    return (
        <React.Fragment>

            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        {<Avatar sx={{ width: 32, height: 32 }}></Avatar>}

                    </IconButton>
                </Tooltip>
            </Box>

            <Popper id={id} open={open} anchorEl={anchorEl} placement='bottom-start'>
                <Box sx={{ border: 1, p: 2, bgcolor: 'background.paper', color: '#565656' }}  >

                    {login ? ManuItems.map((e, i) => {
                        return <Box key={i} sx={{ cursor: 'pointer', display: 'flex', gap: 1, alignItems: 'center', mb: 1 }} onClick={() => handleUserAccount(e.path)} className='poper_lwos' >
                            <Box className='lskjflw' >
                                {e.icon}
                            </Box>
                            <Box  >
                                {e.title}
                            </Box>
                        </Box>
                    }) : <Box sx={{ cursor: 'pointer', display: 'flex', gap: 1, alignItems: 'center', }} onClick={() => history.push('/user/login')} className='poper_lwos' >
                        <Box className='lskjflw' >

                            <FiLogIn />
                        </Box>
                        <Box  >
                            Log in
                        </Box>
                    </Box>}

                </Box>



            </Popper>
        </React.Fragment>
    );
}