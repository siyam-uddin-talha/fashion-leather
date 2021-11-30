import React, { useState } from 'react';
import { Button, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import PreviewNewProduct from './PreviewNewProduct'
import UsePostData from '../../Hooks/UsePostData'
import { useHistory } from 'react-router-dom'
import BackDropLoading from '../../components/Loading/BackDropLoading'

const CustomInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
        fontFamily: 'Source Sans Pro',
        fontWeight: 700,

    },
    '& .MuiInputBase-input': {
        borderRadius: 16,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '2px solid #ddd',
        fontSize: 16,
        width: '100%',
        padding: '10px 16px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `0 0 0 4px rgb(0 132 255 / 50%)`,
            borderColor: `#ddd`,
        },
    },
}));
const Input = styled('input')({
    display: 'none',
});




export default function CreatePost() {

    const history = useHistory()

    const [backDropLoading, setBackDropLoading] = useState(false)

    const [value, setvalue] = React.useState({
        title: '',
        //numbers
        price: '',
        discountPrice: '',
        stock: '',
        stockCount: '',
        catagory: '',
        //array 
        keywords: [],
        description: [],
        images: []

    })

    const [complexValue, setComplexValue] = React.useState({
        keywords: '',
        description: '',
    })

    const handleFormValue = (e) => {
        const TheName = e.target.name
        const TheValue = e.target.value
        if (TheName === 'price') {
            setvalue({ ...value, price: Number(TheValue) })
        }

        if (TheName === 'discountPrice') {
            setvalue({ ...value, discountPrice: Number(TheValue) })
        }
        if (TheName === 'stockCount') {
            setvalue({ ...value, stockCount: Number(TheValue) })
        }


        if (TheName === 'stock') {
            const isStock = e.currentTarget.checked

            setvalue({ ...value, stock: isStock })
        }
        else {

            setvalue({ ...value, [TheName]: TheValue })
        }
    }

    const handleImages = (e) => {
        const file = e.target.files
        const fileReader = new FileReader()
        for (const key in file) {
            if (Object.hasOwnProperty.call(file, key)) {
                const element = file[key];
                fileReader.onloadend = (e) => {
                    setvalue({ ...value, images: [...value.images, fileReader.result] })
                }
                fileReader.readAsDataURL(element)
            }
        }
        // setvalue({ ...value, images: [...value.images, file] })
    }

    const handleKeyWordClick = () => {
        if (complexValue.keywords) {
            setvalue({ ...value, keywords: [...value.keywords, complexValue.keywords] })
            setComplexValue({
                keywords: '',
                description: '',
            })
        }
    }

    const DescriptionClick = () => {
        if (complexValue.description) {
            setvalue({ ...value, description: [...value.description, complexValue.description] })
            setComplexValue({
                keywords: '',
                description: '',
            })
        }
    }

    const handleComplexChange = (e) => {
        const complexName = e.target.name
        const newcomplexValue = e.target.value
        if (complexName === 'description') {
            setComplexValue({ ...complexValue, description: newcomplexValue })
        }
        if (complexName === 'keywords') {
            setComplexValue({ ...complexValue, keywords: newcomplexValue })
        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setBackDropLoading(true)
        const { title, price, discountPrice, description, stock, stockCount, catagory, images, keywords } = value
        if (description.length === 0 || keywords.length === 0) {
            return
        }
        try {

            const { data } = await UsePostData('/api/admin/create-new-products', {
                title, price, discountPrice, description, stock, stockCount, catagory, images, keywords, timeStamp: Date.now()
            })
            if (data.success) {
                setBackDropLoading(false)
                history.push('/')
            } else {
                alert('Error to crate product')
                setBackDropLoading(false)
                history.push('/')

            }

        } catch (error) {
            console.log(error.message);
            setBackDropLoading(false)
        }
    }



    return (
        <section className='sec-pad' >
            <Container component="main" maxWidth="lg" className='j-c-s-b f-w-w' sx={{ m: 0, display: 'flex', gap: 2, }} >

                <React.Fragment>
                    <PreviewNewProduct props={{ ...value }} setvalue={setvalue} value={value} />
                </React.Fragment>

                <Container component="div" maxWidth="xs" sx={{ m: 0 }} className={'allwsaf-wrapper from_wrapper'}>
                    <form className={'new-product-create-form'} onSubmit={handleSubmit} >
                        <Grid item xs={12} sx={{ my: '1rem' }} >

                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImages} />
                                <Button variant="outlined" component="span" style={{ border: `1px dashed #777`, padding: '1rem 1.5rem', background: 'none' }} >
                                    Upload
                                </Button>
                            </label>

                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" sx={{ width: '100%' }} >
                                <InputLabel shrink htmlFor="Product Title">
                                    Product Title
                                </InputLabel>
                                <CustomInput id="title" type='text' fullWidth required
                                    name='title' value={value.title} onChange={handleFormValue} />
                            </FormControl>
                        </Grid>


                        <Grid item xs={12}>
                            <FormControl variant="standard" sx={{ width: '100%' }} >
                                <InputLabel shrink htmlFor="Product Price">
                                    Product Price
                                </InputLabel>
                                <CustomInput fullWidth required
                                    name="price"
                                    type="number"
                                    id="price" onChange={handleFormValue} />
                            </FormControl>
                        </Grid>


                        <Grid item xs={12}>
                            <FormControl variant="standard" sx={{ width: '100%' }} >
                                <InputLabel shrink htmlFor="Product discount Price">
                                    Product Discount
                                </InputLabel>
                                <CustomInput
                                    fullWidth required
                                    name="discountPrice"
                                    type="number"
                                    id="discountPrice"
                                    onChange={handleFormValue} />
                            </FormControl>
                        </Grid>


                        <Grid item className="chackbox_wrapper d-flex j-c-s-b a-i-c" sx={{ width: '100%' }} >

                            <Grid item >
                                <FormControl variant="standard" sx={{ width: '100%' }} >
                                    <InputLabel shrink htmlFor="How meny product do you have">
                                        How meny product do you have
                                    </InputLabel>
                                    <CustomInput
                                        fullWidth required
                                        name="stockCount"
                                        type="number"
                                        id="stockCount"
                                        onChange={handleFormValue} />
                                </FormControl>
                            </Grid>
                            <Grid >
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox name="stock" id="stock" onChange={handleFormValue} />} label=" Stock?" sx={{ fontFamily: 'inherit !important' }} />
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl variant="standard" sx={{ width: '100%' }} >
                                <InputLabel shrink htmlFor="Product catagory">
                                    Product Catagory
                                </InputLabel>
                                <CustomInput
                                    fullWidth required
                                    name="catagory"
                                    type="text"
                                    id="catagory"
                                    onChange={handleFormValue} />
                            </FormControl>
                        </Grid>




                        <Grid item xs={12} className='d-flex gap-3 a-i-c j-c-s-b' >
                            <Grid item className='w-90' >
                                <FormControl variant="standard" sx={{ width: '100%' }} >
                                    <InputLabel shrink htmlFor="Keywords to find this product">
                                        Keywords to find this product
                                    </InputLabel>
                                    <CustomInput
                                        fullWidth
                                        name="keywords"
                                        type="text"
                                        id="keywords" value={complexValue.keywords}
                                        onChange={handleComplexChange} />
                                </FormControl>
                            </Grid>


                            <Grid item className="aklskjassf">
                                <Button onClick={handleKeyWordClick} >
                                    Add new
                                </Button>
                            </Grid>
                        </Grid>




                        <Grid item xs={12} className='d-flex gap-3 a-i-c j-c-s-b' >

                            <Grid item className='w-90' >
                                <FormControl variant="standard" sx={{ width: '100%' }} >
                                    <InputLabel shrink htmlFor="First-Name">
                                        Product Description
                                    </InputLabel>
                                    <CustomInput
                                        fullWidth
                                        name="description"
                                        type="text"
                                        id="description" value={complexValue.description}
                                        onChange={handleComplexChange} />
                                </FormControl>
                            </Grid>

                            <Grid item className="aklskjassf">
                                <Button onClick={DescriptionClick} >
                                    Add new
                                </Button>
                            </Grid>
                        </Grid>



                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className='akljd sumbit_btn'
                        >
                            publish
                        </Button>
                    </form>
                </Container>


            </Container>
            {backDropLoading && <BackDropLoading />}
        </section>
    );
}




