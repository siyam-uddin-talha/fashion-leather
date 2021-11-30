import React from 'react'
import { Container, Grid, Skeleton } from '@mui/material'

const AccountSettingLoading = () => {
    return (
        <div className="item_loading_ border-bottom">
            <Container>
                <div className="wrapper_ AccountSettingLoading d-flex j-c-c a-i-c gap-4">

                    <Grid marginRight={1} py={8}>
                        <Skeleton variant="circular" animation='wave' width={`5rem`} height={140} />
                    </Grid>
                    <Grid xs={12} sm={6} marginRight={1} py={8}>
                        <Skeleton variant="rectangular" animation='wave' width={`100%`} height={140} />
                    </Grid>
                    <Grid xs={12} sm={6} marginRight={1} py={8}>
                        <Skeleton variant="rectangular" animation='wave' width={`100%`} height={140} />
                    </Grid>

                </div>
            </Container>
        </div>
    )
}

export default AccountSettingLoading
