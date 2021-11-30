import { Container, Grid, Paper, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Chart from './Chart'
import Deposits from './Deposits'
import Orders from './Orders'



const Home = () => {

    const [displayMonth, setDisplayMonth] = useState("")

    useEffect(() => {
        const month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const currentTimes = new Date()
        const curr_year = currentTimes.getFullYear()
        const curr_month = currentTimes.getMonth()

        const futureDate = new Date(curr_year, curr_month,)
        let mon = futureDate.getMonth()
        setDisplayMonth(month[mon])
    }, [])


    return (
        <>
            <Box
                component="main"
                sx={{
                    backgroundColor: "#fff",
                    height: '100vh',

                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pb: 10 }}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',

                                }}
                            >
                                <Chart />
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',

                                }}
                            >
                                <Deposits />
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12} className='order_parents' >
                            <Paper sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                                <Orders displayMonth={displayMonth} />
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        </>
    )
}

export default Home
