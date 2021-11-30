import React, { useCallback, useEffect, useState } from 'react'
import UseGetData from '../../api/UseGetData'

import SingleProduct from '../../components/Animated/ShowSingleProduct'
import { useDispatch, useSelector } from 'react-redux'
import { AllProductFail, AllProductSuccess } from '../../Redux/Actions/AllProductAction'

import ProductLoading from '../../components/Loading/ProductLoading';


const DisplayProducts = () => {
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch()
    const state = useSelector(state => state.AllProductReducer)

    const GetDataToDisplay = useCallback(async () => {
        const res = await UseGetData('/api/products')
        if (res.data.success) {
            dispatch(AllProductSuccess(res.data.products))
            setloading(false)
        } else {
            dispatch(AllProductFail())
        }
    }, [dispatch]
    )
    useEffect(() => {
        GetDataToDisplay()
    }, [GetDataToDisplay])


    if (loading) {
        return <ProductLoading />
    }

    return (
        <section className="sec-pad display_product_sector lskw bg-w-s border-top">
            <SingleProduct item={state.products} />
        </section>
    )
}

export default DisplayProducts
