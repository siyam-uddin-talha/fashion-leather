import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'



export default function Orders({ displayMonth }) {

    const history = useHistory()

    const [allOrders, setAllOrders] = useState([])

    const { loading, orders } = useSelector(state => state.ProductReducer)


    useEffect(() => {
        const month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]

        // const AlldateInArray = orders.map(e => e.timeStamp)
        const AlldateInArray = orders.map(e => e.createdAt)

        const allDate = [
            ...AlldateInArray.map(e => {
                return `${new Date(e).getDate()} ${month[new Date(e).getMonth()]} ${new Date(e).getFullYear()}`

            }),
        ]
        const orderWithDate = orders.map((e, i) => {
            return {
                ...e,
                date: allDate[i]
            }
        })

        setAllOrders(orderWithDate)

    }, [orders])


    const sentToSingleOrder = (e) => {
        if (e.purches) return
        history.push(`/single-order/details/${e._id}`)
    }

    if (loading) {
        return <h2>
            Loading....
        </h2>
    }

    return (
        <React.Fragment>
            <Title>Recent Orders of {displayMonth}</Title>
            <Table size="small" className='order_table_' >
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell className='d-none d-md-block' >Email</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allOrders.map((row) => (
                        <TableRow key={row._id} onClick={() => sentToSingleOrder(row)} style={{ background: ` ${row.purches ? "#38d13875" : 'initial'}` }} >
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
            <Link color="primary" to="/order/sucess" sx={{ mt: 3 }}>
                See your all delivar order
            </Link>
        </React.Fragment>
    );
}