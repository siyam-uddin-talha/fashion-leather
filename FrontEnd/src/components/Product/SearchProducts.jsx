import { Container } from '@mui/material';
import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router'
import UseGetData from '../../api/UseGetData'
import SingleProduct from '../Animated/ShowSingleProduct'
import ProductLoading from '../Loading/ProductLoading';
import BreadCrumbs from '../singleComponents/BreadCrumbs'
import Emety from '../singleComponents/Emety'


const SearchProducts = () => {
    const { search } = useParams()

    const [SearchProdutc, setSearchProdutcs] = React.useState([])
    const [loading, setSloading] = React.useState(true)

    const GetDataToDisplay = useCallback(async () => {

        const { data } = await UseGetData('/api/products')
        if (data.success) {

            const produchSercth = (searchValue, Products) => {
                return Products.filter(e => {
                    const regex = new RegExp(searchValue, 'gi')
                    var wordInLine = "";
                    e.keywords.map(e => wordInLine = wordInLine + " " + e)
                    return wordInLine.match(regex) || e.catagory.match(regex) || e.title.match(regex)
                })
            }

            const _product = produchSercth(search, data.products).map(item => {
                const { title, totalReviewCount, images, price, ratingScore, _id, createdAt, discountPrice, stock, stockCount } = item
                const thumb = images[0]
                return {
                    title, totalReviewCount, thumb, price, ratingScore, _id, createdAt, discountPrice, stock, qty: 1, stockCount
                }
            })
            setSloading(false)
            return setSearchProdutcs(_product)
        } else {
            setSloading(false)

            setSearchProdutcs([])
        }
    }, [search]
    )
    useEffect(() => {
        GetDataToDisplay()
    }, [GetDataToDisplay])


    if (loading) {
        return <ProductLoading />
    }
    if (SearchProdutc.length === 0) {
        return <Emety title={`Sorry there is no product for ${search}`} />
    }
    return (
        <section className="sec-pad  bg-w-s pt-4">
            <div className="breadCruimb_akljsdkfj py-3 border-bottom">
                <BreadCrumbs title={'Search Reasult'} />
            </div>
            <div className="how_meny_product">
                <Container>
                    <div className="wrapper aksjdflawj border-bottom py-4 mb-5">
                        <h6>
                            {`${SearchProdutc.length} items found for "${search}"`}
                        </h6>
                    </div>
                </Container>
            </div>
            <SingleProduct item={SearchProdutc} />
        </section>
    )
}

export default SearchProducts
