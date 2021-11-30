import React from 'react'
import { Container } from '@mui/material';
import SideTabs from '../SideBar';
import CancleOrders from './CancleOrders';

const App = () => {


    return (
        <section className='dfge'>
            <Container maxWidth="xl" sx={{ py: 4 }} >
                <div className="row">
                    <SideTabs item={3} />
                    <CancleOrders />
                </div>
            </Container>
        </section>
    )
}

export default App
