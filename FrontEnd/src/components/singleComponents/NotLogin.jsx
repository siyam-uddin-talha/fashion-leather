import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotLogin = () => {
    return (
        <section className='sec-pad' >
            <Container>
                <div className="row j-c-c a-i-c">

                    <Grid item xs={6} md={8} className='d-flex j-c-c a-i-c f-d-c gap-5' flexDirection='column'>
                        <Typography variant='h4' >
                            Opps... you are not login
                        </Typography>
                        <Grid className="img_wrapper" width='20rem'>
                            <img src="/images/lost_online.svg" className='img-fluid' alt="lost..." />
                        </Grid>
                        <Grid className="login_button" width='13rem'  >
                            <Link to='/user/login' className='t-d-n' >
                                <Button variant='outlined' color='error' fullWidth>
                                    Login
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>

                </div>
            </Container>
        </section>
    )
}

export default NotLogin
