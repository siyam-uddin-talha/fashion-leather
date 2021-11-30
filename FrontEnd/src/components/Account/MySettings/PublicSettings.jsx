import React, { useCallback, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import { Backdrop, Button, CircularProgress, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import UsePostData from '../../../api/UsePostData';
import ShowSmallAlert from '../../singleComponents/ShowSmallAlert';

const ContomInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 16,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '2px solid #ddd',
        fontSize: 16,
        width: '100%',
        padding: '10px 16px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `0 0 0 4px rgb(0 132 255 / 50%)`,
            borderColor: `#ddd`,
        },
    },
}));



const PublicSettings = () => {

    const { loading, user } = useSelector(state => state.User)

    const [buttonDisable, setButtonDisable] = React.useState(true)
    const [backDrop, setBackDrop] = React.useState(false)

    const [message, setMessage] = React.useState({
        open: false,
        message: ''
    })

    const [userData, setUserData] = React.useState({
        email: user.email ? user.email : '',
        password: '',
        confirmPassword: '',
    })
    const dispatch = useDispatch()





    useEffect(() => {
        if (userData.password) {
            setButtonDisable(false)
        }
        else if (userData.confirmPassword) {
            setButtonDisable(false)
        }
        else {
            setButtonDisable(true)
        }
    }, [userData.password, userData.confirmPassword])



    const SaveTheChanged = useCallback(async () => {

        if (!buttonDisable) {
            if (userData.password !== userData.confirmPassword) {
                setMessage({
                    open: true,
                    message: 'Password dosent same'
                })
                return
            }
            else if (userData.password.length < 8 || userData.confirmPassword.length < 8) {
                setMessage({
                    open: true,
                    message: 'Password should be morethen 8'
                })
                return
            }
            setBackDrop(true)


            try {
                const { data } = await UsePostData('/api/home/update-user', {
                    _id: user._id,
                    password: userData.confirmPassword
                })

                if (data.success) {
                    dispatch({ type: `UPDATE_SUCCESS` })
                    setBackDrop(false)
                } else {
                    setMessage({
                        open: true,
                        message: 'Error'
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }

    }, [buttonDisable, userData, user._id, dispatch]
    )


    const handleUserChanged = (e) => {
        const name = e.target.name
        const value = e.target.value

        setUserData({
            ...userData,
            [name]: value
        })
    }




    if (loading) {
        return <h1>
            loaidng
        </h1>
    }


    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ m: '0' }} >

                <Box component="form" sx={{ mt: 3 }} >

                    <Grid container sx={{ my: 3 }} >
                        <Box component='h3' >
                            Account settings
                        </Box>
                    </Grid>



                    <Grid container spacing={2}>

                        <Grid item xs={12} >
                            <FormControl variant="standard" sx={{ width: '50%' }} >
                                <InputLabel shrink htmlFor="First-Name">

                                </InputLabel>
                                <ContomInput id="email" value={userData.email}
                                    name='email' onChange={handleUserChanged} disabled />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl variant="standard" sx={{ width: '50%' }} >
                                <InputLabel shrink htmlFor="Last-Name">
                                    Password
                                </InputLabel>
                                <ContomInput id="password" value={userData.password} name='password' onChange={handleUserChanged} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl variant="standard" sx={{ width: '50%' }} >
                                <InputLabel shrink htmlFor="Last-Name">
                                    Confirm Password
                                </InputLabel>
                                <ContomInput id="confirmPassword" value={userData.confirmPassword} name='confirmPassword' onChange={handleUserChanged} />
                            </FormControl>
                        </Grid>

                    </Grid>

                </Box>
            </Container>
            <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, p: 2, background: `#fff`, boxShadow: `0 0 8px 0px #d1d1d1` }} className='save_bar_btn' >
                <Box className='d-flex j-c-c a-i-c ' >
                    <Button variant='outlined' className='bt-pin' disabled={buttonDisable} onClick={SaveTheChanged} >save</Button>
                </Box>
            </Box>
            <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDrop}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default PublicSettings
