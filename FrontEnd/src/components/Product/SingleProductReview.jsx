import React, { useCallback, useEffect, useState } from 'react'
import UseGetData from '../../api/UseGetData'

import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';
import BackDropLoading from '../Loading/BackDropLoading';
import { useSelector } from 'react-redux';
import UsePostData from '../../api/UsePostData';
import Rating from '@mui/material/Rating';
import ShowSmallAlert from '../singleComponents/ShowSmallAlert'
import { Container } from '@mui/material';

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





const SingleProductReview = ({ title, reviews, id, totalReviewCount }) => {


    const [canUserAddReview, setcanUserAddReview] = useState(false)

    const [reviewContent, setReviewContent] = useState('')

    const [message, setMessage] = useState({
        open: false,
        message: ''
    })


    const [backDropLoading, setBackDropLoading] = useState(false)
    const [value, setValue] = React.useState(5);

    const { user } = useSelector(state => state.User)

    const IsThisProductPurchesTheUser = useCallback(async () => {
        try {
            const { data } = await UseGetData(`/api/products/add-review/${id}`)

            if (data.message === 'not login') {
                setcanUserAddReview(false)
            }
            else if (data.response === null) {
                setcanUserAddReview(false)
            }
            else if (data.response.purches === true) {
                const IsThisUserAlreadyAddReview = reviews.some(e => e.reviewId === user._id)

                if (IsThisUserAlreadyAddReview) {
                    setcanUserAddReview(false)
                }
                if (!IsThisUserAlreadyAddReview) {
                    setcanUserAddReview(true)
                }
            }
        } catch (error) {
            setMessage({
                open: true,
                message: 'Error Try again'
            })
        }

    }, [id, user._id, reviews]
    )


    useEffect(() => {
        IsThisProductPurchesTheUser()
    }, [IsThisProductPurchesTheUser,])



    const HandleSubmit = async (e) => {
        e.preventDefault()
        setBackDropLoading(true)


        if (value === 0) {
            setMessage({
                open: true,
                message: '1 star required'
            })
            return
        }

        const onlyStarts = []
        if (reviews.length === 0) {
            onlyStarts.push(value)
        } else {
            reviews.forEach(e => {
                onlyStarts.push(e.reviewRating)
                if (onlyStarts.length === reviews.length) {
                    onlyStarts.push(value)
                }
            })
        }



        var count = 0;
        var sum = onlyStarts.reduce(function (sum, item, index) {
            count += item;
            return sum + item * (index + 1)
        }, 0);

        const totalRate = (sum / count);
        const fixTo = Number(totalRate.toFixed(1))

        try {
            const { data } = await UsePostData(`/api/products/add-review/${id}`, {
                reviews: [
                    ...reviews,
                    {
                        reviewerName: `${user.firstName} ${user.lastName}`,
                        reviewId: user._id,
                        reviewerphotoUrl: user.photoUrl,
                        reviewRating: value,
                        reviewContent

                    }],
                ratingScore: fixTo,
                totalReviewCount: totalReviewCount += 1
            }
            )
            if (data.success) {
                setcanUserAddReview(false)

            } else {
                setMessage({
                    open: true,
                    message: 'Error Try again'
                })
            }
            setBackDropLoading(false)
        } catch (error) {
            setMessage({
                open: true,
                message: 'Error Try again'
            })
        }
    }

    if (reviews.length === 0) {
        return <NoReviews title={title} canUserAddReview={canUserAddReview} value={value} setValue={setValue} HandleSubmit={HandleSubmit} setReviewContent={setReviewContent} backDropLoading={backDropLoading} message={message} setMessage={setMessage} />
    }


    return (
        <>
            <div className="review_all_contnet bg-w-s mt-4 pb-4">
                <div className="title_of_description f-f-san-pro p-3">
                    <h5>
                        {`Ratings & Reviews of ${title}`}
                    </h5>
                </div>

                <div className="review-content-wrapper d-flex f-d-c gap-3">
                    {reviews.map((e, i) => {
                        return e.reviewContent &&
                            <div className="single_review border-top p-3" key={e._id}>
                                <Container component='main' maxWidth='md'  >
                                    <div className="branding asjgswdeghwaeg d-flex j-c-s-b">

                                        <div className="name_image_of_review d-flex a-i-c gap-3">
                                            <div className="image_box">
                                                <img src={e.reviewerphotoUrl || "/images/default.jpg"} alt="review user" />
                                            </div>
                                            <div >
                                                <span className="name_lajw f-f-san-pro weight-500" >
                                                    {e.reviewerName}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="star_rating_container">
                                            <Rating
                                                name="simple-controlled"
                                                value={e.reviewRating}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="review_cot mt-3">
                                        <span className='f-f-san-pro' >
                                            {e.reviewContent}
                                        </span>
                                    </div>
                                </Container>
                            </div>


                    })}
                </div>

            </div>
            {
                canUserAddReview &&
                <div className="write_review p-3">
                    <div className="wratting_container">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>
                    <div className="review_wite_wrapper">
                        <form onSubmit={HandleSubmit} className='form_lkajjwg d-flex' >
                            <div className="input_wrapper">
                                <input type="text" placeholder='Write your single commnet...' className='review_input_write f-f-san-pro' onChange={(e) => setReviewContent(e.target.value)} />
                            </div>
                            <div className="submit_button">
                                <CustomButton type='submit' >
                                    Add review
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {backDropLoading && <BackDropLoading />}
            <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />

        </>
    )
}


const NoReviews = ({ title, canUserAddReview, value, setValue, HandleSubmit, setReviewContent, backDropLoading, message, setMessage }) => {
    return <>
        <div className="wrapper__ mt-4 bg-w-s">
            <div className="title_of_description f-f-san-pro p-3">
                <h5>
                    {`Ratings & Reviews of ${title}`}
                </h5>
            </div>
            <div className="lasjwgar f-f-san-pro p-3" >
                <h4>
                    Opps... <br />
                    We don't have any review yet
                </h4>
            </div>
            {canUserAddReview &&
                <div className="write_review p-3">
                    <div className="wratting_container">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>
                    <div className="review_wite_wrapper">
                        <form onSubmit={HandleSubmit} className='form_lkajjwg d-flex'>
                            <div className="input_wrapper">
                                <input type="text" placeholder='Write your single commnet...' className='review_input_write f-f-san-pro' onChange={(e) => setReviewContent(e.target.value)} />
                            </div>
                            <div className="submit_button">
                                <CustomButton type='submit' >
                                    Add review
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
        {backDropLoading && <BackDropLoading />}
        <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />

    </>
}



export default SingleProductReview
