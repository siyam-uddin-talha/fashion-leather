import { Container } from '@mui/material';
import React from 'react'
import SideTabs from '../SideBar';
import PublicAccount from './PublicAccount';

const App = () => {


    return (
        <section>
            <Container maxWidth="xl" sx={{ mb: 4, mt: 4 }} >
                <div className="row">
                    <SideTabs item={0} />
                    <PublicAccount />
                </div>
            </Container>
        </section>
    )
}

export default App
