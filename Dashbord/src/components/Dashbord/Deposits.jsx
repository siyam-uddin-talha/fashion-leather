import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import UseGetData from '../../Hooks/UseGetData';
import { useState } from 'react';
import { useEffect } from 'react';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {

    // const { loading, products, orders } = useSelector(state => state.ProductReducer)

    const [depositCashOrders, setDepositCashOrders] = useState([])
    const [displayMonth, setDisplayMonth] = useState("")

    const GetInfo = React.useCallback(async () => {
        try {
            const { data } = await UseGetData('/api/admin/all-orders/cash')

            if (data.success) {
                setDepositCashOrders(data.orders)
            } else {
                setDepositCashOrders([])
            }
        } catch (error) {
            console.log(error)
        }
    }, []
    )

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
        const currentTimes = new Date()
        const curr_year = currentTimes.getFullYear()
        const curr_month = currentTimes.getMonth()

        const futureDate = new Date(curr_year, curr_month,)
        let mon = futureDate.getMonth()
        setDisplayMonth(month[mon])
    }, [])

    React.useEffect(() => {
        GetInfo()
    }, [GetInfo])



    return (
        <React.Fragment>
            <Title>Deposits</Title>
            <Typography component="p" variant="h4">
                ৳{depositCashOrders.reduce((acc, e) => acc + e.totalPrice, 0)}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Deposites of {displayMonth}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View balance
                </Link>
            </div>
        </React.Fragment>
    );
}