import { Container } from '@mui/material'
import React from 'react'

const Empty = ({ title }) => {
    return (
        <Container component="main" maxWidth="md" className='emty_wrapper d-flex a-i-c j-c-c f-d-c' >
            <div className="svg_wrapper col-sm-4 col-6">
                <img src="/image/emty.svg" className='img-fluid' alt="" />
            </div>
            <div className="title_wrapper mt-5 c-gray">
                <h4>
                    {title}
                </h4>
            </div>
        </Container>
    )
}

export default Empty
