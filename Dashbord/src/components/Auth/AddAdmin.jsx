import React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useHistory } from 'react-router';
import ShowSmallAlert from '../Single/ShowSmallAlert';
import validator from 'validator';
import UsePostData from '../../Hooks/UsePostData';




const theme = createTheme();

export default function SignUp() {

    const history = useHistory()



    const [message, setMessage] = React.useState({
        open: false,
        message: ''
    })


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);


        const userName = data.get('userName')
        const email = data.get('email')
        const password = data.get('password')


        if (!userName || !email || !password) {
            setMessage({
                open: true,
                message: 'Please fill the input'
            })
            return;
        }
        if (!validator.isEmail(email) || email.split("@")[0].length < 5) {
            setMessage({
                open: true,
                message: 'Please enter a valid email'
            })
            return;
        }

        if (password.length < 8) {
            setMessage({
                open: true,
                message: 'Your Password should be more then 8'
            })
            return;
        }
        try {
            const { data } = await UsePostData('/api/admin/register', {
                userName,
                email,
                password,
            })

            console.log(data)

            if (data.success) {
                setMessage({
                    open: true,
                    message: 'New Admin is created'
                })

                history.push('/')
            }
            else if (data.message === `user exist! try to login`) {
                setMessage({
                    open: true,
                    message: 'use already exist! try new one'
                })
            }
            else {
                setMessage({
                    open: true,
                    message: 'Error try to refresh'
                })
            }

        } catch (error) {
            setMessage({
                open: true,
                message: 'Error try to refresh'
            })
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >


                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="given-name"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="user name"
                                    autoFocus
                                    variant="standard"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add new Admin
                        </Button>

                    </Box>
                </Box>
                <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
            </Container>

        </ThemeProvider>
    );
}