import { Container } from '@mui/material';
import React from 'react'
import SideTabs from '../SideBar';
import MyOrdersComponent from './MyOrdersComponent';

const App = () => {


    return (
        <section className='gestedg'>
            <Container maxWidth="xl" sx={{ py: 4 }} >
                <div className="row">
                    <SideTabs item={2} />
                    <MyOrdersComponent />
                </div>
            </Container>
        </section>
    )
}

export default App
