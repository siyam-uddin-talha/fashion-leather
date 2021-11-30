import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UseGetData from '../../api/UseGetData'
import { BiBasket, BiStore } from "react-icons/bi";
import CatagoryLoading from '../../components/Loading/CatagoryLoading';


const Catagorys = () => {

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
            <Container>
                <div className="row">
                    <div className="cartagory_wrapper ">
                        <div className="seeMore_links mb-4">
                            <div className="lkaalioow">
                                <Link to='/all/catagorys' className='links-cata t-d-n c-gray f-f-san-pro hover-underline' >see all catagory</Link>
                            </div>
                        </div>
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
                            }).slice(0, 3)}
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Catagorys
