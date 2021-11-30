import React from 'react'
import { Container, Skeleton } from '@mui/material'
import { Box } from '@mui/system'

const Loading = () => {
    return (
        <div className="item_loading_">
            <Container>
                <div className="wrapper_ loading d-flex j-c-c a-i-c gap-4 f-w-w">
                    {Array.from(new Array(4)).map((item, index) => (
                        <Box key={index} width={270} marginRight={1} py={8}>
                            <Skeleton variant="rect" width={`100%`} height={150} />
                            {(
                                <Box pt={0.5}>
                                    <Skeleton animation='wave' />
                                    <Skeleton width="60%" />
                                </Box>
                            )}
                        </Box>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Loading
