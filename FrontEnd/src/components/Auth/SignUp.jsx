import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UsePostData from '../../api/UsePostData'
import { useHistory } from 'react-router';
import ShowSmallAlert from '../singleComponents/ShowSmallAlert';
import validator from 'validator';
import { Link } from 'react-router-dom';




const theme = createTheme();

export default function SignUp() {

    const history = useHistory()



    const [message, setMessage] = React.useState({
        open: false,
        message: ''
    })

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const firstName = data.get('firstName')
        const lastName = data.get('lastName')
        const email = data.get('email')
        const password = data.get('password')
        const dateOfBirth = data.get('dateOfBirth')

        if (!firstName || !lastName || !email || !password || !dateOfBirth) {
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

        if (getAge(dateOfBirth) < 18) {
            setMessage({
                open: true,
                message: 'Your age should be more then 18'
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
            const { data } = await UsePostData('/user/signup', {
                firstName,
                lastName,
                email,
                password,
                dateOfBirth,

            })


            if (data.success) {
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
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

                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    name="dateOfBirth"

                                    type="date"
                                    id="dateOfBirth"

                                    autoComplete="new-dateOfBirth"
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
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/user/login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
            </Container>

        </ThemeProvider>
    );
}