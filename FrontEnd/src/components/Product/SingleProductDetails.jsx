import React, { useCallback, useEffect, useState, } from 'react'
import { useParams } from 'react-router'
import UseGetData from '../../api/UseGetData'
import BreadCrumbs from '../singleComponents/BreadCrumbs'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux'
import { SingleProductSuccess, SingleProductFail } from '../../Redux/Actions/SingleProductAction'

import { AddToCartAction } from '../../Redux/Actions/AddToCartAction'
import { AddToFavAction, } from '../../Redux/Actions/AddToFavAction'
import UsePostData from '../../api/UsePostData'
import SingleProductComponent from './SingleProductComponent'
import BackDropLoading from '../Loading/BackDropLoading';
import SingleProductDetailsLoading from '../Loading/SingleProductDetailsLoading';
import ShowSmallAlert from '../singleComponents/ShowSmallAlert'

import SingleProductReview from './SingleProductReview';
import SingleProductDescription from './SingleProductDescription';
import Emety from '../singleComponents/Emety'


const SingleProductDetails = () => {
    const { id } = useParams()

    const [message, setMessage] = useState({
        open: false,
        message: ''
    })
    const [backDropLoading, setBackDropLoading] = useState(false)

    const dispatch = useDispatch()


    const SingleProductReducer = useSelector(state => state.SingleProductReducer)
    const AddToCartReducer = useSelector(state => state.AddToCartReducer)
    const AddToFavoriteReducer = useSelector(state => state.AddToFavoriteReducer)


    const GetDataToDisplay = useCallback(async () => {
        const res = await UseGetData(`/api/products/${id}`)

        if (res.data.success && res.data.products !== null) {
            dispatch(SingleProductSuccess({ ...res.data.products }))
        } else {
            dispatch(SingleProductFail())
        }
    }, [id, dispatch]
    )


    useEffect(() => {
        GetDataToDisplay()
    }, [id, GetDataToDisplay])


    const AddCart = async (payload) => {
        setBackDropLoading(true)
        try {
            const res = await UsePostData('/api/home/cart', payload)

            if (res.data.message === 'not login') {
                setMessage({
                    open: true,
                    message: 'You are not login'
                })

            } else {
                dispatch(AddToCartAction(res.data.cart.cartItems))
            }
            setBackDropLoading(false)

        } catch (error) {
            setBackDropLoading(false)

            setMessage({
                open: true,
                message: 'Error Try again'
            })
        }

    }

    const AddFavorite = async (payload) => {
        setBackDropLoading(true)

        try {
            const res = await UsePostData('/api/home/favorite', payload)
            if (res.data.message === 'not login') {
                setMessage({
                    open: true,
                    message: 'You are not login'
                })
            } else {
                dispatch(AddToFavAction(res.data.favorite.favoriteItems))

            }
            setBackDropLoading(false)

        } catch (error) {
            setBackDropLoading(false)
            setMessage({
                open: true,
                message: 'Error Try again'
            })
        }

    }

    const increaseFun = () => {
        dispatch({ type: `INCREASE_THE_SINGLE_PRODUCT` })
    }
    const decraseFun = () => {
        dispatch({ type: `DECRASE_THE_SINGLE_PRODUCT` })
    }


    const { catagory, } = SingleProductReducer.product

    const IsInCart = AddToCartReducer.cart.some(e => e._id === id)
    const IsInFavorite = AddToFavoriteReducer.favorite.some(e => e._id === id)

    if (SingleProductReducer.loading) {
        return <SingleProductDetailsLoading />
    }
    if (Object.keys(SingleProductReducer.product).length === 0) {
        return <section className='sec-pad bg-w single_product_sector' >
            <Emety title={`No product found #${id}`} />
        </section>
    }


    return (
        <section className='sec-pad bg-w single_product_sector' >
            <BreadCrumbs title={catagory} />

            <Container maxWidth='lg' >
                <SingleProductComponent props={SingleProductReducer.product} AddCart={AddCart} AddFavorite={AddFavorite} IsInCart={IsInCart} IsInFavorite={IsInFavorite} increaseFun={increaseFun} decraseFun={decraseFun} />


                {SingleProductReducer.product.description.length !== 0 && <SingleProductDescription title={SingleProductReducer.product.title} description={SingleProductReducer.product.description} />}

                <SingleProductReview reviews={SingleProductReducer.product.reviews} title={SingleProductReducer.product.title} id={id} totalReviewCount={SingleProductReducer.product.totalReviewCount} />
            </Container>



            <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />

            {backDropLoading && <BackDropLoading />}
        </section>
    )
}

export default SingleProductDetails
