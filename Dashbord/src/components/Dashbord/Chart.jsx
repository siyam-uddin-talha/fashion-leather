import React, { useEffect, useState } from 'react';

// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, PieChart, Cell, Pie } from 'recharts';

// import Title from './Title';
import UseGetData from '../../Hooks/UseGetData';
import { useDispatch, useSelector } from 'react-redux';
import Title from './Title';
// import { colors } from '@mui/material';



// Generate Sales Data
function createData(name, value) {
    return { name, value };
}


export default function Chart() {

    const [data, setdata] = useState([])

    const dispatch = useDispatch()
    const [displayMonth, setDisplayMonth] = useState("")

    const { loading, products, orders } = useSelector(state => state.ProductReducer)

    const GetInfo = React.useCallback(async () => {
        try {
            const { data } = await UseGetData('/api/admin/all-products')
            if (data.success) {
                dispatch({ type: 'PRODUCT_SUCCESS', payload: data.products })
            } else {
                dispatch({ type: 'FAIL' })
            }
        } catch (error) {
            console.log(error)
        }
    }, [dispatch]
    )



    useEffect(() => {

        const orderThoseAreProcceing = orders.filter(e => e.orderStatus === 'processing')
        const orderThoseAreDelivered = orders.filter(e => e.orderStatus === 'delivered')
        const cancleOrder = orders.filter(e => e.cancle)

        const AllDatas = [

            createData('orders', orders.length),
            createData('procceing orders', orderThoseAreProcceing.length),
            createData('delivered orders', orderThoseAreDelivered.length),
            createData('cancle orders', cancleOrder.length),
        ]

        setdata(AllDatas)

    }, [orders, products])


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


    const colors = ["rgb(141, 209, 225)", "rgb(131, 166, 237)", "rgb(208, 237, 87)", "rgb(130, 202, 157)", "rgb(140,302, 147)", 'rgb(353,124, 117)']

    const productInStock = products.filter(e => e.stock === true)
    const productNotInStock = products.filter(e => e.stock !== true)

    const AllProductInShop = [
        createData('stock products', productInStock.length),
        createData('stock out products', productNotInStock.length),
    ]

    const AllProductInShopColors = ["rgb(141, 209, 225)", "rgb(131, 166, 237)",]

    if (loading) {
        return <h2>
            Loading
        </h2>
    }


    return (
        <>
            <div className='d-flex f-w-w gap-3 md-j-c-c f-d-c'>
                <Title>Product are live</Title>

                <div className='kjjkhj md-j-c-c' >
                    {AllProductInShop.map((e, i) => {
                        return <div className="single_chart" key={i} style={{
                            background: `${AllProductInShopColors[i]}`
                        }}>
                            <div className="akalksf" >
                                <span className='value_ weight-600' >
                                    {`${e.value} `}
                                </span>
                                <span>
                                    {`${e.name}`}
                                </span>
                            </div>
                        </div>
                    })}
                </div>

            </div>
            <div className='d-flex f-w-w gap-3 md-j-c-c f-d-c border-top mt-4'>
                <Title>Order Details of {displayMonth}</Title>

                <div className='kjjkhj md-j-c-c' >
                    {data.map((e, i) => {
                        return <div className="single_chart" key={i} style={{
                            background: `${colors[i]}`
                        }}>
                            <div className="akalksf" >
                                <span className='value_ weight-600' >
                                    {`${e.value} `}
                                </span>
                                <span>
                                    {`${e.name}`}
                                </span>
                            </div>
                        </div>
                    })}
                </div>

            </div>

        </>
    );
}

