import { Container, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UsePostData from '../../../api/UsePostData'
import { AddToFavAction } from '../../../Redux/Actions/AddToFavAction'

import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

import ShowSmallAlert from '../../../components/singleComponents/ShowSmallAlert';
import BackDropLoading from '../../../components/Loading/BackDropLoading';
import Emety from '../../../components/singleComponents/Emety';
import { AddToCartAction } from '../../../Redux/Actions/AddToCartAction'

const CustomButtonRoot = styled('button')`
  background-color: #007fff;
  padding: 9px 13px;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #004386;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;

function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}


const WishListProductSingle = ({ item }) => {


    const dispatch = useDispatch()

    const AddToCartReducer = useSelector(state => state.AddToCartReducer)

    const [message, setMessage] = useState({
        open: false,
        message: ''
    })

    const [backDropLoading, setBackDropLoading] = useState(false)

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


    const DeletItFromCart = async (payload) => {
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



    if (item.length === 0) {
        return <Emety title='Your wish list is empty' />
    }

    return (
        <Container maxWidth='md' >
            <div className="row d-flex f-d-c">
                <>
                    {item.map(e => {
                        const { title, discountPrice, price, _id, thumb, stock, qty, stockCount } = e
                        return (<div className="single_cart d-flex a-i-c j-c-s-b border-bottom pb-4 gap-2" key={_id} >

                            <div className="delet_this_form_cart">
                                <IconButton
                                    size="small"
                                    color="primary" onClick={() => DeletItFromCart({
                                        _id, discountPrice, thumb, price, title, qty, stock, stockCount
                                    })} >
                                    <RiDeleteBin2Line />

                                </IconButton>
                            </div>
                            <div className="single_fav_branding d-flex gap-3 touch-gap-2">
                                <div className="img_container cart_image cart-touch-img touch-img">
                                    <Link to={`/single/product/${_id}`} className='fav_branding_link t-d-n c-black a-hover' >
                                        <img src={thumb} alt="thumb" />
                                    </Link>
                                </div>
                                <div className="cart_product_title d-flex a-i-c">
                                    <Link to={`/single/product/${_id}`} className='fav_branding_link t-d-n c-black a-hover text-upper touch-small weight-500' >
                                        {title}
                                    </Link>
                                </div>
                            </div>
                            <div className="sasfdwsfs px-2 py-1" style={{ background: `${stock ? 'rgb(184 229 184)' : 'rgb(239 145 145)'}`, borderRadius: '.2rem' }} >
                                <span className="weight-500" >
                                    {stock ? 'in stock' : 'out stock'}
                                </span>
                            </div>
                            <div className="fav_pro touch-none">
                                <span>
                                    ৳{price - discountPrice}
                                </span>
                            </div>
                            <div className="add_to_cart_b">

                                <CustomButton onClick={() => AddCart({
                                    _id,
                                    discountPrice, thumb, price, title, stockCount, qty, stock
                                })} >
                                    {AddToCartReducer.cart.some(e => e._id === _id) ? "Remove cart" : "Add to cart"}

                                </CustomButton>
                            </div>
                        </div>)
                    })}
                </>
            </div>
            <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />

            {backDropLoading && <BackDropLoading />}
        </Container>

    )
}

export default WishListProductSingle
