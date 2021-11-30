import { IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import { ImCross } from "react-icons/im";
const MobileBar = ({ open, setClose }) => {

    const NavLinks = [
        { link: '/', title: 'Home', delay: 0.22 },
        { link: '/all-products', title: 'All Products', delay: 0.57 },
        { link: '/my/favorites', title: 'My Favorite', delay: 0.79 },
        { link: '/contact-us', title: 'Contact us', delay: 0.9 },
    ]

    return (
        <Box className={open ? `navbar_mobile open_the_mobile_bar` : "navbar_mobile"} >
            <div className="cross_bku d-flex j-c-f-e ">
                <div className="kaoiwa p-4">
                    <IconButton
                        size="small"
                        color="info" onClick={() => setClose(!open)} >
                        <ImCross />
                    </IconButton>
                </div>
            </div>
            <nav>
                <div className="navbar_wrapper d-flex a-i-c j-c-c">
                    <ul className='ul_nav d-flex f-d-c' >
                        {NavLinks.map((e, i) => {
                            return <li key={i} style={{ transitionDelay: `${e.delay}s` }} onClick={() => setClose(!open)} >
                                <Link to={e.link} className='t-d-n f-f-san-pro weight-600' >
                                    {e.title}
                                </Link>
                            </li>
                        })}
                    </ul>
                </div>
            </nav>
        </Box>
    )
}

export default MobileBar
