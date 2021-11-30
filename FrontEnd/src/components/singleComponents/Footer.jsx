import React from 'react'
import { Container } from '@mui/material'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';


const Footer = () => {

    // const footer = useRef(null)



    // useEffect(() => {
    //     const thePreviousElem = footer.current?.previousElementSibling
    //     console.log(thePreviousElem);
    // }, [])


    const gateWayMethods = [
        { img: '/images/amex.png' },
        { img: '/images/master.png' },
        { img: '/images/visa.png' },
        { img: '/images/cod.png' },
    ]

    const CustomarService = [
        { link: '/contact-us', title: 'Contact us' },
        { link: '/terms-and-condition', title: 'Terms and condition' },

    ]

    const Catagorys = [
        { link: '/product/search/', title: "Money Bag" },
        { link: '/product/search/', title: 'Office Bag' },
        { link: '/product/search/', title: 'File Bag' },
        { link: '/product/search/', title: 'Holder Bag' },

    ]


    return (<>
        <Box component='footer' sx={{ pt: '5rem', }} className='footer_alkj bg-w border-top' >
            <Container maxWidth='lg' >
                <div className="row">
                    <div className="col-md-4 col-sm-5 col-12 mt-4 payment_gateway_photos">
                        <div className="f_title">
                            <h5>Payment Methods</h5>
                        </div>
                        <div className="asldkwoasg sadgjwo d-flex j-c-s-b">
                            {gateWayMethods.map((e, i) => {
                                return <div className="single_aljgw" key={i}>
                                    <img src={e.img} alt="..." />
                                </div>
                            })}
                        </div>
                    </div>

                    <div className="col-md-4 col-sm-5 col-12 mt-4">
                        <div className="f_title">
                            <h5>Customar service</h5>
                        </div>
                        <div className="heiway">
                            <ul className="single_heiway">
                                {CustomarService.map((e, i) => {
                                    return <li key={i}> <Link to={e.link} className='f_links' >
                                        {e.title}
                                    </Link></li>
                                })}

                            </ul>
                        </div>
                    </div>

                    <div className="col-md-4 col-sm-5 col-12 mt-4">
                        <div className="f_title">
                            <h5>Catagorys</h5>
                        </div>
                        <div className="heiway">
                            <ul className="single_heiway">
                                {Catagorys.map((e, i) => {
                                    return <li key={i}> <Link to={`/product/search/${e.title}`} className='f_links' >
                                        {e.title}
                                    </Link></li>
                                })}

                            </ul>
                        </div>
                    </div>

                </div>

            </Container>
            <div className="copyrignt border-top py-2">
                <Container maxWidth='lg' >
                    <div className="ssadfw d-flex j-c-s-b gap-3">
                        <div className="alj">
                            <h5 >
                                © 2021 Fashion Leater, All Rights Reserved
                            </h5>
                        </div>
                        <div className="powerby">
                            <h5>
                                Power by <i>
                                    <a target='_blank' rel="noreferrer" href="https://mr-lighthouse-bd.netlify.app/">
                                        Mr Light house
                                    </a>
                                </i>
                            </h5>
                        </div>
                    </div>

                </Container>
            </div>
        </Box>


    </>
    )
}

export default Footer
