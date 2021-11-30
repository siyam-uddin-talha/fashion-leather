import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useHistory } from 'react-router';
import ShowSmallAlert from '../Single/ShowSmallAlert';
import UsePostData from '../../Hooks/UsePostData'
import { useDispatch } from 'react-redux';
import BackDropLoading from '../Loading/BackDropLoading'

const theme = createTheme();

export default function SignIn() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [backDropLoading, setBackDropLoading] = React.useState(false)
    const [message, setMessage] = React.useState({
        open: false,
        message: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        setBackDropLoading(true)
        const data = new FormData(event.currentTarget);
        try {
            const res = await UsePostData('/api/admin/login', {
                userName: data.get('userName'),
                password: data.get('password'),
            })

            if (res.data.success) {
                dispatch({ type: 'ADMIN_LOGIN_SUCCESS' })
                setBackDropLoading(false)
                setTimeout(() => {
                    history.push('/')
                }, 1000)

            }

            else if (res.data.message === 'not login') {
                setBackDropLoading(false)
                setMessage({
                    open: true,
                    message: 'You are not signup'
                })
            }
            else if (res.data.message === 'Wrong password') {
                setBackDropLoading(false)
                setMessage({
                    open: true,
                    message: 'Wrong password'
                })
            }
            else if (res.data.message === 'admin is not exist') {
                setBackDropLoading(false)
                setMessage({
                    open: true,
                    message: 'Admin is not exist'
                })
            }
            else {
                setBackDropLoading(false)
                setMessage({
                    open: true,
                    message: 'Error try to refresh'
                })
            }
        } catch (error) {
            setBackDropLoading(false)

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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="userName Address"
                            name="userName"
                            autoComplete="userName"
                            autoFocus
                            variant="standard"


                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            variant="standard"

                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>

                    </Box>
                </Box>
                <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
            </Container>
            {backDropLoading && <BackDropLoading />}
        </ThemeProvider>
    );
}