import React from 'react'
import { Container } from '@mui/material';
import SideTabs from '../SideBar';
import PublicSettings from './PublicSettings';

const MySettings = () => {


    return (
        <section>
            <Container maxWidth="xl" sx={{ mb: 4, mt: 4 }} >
                <div className="row">
                    <SideTabs item={1} />
                    <PublicSettings />
                </div>
            </Container>
        </section>
    )
}

export default MySettings
