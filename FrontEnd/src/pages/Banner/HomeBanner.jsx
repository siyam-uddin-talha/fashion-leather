import { Container } from '@mui/material'
import React from 'react'
import HomeBannerCarousel from '../../components/singleComponents/HomeBannerCarousel'
import { Carousel } from 'react-responsive-carousel';


const HomeBanner = () => {

    const BannerContent = [
        {
            h3: `premium comfort`,
            p: `Find your faviortie leather items just click`,
            img: `images/b-1.png`
        },
        {
            h3: `save money`,
            p: `More at low price`,
            img: `images/b-2.png`
        },
        {
            h3: `Made in bangladesh`,
            p: `Use your own country products`,
            img: `images/b-3.png`
        },

    ]

    return (
        <section className='home_banner bg-w-s pb-5 pt-5'>
            <Container maxWidth="lg">
                <Carousel showThumbs={false} showArrows={false} showStatus={false} infiniteLoop={true} >
                    {BannerContent.map((e, i) => <HomeBannerCarousel h3={e.h3} p={e.p} img={e.img} key={i} />)}
                </Carousel>

            </Container>
        </section>
    )
}

export default HomeBanner
