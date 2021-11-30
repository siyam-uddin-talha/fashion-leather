import React, { useCallback, useEffect } from 'react'

import { BsBell } from 'react-icons/bs'
import { Badge, IconButton, Popper } from '@mui/material'
import Box from '@mui/material/Box';


import UseGetData from '../../api/UseGetData';
import { useDispatch, useSelector } from 'react-redux';


export default function Notifications() {

    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { login, notify } = useSelector(state => state.NotificationReducer)

    const GetNotification = useCallback(async () => {
        try {
            const { data } = await UseGetData(`/api/home/notifications`)
            const { message, userNotification } = data

            if (data) {
                if (userNotification) dispatch({ type: `LOGIN_AND_NOTIFICATION_SUCCESS`, payload: [] })

                if (userNotification && userNotification.length > 0) {
                    dispatch({ type: `LOGIN_AND_NOTIFICATION_SUCCESS`, payload: userNotification[0].notifications })
                }
            }
            if (message === 'not login') dispatch({ type: `LOGIN_REQIRED` })
        } catch (error) {
            console.log(error.message)
        }

    }, [dispatch]
    )

    useEffect(() => {
        GetNotification()
    }, [GetNotification, dispatch])



    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;



    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <IconButton onClick={handleClick}
                    size="medium"
                    aria-label="show new notifications"
                    color="inherit">

                    <Badge badgeContent={notify.length > 0 ? notify.length : 0} color="primary">
                        <BsBell />
                    </Badge>
                </IconButton>

            </Box>
            <Popper id={id} open={open} anchorEl={anchorEl} placement='bottom-start'>
                <Box sx={{ border: 1, p: 2, bgcolor: 'background.paper', color: '#565656' }}  >

                    {login ? (notify.length !== 0 ? notify.map((e, i) => {
                        return <Box key={i} sx={{ cursor: 'pointer', display: 'flex', gap: 1, alignItems: 'center', my: 1 }} className='poper_lwos' >
                            <Box  >
                                {e.title}
                            </Box>
                        </Box>
                    }) : <Box className='poper_lwos' >
                        <Box  >
                            You don't have any notification
                        </Box>
                    </Box>) : <Box className='poper_lwos' >
                        <Box  >
                            You Are not login
                        </Box>
                    </Box>

                    }

                </Box>



            </Popper>
        </React.Fragment >
    );
}
