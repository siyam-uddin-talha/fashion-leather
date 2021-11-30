import { Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import NotLogin from '../../../components/singleComponents/NotLogin'
import CartProductSingle from './CartProductSingle'
import CartSummery from './CartSummery'
import Emety from '../../../components/singleComponents/Emety'


const CartProduct = () => {

    const AddToCartReducer = useSelector(state => state.AddToCartReducer)


    const { login, cart } = AddToCartReducer

    if (!login) {
        return <NotLogin />
    }

    if (cart.length === 0) {
        return <section className='sec-pad' >
            <Emety title='Your Bag in Empty' />
        </section>
    }

    return (
        <section className='sec-pad bg-w-s cart_section list_view' >
            <Container>
                <div className="row j-c-s-b gap-3 md-j-c-c">
                    <div className="col-md-7 col-sm-10 col-12 d-flex f-d-c gap-4 j-c-c">
                        <div className="cart_heading_title text-upper mb-5">
                            <h4>
                                shopping cart
                            </h4>
                        </div>

                        <CartProductSingle cart={cart} />
                    </div>
                    <div className="col-md-4 col-sm-10 col-11">
                        <div className="wrapper_ d-flex f-d-c bg-w px-3 py-3 gap-2">
                            <div className="cart_heading_title text-upper mb-4">
                                <h4>
                                    cart total
                                </h4>
                            </div>
                            <CartSummery />
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default CartProduct
