import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';


export default function Breadcrumb({ title }) {
    return (
        <div role="presentation" className='Breadcrumb px-5' >
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/">
                    Home
                </Link>

                <Typography>{title}</Typography>
            </Breadcrumbs>
        </div>
    );
}
