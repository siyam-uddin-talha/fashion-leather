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

const CustomInput = styled(InputBase)(({ theme }) => ({
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

const Input = styled('input')({
    display: 'none',
});




const PublicAccount = () => {

    const { loading, user } = useSelector(state => state.User)

    const [buttonDisable, setButtonDisable] = React.useState(true)
    const [backDrop, setBackDrop] = React.useState(false)

    const [message, setMessage] = React.useState({
        open: false,
        message: ''
    })

    const [userData, setUserData] = React.useState({
        firstName: '',
        lastName: '',
        photoUrl: '',
    })
    const dispatch = useDispatch()





    useEffect(() => {
        setUserData({
            firstName: user.firstName ? user.firstName : '',
            lastName: user.lastName ? user.lastName : '',
            photoUrl: user.photoUrl ? user.photoUrl : '',

        })
    }, [user, dispatch])



    useEffect(() => {
        if (user.firstName !== userData.firstName) {
            setButtonDisable(false)
        }
        else if (user.lastName !== userData.lastName) {
            setButtonDisable(false)

        }
        else if (user.photoUrl !== userData.photoUrl) {
            setButtonDisable(false)

        }
        else {
            setButtonDisable(true)

        }
    }, [userData.firstName, userData.lastName, user.photoUrl, userData.photoUrl, user.firstName, user.lastName])



    const SaveTheChanged = useCallback(async () => {

        if (!buttonDisable) {
            setBackDrop(true)
            const { firstName, lastName } = userData
            try {
                if (userData.photoUrl.length > 150) {
                    const { data } = await UsePostData('/api/home/update-user', {
                        ...userData,
                        _id: user._id,
                    })

                    if (data.success) {
                        dispatch({ type: `USER_UPDATE_SUCCESS`, payload: data.updatedData })
                        setBackDrop(false)

                    } else {
                        setBackDrop(false)

                    }
                } else {
                    const { data } = await UsePostData('/api/home/update-user', {
                        firstName, lastName,
                        _id: user._id,
                    })

                    if (data.success) {
                        dispatch({ type: `USER_UPDATE_SUCCESS`, payload: data.updatedData })
                        setBackDrop(false)
                    } else {
                        setBackDrop(false)

                    }
                }

            } catch (error) {
                setBackDrop(false)
            }
        }

    }, [buttonDisable, userData, user._id, dispatch]
    )


    const HandleUploadFile = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.onloadend = (e) => {
            setUserData({ ...userData, photoUrl: fileReader.result })
        }
        fileReader.readAsDataURL(file)
    }

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
            <Container component="main" maxWidth="sm" sx={{ m: '0', marginBottom: '5rem' }} >

                <Box component="form" sx={{ mt: 3 }} >

                    <Grid container sx={{ my: 3 }} >
                        <Box component='h3' >
                            Public profile
                        </Box>
                    </Grid>

                    <Grid container sx={{ alignItems: 'center', my: 3, gap: 1 }} >
                        <Box className="img_branding" sx={{ width: '5rem', }} >
                            <div className="img_container">
                                <img src={userData.photoUrl ? userData.photoUrl : "/images/default.jpg"} alt="user" className='img-fluid user_public_p' />

                            </div>
                        </Box>
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" className='upload_photo_input' onChange={HandleUploadFile} />
                            <Button color="primary" aria-label="upload picture" component="span" className='change_file bt-pin' >
                                change
                            </Button>
                        </label>
                    </Grid>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard">
                                <InputLabel shrink htmlFor="First-Name">
                                    First name
                                </InputLabel>
                                <CustomInput id="firstName" value={userData.firstName}
                                    name='firstName' onChange={handleUserChanged} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard">
                                <InputLabel shrink htmlFor="Last-Name">
                                    Last Name
                                </InputLabel>
                                <CustomInput id="firstName" value={userData.lastName} name='lastName' onChange={handleUserChanged} />
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

export default PublicAccount
