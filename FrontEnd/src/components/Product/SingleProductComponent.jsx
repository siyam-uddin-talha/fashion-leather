import React from 'react'
import { Button, Rating, } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import IncreaseDecreaseQty from '../singleComponents/Increase_DecreaseQty'

import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';


const CustomButtonRoot = styled('button')`
  background-color: #007fff;
  padding: 10px 13px;
  height:100%;
  font-family: 'Source Sans Pro', sans-serif;
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




const SingleProductComponent = ({ props, AddCart, AddFavorite, IsInCart, IsInFavorite, increaseFun, decraseFun }) => {


    const { catagory, discountPrice, images, price, title, stockCount, _id, qty, stock, ratingScore, totalReviewCount } = props

    return (

        <div className="row">
            <div className="single__view__body p-0" key={_id}>
                <div className="single_view_wrapper d-flex gap-4 f-w-w j-c-c" >
                    <div className="photos_container">
                        <Carousel showArrows={false} showStatus={false} showIndicators={false} >
                            {images.map((e, index) => {
                                return <img src={e} className='img-fluid' alt="" key={index} />
                            })}
                        </Carousel>

                    </div>
                    <div className="single_overview__">
                        <div className="single_view_name text-capitlize f-f-san-pro">
                            <h1>  {title}</h1>
                        </div>
                        <div className="single_products_brand mt-3 f-f-san-pro">
                            <h5>
                                catagory: <Link to={`/products/catagory/brands/${catagory}`} className='t-d-n hover-underline' >{catagory}</Link>
                            </h5>
                        </div>
                        <div className="wratting_contianer mt-3">

                            <div className="ratting_container d-flex gap-3">
                                <div className="star_wraper">

                                    <Rating name="read-only" defaultValue={ratingScore} precision={0.5} readOnly size="small" />

                                </div>
                                <div className="people_ratting_number">
                                    <span className='c-gray weight-500' >
                                        ({totalReviewCount})
                                    </span>
                                </div>
                            </div>


                        </div>
                        <div className="single_price my-3 weight-500">
                            <span className='me-3'>
                                ৳{price - discountPrice}
                            </span>
                            <span >
                                <del>৳{price}</del>
                            </span>


                        </div>

                        <div className="single_product_qty_wrapper d-flex gap-2">
                            <div className="inclease_decreade_btn">
                                <IncreaseDecreaseQty increaseFun={increaseFun} decraseFun={decraseFun} qty={qty} id={_id} />
                            </div>
                            <div className="add_to_cart_container">
                                <CustomButton onClick={() =>
                                    AddCart({
                                        _id,
                                        discountPrice, thumb: images[0], price, title, stockCount, qty, stock
                                    })
                                } >
                                    {IsInCart ? "Remove from cart" : "Add to cart"}
                                </CustomButton>
                            </div>
                        </div>

                        <div className="user_buskets mt-4" >

                            <div className="add_to_fav">
                                <Button onClick={() =>
                                    AddFavorite({
                                        _id,
                                        discountPrice, thumb: images[0], price, title, stockCount, qty
                                    })
                                }
                                    startIcon={IsInFavorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                                >
                                    {IsInFavorite ? "Remove from fav" : "Add to fav"}

                                </Button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleProductComponent
