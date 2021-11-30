import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";


const HomeBannerCarousel = ({ h3, p, img }) => {


    const controls = useAnimation();
    const [ref, inView] = useInView();


    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);




    return (

        <div className="row p-r justify-content-center align-item-center gap-3 f-w-w-r bg-w py-5 pb-6">
            <div className="banner_branding_title col-md-5 col-12">
                <div className="heading_title">
                    <motion.h3 className="text-upper" ref={ref}
                        animate={controls}
                        initial="hidden"
                        transition={{ type: 'spring', stiffness: 400 }}
                        variants={{
                            visible: { y: '0' },
                            hidden: { y: '-50%' }
                        }}>
                        {h3}
                    </motion.h3>
                    <motion.p className="description" animate={controls}
                        initial="hidden"
                        transition={{ type: 'spring', stiffness: 500 }}
                        variants={{
                            visible: { y: '0' },
                            hidden: { y: '-50%' }
                        }}>
                        {p}
                    </motion.p>
                </div>
            </div>
            <div className="banner_branding_images col-md-5 col-12" >
                <div className="branding_images_wrapper">
                    <div className="img_container" >
                        <motion.img animate={controls}
                            initial="hidden"
                            transition={{ type: 'spring', stiffness: 700 }}
                            variants={{
                                visible: { y: '0' },
                                hidden: { y: '-50%' }
                            }} src={img} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBannerCarousel
