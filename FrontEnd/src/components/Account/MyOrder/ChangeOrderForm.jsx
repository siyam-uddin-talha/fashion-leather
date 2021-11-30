import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import ShowSmallAlert from '../../singleComponents/ShowSmallAlert'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from "@mui/material";

import Paper from '@mui/material/Paper';
import UsePutData from '../../../api/UsePutData'
import BackDropLoading from "../../Loading/BackDropLoading";


export default function AddressForm({ shippingInfo, id }) {


    const { user } = useSelector(state => state.User)

    const [loading, setLoading] = useState(false)

    const [useForm, setuseForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        note: "",
        phoneNo: "",
    });

    useEffect(() => {
        setuseForm(
            {
                firstName: user.firstName ? user.firstName : "",
                lastName: user.lastName ? user.lastName : "",
                address: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                zip: shippingInfo.zip,
                note: shippingInfo.note,
                phoneNo: shippingInfo.phoneNo,
            }
        )
    }, [shippingInfo.address, shippingInfo.city, shippingInfo.note, shippingInfo.phoneNo, shippingInfo.state, shippingInfo.zip, user.firstName, user.lastName])

    const [message, setMessage] = useState({
        open: false,
        message: ''
    })

    const [error, setError] = useState({
        input: false,
        button: true, //
    })


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
                setMessage({
                    open: true,
                    message: 'Your Shipping charge is ৳ 100'
                })
            } else {
                setMessage({
                    open: true,
                    message: 'Your Shipping charge is ৳ 200'
                })

            }
        }
        else if (!useForm.state && name === 'city') {
            const smallLetter = value.toLocaleLowerCase()

            const isItCapital = smallLetter.match("dhaka") // "dhaka" is the capital of bangladesh
            if (isItCapital !== null) {

                setMessage({
                    open: true,
                    message: 'Your Shipping charge is ৳ 100'
                })
            } else {
                setMessage({
                    open: true,
                    message: 'Your Shipping charge is ৳ 200'
                })

            }
        }
        const { firstName, lastName, address, city, state, zip, note, phoneNo, } = useForm


        if (firstName && lastName && address && city && state && zip && note && phoneNo.length > 9 && phoneNo.length < 13) {
            setError({
                ...error,
                button: false
            });
            return;
        } else {
            setError({
                ...error,
                button: true
            });
        }



    };

    const handleEdit = async () => {
        setLoading(true)
        try {

            const { data } = await UsePutData(`/api/order/my/orders/${id}`, useForm)
            if (data.success) {
                setError({
                    ...error,
                    button: true
                });
            }


            setLoading(false)

        } catch (error) {
            setLoading(false)

            setMessage({
                open: true,
                message: 'Error is occur'
            })
        }
    }


    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>


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
                            onClick={handleEdit}

                            sx={{ mt: 3, ml: 1 }}

                        >
                            Edit
                        </Button>
                    </Box>


                </React.Fragment>
                <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
            </Paper>

            {loading && <BackDropLoading />}

        </Container>
    );
}
