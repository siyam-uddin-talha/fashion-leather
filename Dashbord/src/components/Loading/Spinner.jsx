import React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
    return (
        <Stack className='d-flex j-c-c a-i-c ' sx={{ height: `100vh` }} >
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="primary" />
            </Stack>
        </Stack>
    );
}
