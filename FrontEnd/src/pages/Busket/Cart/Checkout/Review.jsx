import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import ChackOut from './ChackOut';
import Paper from '@mui/material/Paper';
import { Button, Container } from "@mui/material";
import { Box } from '@mui/system';
import { useHistory } from 'react-router';


export default function Review() {

    const history = useHistory()

    // product thalt user bye
    const products = sessionStorage.getItem('order') ? JSON.parse(sessionStorage.getItem('order')) : []
    // total bill
    const totalPrice = sessionStorage.getItem('totalPrice') ? JSON.parse(sessionStorage.getItem('totalPrice')) : 0

    // user card/payment information 
    const paymentInfo = sessionStorage.getItem('paymentInfo') ? JSON.parse(sessionStorage.getItem('paymentInfo')) : {}

    // where to ship the product 
    const shippingInfo = sessionStorage.getItem('shippingInfo') ? JSON.parse(sessionStorage.getItem('shippingInfo')) : {}



    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                <ChackOut activeStep={2} />
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Order summary
                    </Typography>
                    <List disablePadding>
                        {products.map((product) => (
                            <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={product.title} />
                                <Typography variant="body2">{`${product.price - product.discountPrice} x ${product.qty}`}</Typography>
                            </ListItem>
                        ))}

                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Shipping cost" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {shippingInfo.shippingPrice}
                            </Typography>
                        </ListItem>

                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Total" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {totalPrice}
                            </Typography>
                        </ListItem>


                    </List>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Delevary
                            </Typography>

                            <Typography gutterBottom>{`${shippingInfo.address} ${shippingInfo.city} ${shippingInfo.state} ${shippingInfo.zip}`}</Typography>
                        </Grid>
                        <Grid item container direction="column" xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                Payment details
                            </Typography>
                            <Grid container>
                                <React.Fragment>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{'Payment Type'}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>
                                            <b>{paymentInfo.method}</b>
                                        </Typography>
                                    </Grid>
                                </React.Fragment>

                                {paymentInfo.brand && <React.Fragment>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{'Card Type'}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>
                                            <b>{paymentInfo.brand}</b>
                                        </Typography>
                                    </Grid>
                                </React.Fragment>}

                                <React.Fragment>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{'Payment Status'}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom> <b>

                                            {paymentInfo.success ? 'Confirm' : "Not confirm"}</b> </Typography>
                                    </Grid>
                                </React.Fragment>

                            </Grid>
                        </Grid>
                    </Grid>
                </React.Fragment>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={() => history.push('/product/order/success')}

                        sx={{ mt: 3, ml: 1 }}

                    >
                        Just one step
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}