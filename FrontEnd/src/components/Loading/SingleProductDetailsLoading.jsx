import React from 'react'
import { Container, Skeleton } from '@mui/material'
import { Box } from '@mui/system'

const CatagoryLoadin = () => {
    return (

        <section className='sec-pad' >
            <Container component="main" maxWidth="md" >
                <div className="wrapper_ CatagoryLoading d-flex gap-5 f-w-w md-j-c-c">

                    <Box width={'20rem'} >
                        <div className="d-flex gap-3">
                            <Skeleton variant="rectangular" animation='wave' width={`100%`} height={250} sx={{ borderRadius: 1 }} />
                        </div>
                    </Box>

                    <Box width={'23rem'} >
                        <div className="d-flex gap-3 f-d-c">

                            <Skeleton variant="rectangular" animation='wave' width={`70%`} height={35} sx={{ borderRadius: 1 }} />

                            <Skeleton variant="rectangular" animation='wave' width={`100%`} height={25} sx={{ borderRadius: 1 }} />

                            <Skeleton variant="rectangular" animation='wave' width={`50%`} height={20} sx={{ borderRadius: 1 }} />
                            <Skeleton variant="rectangular" animation='wave' width={`50%`} height={20} sx={{ borderRadius: 1 }} />
                            <div className="d-flex gap-3">
                                <Skeleton variant="rectangular" animation='wave' width={`50%`} height={50} />

                                <Skeleton variant="rectangular" animation='wave' width={`50%`} height={50} />
                            </div>
                        </div>
                    </Box>

                </div>
            </Container>

        </section>
    )
}

export default CatagoryLoadin
