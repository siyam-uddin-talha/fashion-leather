import React from 'react'
import { Container, Skeleton } from '@mui/material'
import { Box } from '@mui/system'

const CatagoryLoadin = () => {
    return (

        <Container component="main" maxWidth="md" sx={{ m: '0' }} >
            <div className="wrapper_ CatagoryLoadin d-flex j-c-c a-i-c gap-4 f-d-c">
                {Array.from(new Array(4)).map((item, index) => (
                    <Box key={index} width={'100%'} marginRight={1}>
                        <div className="d-flex gap-3">
                            <Skeleton variant="rectangular" animation='pulse' width={`6rem`} height={100} sx={{ borderRadius: 1 }} />

                            <Skeleton variant="rectangular" animation='pulse' width={`100%`} height={100} sx={{ borderRadius: 1 }} />
                        </div>
                    </Box>
                ))}
            </div>
        </Container>

    )
}

export default CatagoryLoadin
