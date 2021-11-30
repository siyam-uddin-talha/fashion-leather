import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, } from "framer-motion";
import "./SingleProduct.css";
import { Container, IconButton } from "@mui/material";
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';

import { Link } from "react-router-dom";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { BsArrow90DegRight, } from "react-icons/bs";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";

import UsePostData from "../../api/UsePostData";
import { useDispatch, useSelector } from "react-redux";
import { AddToFavAction } from "../../Redux/Actions/AddToFavAction";
import ShowSmallAlert from '../singleComponents/ShowSmallAlert';
import { AddToCartAction } from "../../Redux/Actions/AddToCartAction";
import BackDropLoading from '../Loading/BackDropLoading';


const SingleProduct = ({ item }) => {

    return (

        <Container>
            <AnimateSharedLayout>
                <motion.div className='aoao-fashion row j-c-f-s' >
                    {item.length !== 0 && item.map((item, index) => {
                        return <Item key={index} props={item} />
                    })}
                </motion.div>
            </AnimateSharedLayout>
        </Container>
    );
}

function Item({ props }) {
    const { thumb, } = props

    return (

        <motion.div className="single_product_wrapper col-lg-3 col-md-4 col-11 col-sm-5  " style={{ cursor: 'pointer' }} >
            <motion.div className="product_branding_ img_container" >
                <img src={thumb} alt="thumb" className='img-fluid' />
            </motion.div>
            {<Content props={props} />}
        </motion.div>

    );
}

function Content({ props }) {

    const { title, discountPrice, price, _id, ratingScore, totalReviewCount, thumb, stockCount, qty, stock } = props

    const dispatch = useDispatch()

    const varients = {
        visible: { opacity: 1, }
    }

    const [message, setMessage] = useState({
        open: false,
        message: ''
    })

    const [backDropLoading, setBackDropLoading] = useState(false)

    const AddToCartReducer = useSelector(state => state.AddToCartReducer)
    const AddToFavoriteReducer = useSelector(state => state.AddToFavoriteReducer)

    const AddCart = async (payload) => {
        setBackDropLoading(true)
        try {
            const res = await UsePostData('/api/home/cart', payload)

            if (res.data.message === 'not login') {
                setMessage({
                    open: true,
                    message: 'You are not login'
                })

            }
            else if (res.data.success) {
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
            }
            else if (res.data.success) {
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

    const IsInCart = AddToCartReducer.cart.some(e => e._id === _id)
    const IsInFavorite = AddToFavoriteReducer.favorite.some(e => e._id === _id)


    return (
        <>

            <motion.div
                layout initial={{ opacity: 0, }} animate='visible' variants={varients} exit={{ opacity: 0, }} className='popup_item pt-3 f-d-c a-i-c j-c-c border-top bg-w'>
                <div className="Product_title price_ ">
                    <div className="name_title">
                        <Link to={`/single/product/${_id}`} className='t-d-n hover-underline d-flex gap-3 item_link a-i-c' >
                            <span className='title_span' >{title}</span>
                            <div className="alowaw">
                                <BsArrow90DegRight />
                            </div>
                        </Link>
                    </div>
                    <div className="price d-flex gap-3 mt-2">
                        {discountPrice && <span className='price_span c-gray'>৳{price - discountPrice}</span>}

                        <span className='price_span c-red'> <del>৳{price}</del> </span>
                    </div>
                </div>
                <div className="IconWrappers d-flex gap-3 j-c-c mt-2">
                    <div className="add_to_cart">


                        <IconButton color="default" aria-label="add to shopping cart" size='medium' onClick={() => AddCart({
                            _id,
                            discountPrice, thumb, price, title, stockCount, qty, stock
                        })} >
                            {IsInCart ? <HiShoppingCart /> : <HiOutlineShoppingCart />}



                        </IconButton>


                    </div>
                    <div className="add_toFavourite">


                        <IconButton color="default" aria-label="add to shopping love" size='small' onClick={() => AddFavorite({
                            _id,
                            discountPrice, thumb, price, title, stockCount, qty, stock
                        })} >
                            {IsInFavorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}

                        </IconButton>


                    </div>
                </div>


                {<div className="ratting_container d-flex gap-3 j-c-c bg-w">
                    <div className="star_wraper">
                        <Tooltip title={`${ratingScore} start`} arrow >
                            <span>
                                <Rating name="read-only" defaultValue={ratingScore} precision={0.5} readOnly size="small" />
                            </span>
                        </Tooltip>
                    </div>
                    <div className="people_ratting_number">
                        <span className='c-gray weight-500' >
                            ({totalReviewCount})
                        </span>
                    </div>
                </div>}
            </motion.div>
            <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />

            {backDropLoading && <BackDropLoading />}
        </>
    );
}

export default SingleProduct