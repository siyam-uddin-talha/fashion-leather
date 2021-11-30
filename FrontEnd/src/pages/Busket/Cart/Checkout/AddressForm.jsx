import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import ShowSmallAlert from '../../../../components/singleComponents/ShowSmallAlert'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import { Container } from "@mui/material";
import ChackOut from './ChackOut';
import Paper from '@mui/material/Paper';



export default function AddressForm() {


    const history = useHistory()

    const initialState = sessionStorage.getItem('userForm') ? JSON.parse(sessionStorage.getItem('userForm')) : {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        note: "",
        phoneNo: "",
    }

    const [useForm, setuseForm] = useState(initialState);


    const [message, setMessage] = useState({
        open: false,
        message: ''
    })

    const [error, setError] = useState({
        input: false,
        button: true, //
    })

    const dispatch = useDispatch()


    const handleAddressForm = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        let phoneno = /^\d{11}$/;

        if (name === "phoneNo") {

            setError({
                ...error,
                input: true
            });

            if (value.match(phoneno)) {
                setError({
                    ...error,
                    input: false
                });
                setuseForm({
                    ...useForm,
                    phoneNo: Number(value),
                });
            }
        }
        setuseForm({
            ...useForm,
            [name]: value,
        });

        if (!useForm.city && name === 'state') {
            const smallLetter = value.toLocaleLowerCase()

            const isItCapital = smallLetter.match("dhaka") // "dhaka" is the capital of bangladesh
            if (isItCapital !== null) {
                dispatch({ type: 'USER_FROM_DHAKA' })
                setMessage({
                    open: true,
                    message: 'Your Shipping charge is ৳ 100'
                })
            } else {
                setMessage({
                    open: true,
                    message: 'Your Shipping charge is ৳ 200'
                })
                dispatch({ type: 'USER_IS_NOT_FROM_DHAKA' })
            }
        }
        else if (!useForm.state && name === 'city') {
            const smallLetter = value.toLocaleLowerCase()

            const isItCapital = smallLetter.match("dhaka") // "dhaka" is the capital of bangladesh
            if (isItCapital !== null) {
                dispatch({ type: 'USER_FROM_DHAKA' })
                setMessage({
                    open: true,
                    message: 'Your Shipping charge is ৳ 100'
                })
            } else {
                setMessage({
                    open: true,
                    message: 'Your Shipping charge is ৳ 200'
                })
                dispatch({ type: 'USER_IS_NOT_FROM_DHAKA' })
            }
        }
        const { firstName, lastName, address, city, state, zip, note, phoneNo, } = useForm
        if (firstName && lastName && address && city && state && zip && note && phoneNo.length > 10 && phoneNo.length < 13) {
            setError({
                ...error,
                button: false
            });
        } else {
            setError({
                ...error,
                button: true
            });
        }

    };


    const handleNext = () => {
        sessionStorage.setItem('userForm', JSON.stringify(useForm))
        history.push('/cart/process/payment')
    }


    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                <ChackOut activeStep={0} />
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Shipping address
                    </Typography>
                    <Grid component="form" container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                value={useForm.firstName}
                                onChange={handleAddressForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                value={useForm.lastName}
                                onChange={handleAddressForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                variant="standard"
                                placeholder="e.g Chottogram /Dhaka"
                                required
                                value={useForm.state}
                                onChange={handleAddressForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                                placeholder="e.g Dhaka uttara"
                                value={useForm.city}
                                onChange={handleAddressForm}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address"
                                name="address"
                                label="Address line"
                                fullWidth
                                autoComplete="shipping address-line"
                                variant="standard"
                                placeholder="e.g House#123, Street#123 ABC read"
                                value={useForm.address}
                                onChange={handleAddressForm}
                            />
                        </Grid>



                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                                value={useForm.zip}
                                onChange={handleAddressForm}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={error.input}
                                required
                                id="phoneNo"
                                name="phoneNo"
                                label="phone Number"
                                fullWidth
                                autoComplete="number"
                                variant="standard"
                                type="number"
                                value={useForm.phoneNo}
                                onChange={handleAddressForm}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="note"
                                name="note"
                                label="Note for rider"
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="standard"
                                placeholder="e.g ground florr"
                                value={useForm.note}
                                required
                                onChange={handleAddressForm}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            disabled={error.button}
                            variant="outlined"
                            onClick={handleNext}

                            sx={{ mt: 3, ml: 1 }}

                        >
                            next
                        </Button>
                    </Box>


                </React.Fragment>
                <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
            </Paper>
        </Container>
    );
}
