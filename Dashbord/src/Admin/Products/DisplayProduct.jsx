import { Container, IconButton, Snackbar } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BackDropLoading from '../../components/Loading/BackDropLoading';
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import Spinner from '../../components/Loading/Spinner'
import UseGetData from '../../Hooks/UseGetData';
import UseDeleteData from '../../Hooks/UseDeleteData';
import UsePutData from '../../Hooks/UsePutData';
import Empty from '../../components/Single/Empty';

const DisplayProduct = () => {


    const [backDropLoading, setBackDropLoading] = useState(false)
    const [loading, setloading] = useState(true)
    const [confirmDeleteOpen, setconfirmDeleteOpen] = useState(false)

    const [displayProducts, setdisplayProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])


    const GetProducts = useCallback(async () => {
        try {
            const { data } = await UseGetData('/api/admin//all-products')
            if (data.success) {
                setdisplayProducts(data.products)
                setloading(false)
            } else {
                setdisplayProducts([])
                setloading(false)
            }
        } catch (error) {
            setloading(false)
        }
    }, []
    )

    useEffect(() => {
        GetProducts()
    }, [GetProducts])


    useEffect(() => {
        if (selectedProducts.length !== 0) {
            setconfirmDeleteOpen(true)
        } else {
            setconfirmDeleteOpen(false)
        }
    }, [selectedProducts])


    const SetProducttoDelelet = (event, id) => {

        if (event.currentTarget.checked) setSelectedProducts([
            ...selectedProducts, id
        ])
        if (!event.currentTarget.checked) {
            const notSeleted = selectedProducts.filter(e => e !== id)
            setSelectedProducts(notSeleted)
        }
    }

    const DeleteProducts = async () => {
        setconfirmDeleteOpen(false)
        setBackDropLoading(true)

        try {
            if (selectedProducts.length === 1) {
                const { data } = await UseDeleteData(`/api/admin/modify-product/${selectedProducts[0]}`)
                if (data.success) {
                    setBackDropLoading(false);
                    setconfirmDeleteOpen(false)
                    GetProducts()
                }

            } else {
                const { data } = await UsePutData(`/api/admin/modify-product/`, { ids: selectedProducts })


                if (data.success) {
                    setBackDropLoading(false);
                    setconfirmDeleteOpen(false);
                    GetProducts()
                }

            }

        } catch (error) {
            setconfirmDeleteOpen(false)
            setBackDropLoading(false)
            GetProducts()
        }
    }

    if (loading) {
        return <Spinner />
    }

    if (displayProducts.length === 0) {
        return <section className='sec-pad'>
            <Empty title='We dont have any porducts' />
        </section>
    }


    return (
        <section className='sec-pad' >


            <div className="snackbar_container">
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: "right" }}
                    open={confirmDeleteOpen}
                    action={<IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => DeleteProducts()}
                    >
                        <AiFillDelete fontSize="big" />
                    </IconButton>}
                    message="Delete"

                />
            </div>


            <Container maxWidth='md' >
                <div className="row d-flex f-d-c">
                    <>
                        {displayProducts.map(e => {
                            const { title, discountPrice, price, _id, images, stock, stockCount } = e
                            return (<div className="single_products d-flex a-i-c j-c-s-b border-bottom pb-4 gap-2" key={_id} >

                                <div className="delet_this_form_cart">

                                    <input type="checkbox" name="cartItem" id="cart_item_select" onChange={(event) => SetProducttoDelelet(event, _id)} />

                                </div>
                                <div className="single_cart_branding d-flex gap-3 touch-gap-2">
                                    <div className="img_container">

                                        <img src={images[0]} alt="thumb" />

                                    </div>
                                    <div className="product_title d-flex a-i-c">
                                        <div className='t-d-n c-black a-hover text-upper touch-small weight-500' >
                                            {title}
                                        </div>
                                    </div>
                                </div>
                                <div className="sasfdwsfs px-2 py-1" style={{ background: `${stock ? 'rgb(184 229 184)' : 'rgb(239 145 145)'}`, borderRadius: '.2rem' }} >
                                    <span className="weight-500" >
                                        {stock ? 'in stock' : 'out stock'}
                                    </span>
                                </div>
                                <div className="fav_pro touch-none">
                                    <span>
                                        x {stockCount}
                                    </span>
                                </div>
                                <div className="touch-none">
                                    <span>
                                        ৳{price - discountPrice}
                                    </span>
                                </div>

                                <div className=" touch-none">
                                    <Link to={`/single/product/edit/${_id}`} >
                                        <IconButton aria-label="edit" color="error"  >
                                            <AiOutlineEdit />
                                        </IconButton>
                                    </Link>
                                </div>

                            </div>)
                        })}
                    </>
                </div>


                {backDropLoading && <BackDropLoading />}
            </Container>

        </section>
    )
}

export default DisplayProduct
