import React, { useEffect, useState } from 'react'
import UseGetData from '../../api/UseGetData'
import BreadCrumbs from '../singleComponents/BreadCrumbs'
import CatagoryLoading from '../Loading/CatagoryLoading';
import { Link } from 'react-router-dom';
import { BiBasket, BiStore } from 'react-icons/bi';
import { Container } from '@mui/material';

const ProductByCatagory = () => {

    const [catagory, setcatagory] = useState([])
    const [loading, setloading] = useState(true)

    const GetData = async () => {
        const { data } = await UseGetData('/api/products')
        if (data.success) {
            setloading(false)
            const _catagory = data.products.map(e => e.catagory)
            setcatagory(_catagory)
        } else {
            setloading(true)
            setcatagory([])
        }
    }
    useEffect(() => {
        GetData()
    }, [])


    if (loading) {
        return <CatagoryLoading />
    }


    return (
        <section className='sec-pad'>
            <div className="alkl-brad mb-5">
                <BreadCrumbs title={'catagorys'} />
            </div>

            <Container>
                <div className="row">
                    <div className="cartagory_wrapper ">
                        <div className="catagory_body d-flex gap-4 f-w-w">
                            {catagory.length !== 0 && catagory.map((e, index) => {
                                return <figure className={index % 2 === 0 ? `single_catagory bg-11` : `single_catagory bg-10`} key={`${e}${index.toString()}`} >
                                    <Link to={`/product/search/${e}`} className='t-d-n gray' >
                                        <figcaption>
                                            <div className="svg_container mb-3">
                                                {index % 2 === 0 ? <BiStore /> : <BiBasket />}
                                            </div>
                                            <h6>  {e}</h6>
                                        </figcaption>
                                    </Link>
                                </figure>
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default ProductByCatagory
