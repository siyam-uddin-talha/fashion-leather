import React from 'react'
import { Container, Skeleton } from '@mui/material'
import { Box } from '@mui/system'

const Loading = () => {
    return (
        <div className="item_loading_ border-bottom">
            <Container>
                <div className="wrapper_ loading d-flex j-c-c a-i-c gap-4">
                    {Array.from(new Array(4)).map((item, index) => (
                        <Box key={index} width={220} marginRight={1} py={8}>
                            <Skeleton variant="rectangular" animation='pulse' width={`100%`} height={140} />
                        </Box>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Loading
