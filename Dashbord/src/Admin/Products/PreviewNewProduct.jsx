import { Container } from '@mui/material'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));


const PreviewNewProduct = ({ props, setvalue, value }) => {

    const { images, title, discountPrice, price, catagory, stockCount, stock, description, keywords } = props

    const handleKeywordDelete = (id) => () => {

        const remainkeywords = keywords.filter((chip, index) => index !== id)

        setvalue({
            ...value,
            keywords: remainkeywords
        })
    };

    const handleImageDelete = (id) => () => {

        const remainImages = images.filter((chip, index) => index !== id)
        setvalue({
            ...value,
            images: remainImages
        })
    };


    const handleDescriptionDelete = (id) => () => {

        const remainDescription = description.filter((chip, index) => index !== id)
        setvalue({
            ...value,
            description: remainDescription
        })
    };

    return (
        <Container component='div' maxWidth='sm' className='preivew_alkiolksio' sx={{ m: 0 }}  >
            <div className="img_preivw">
                <Carousel showArrows={false} showStatus={false} showIndicators={false} >
                    {images.map((e, index) => {
                        return <img src={e} className='img-fluid' alt="" key={index} />
                    })}
                </Carousel>

                <div className="delete_imageses">
                    {images.length !== 0 &&
                        <Paper
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 0.5,
                                mt: 2,

                            }}
                            component="ul"
                        >
                            {images.map((data, id) => {
                                return (
                                    <ListItem key={id} >
                                        <Chip
                                            avatar={<Avatar alt="..." src={data} />}
                                            label={'photo'}
                                            variant="outlined"
                                            onDelete={handleImageDelete(id)}
                                        />
                                    </ListItem>
                                );
                            })}
                        </Paper>
                    }
                </div>

            </div>

            <div className="title_preivw  priew_">
                <h6>
                    {title}
                </h6>
            </div>
            <div className="catagory_preivw preview_">
                <span>
                    {catagory && `catagory: ${catagory}`}
                </span>
            </div>
            <div className="price_preview preview_">
                <div className="price_total" >
                    {discountPrice && <span className='price_span c-gray'>{`৳${price - discountPrice}`}</span>}
                    {price && <span className='price_span c-red'> <del>{`৳${price}`}</del> </span>}

                </div>
            </div>
            <div className="stock preview_ ">


                <div className="how_meny px-2 me-3" style={{ background: `${stock ? 'rgb(184 229 184)' : 'rgb(239 145 145)'}`, borderRadius: '.2rem' }}>
                    <span>

                        {stock ? "Stock" : "Not stock"}
                    </span>
                </div>
                <div className="is_stock " >
                    <span>
                        {stockCount && `${stockCount} pices`}
                    </span>
                </div>
            </div>
            <div className="keyword_wrapper preview_ my-4 f-d-c a-i-f-s">
                <h6>
                    keywords
                </h6>
                {keywords.length !== 0 &&
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,

                        }}
                        component="ul"
                    >

                        {keywords.map((data, id) => {

                            return (
                                <ListItem key={id} sx={{ fontSize: '1rem' }} >
                                    <Chip

                                        label={data}
                                        onDelete={handleKeywordDelete(id)}
                                    />
                                </ListItem>
                            );
                        })}
                    </Paper>
                }
            </div>
            <div className="delete-description my-4">
                {description.length !== 0 &&
                    <Paper
                        sx={{
                            display: 'flex',

                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0.5,

                        }}
                        component="ul"
                    >
                        {description.map((data, id) => {
                            return (
                                <ListItem key={id} sx={{ fontSize: '1rem' }} >
                                    <Chip
                                        label={data.substring(0, 15)}
                                        onDelete={handleDescriptionDelete(id)}
                                    />
                                </ListItem>
                            );
                        })}
                    </Paper>
                }
            </div>
            <div className="description preview_">
                <div className="list_container p-3">
                    <ul className='description-ul' >
                        {description.map((e, i) => {
                            return <li key={i} >{e}</li>
                        })}
                    </ul>
                </div>
            </div>
        </Container>
    )
}

export default PreviewNewProduct
