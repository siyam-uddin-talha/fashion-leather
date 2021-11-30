import React from 'react';

import Title from './Title';
import UseGetData from '../../Hooks/UseGetData';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';
import Spinner from '../Loading/Spinner'
import Empty from '../Single/Empty'


export default function Deposits() {


    const [allSuccessFulOrders, setallSuccessFulOrders] = useState([])
    const [loading, setloading] = useState(true)

    const GetInfo = React.useCallback(async () => {
        try {
            const { data } = await UseGetData('/api/admin/successful-orders')

            if (data.success) {
                setallSuccessFulOrders(data.orders)
            } else {
                setallSuccessFulOrders([])
            }
            setloading(false)
        } catch (error) {
            setloading(false)
        }
    }, []
    )




    React.useEffect(() => {
        GetInfo()
    }, [GetInfo])

    if (loading) {
        return <Spinner />
    }

    if (allSuccessFulOrders.length === 0) {
        return <section className='sec-pad' >
            <Empty title='You have no order ' />
        </section>
    }

    return (
        <section className='sec-pad' >
            <Container>
                <React.Fragment>
                    <Title>All Order</Title>
                    <Table size="small" className='order_table_' >
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell className='d-none d-md-block'>Email</TableCell>
                                <TableCell>Ship To</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell align="right">Sale Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody  >
                            {allSuccessFulOrders.map((row) => (
                                <TableRow key={row._id} >
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell className='d-none d-md-table-cell' >{row.owner.ownerEmail}</TableCell>
                                    <TableCell>{`${row.shippingInfo.address} ${row.shippingInfo.city}`}
                                        <span className='d-none d-md-block' >
                                            {row.shippingInfo.state}
                                        </span>
                                    </TableCell>
                                    <TableCell>{row.paymentInfo.method}</TableCell>
                                    <TableCell align="right">{`$${row.totalPrice
                                        }`}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </React.Fragment>
            </Container>

        </section>
    );
}