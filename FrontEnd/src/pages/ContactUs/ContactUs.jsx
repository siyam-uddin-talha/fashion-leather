import { Container } from '@mui/material'
import React from 'react'

import { FiPhoneCall } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
const ContactUs = () => {
    return (
        <section className='sec-pad bg-w' >
            <Container>
                <div className="display_image_wrapper border-bottom pb-5" >
                    <Container maxWidth='sm' className="img_container d-flex a-i-c j-c-c">
                        <img src="images/contactus.svg" alt="contact" />
                    </Container>
                </div>
                <div className="row mt-5">
                    <div className="our_shop_map address_us">
                        <div className="title_address">
                            <h5>
                                Visit our store
                            </h5>
                            <details>
                                <summary>see address</summary>
                                <address>
                                    Road no-5,  shop no-13, Baitul Mukarram market, Dhaka, Bangladesh

                                </address>
                            </details>
                        </div>

                        <div className="wrapper">
                            <iframe title="shop_address" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.5101931761974!2d90.40966681429647!3d23.72917929550518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f7eede883f%3A0x1aa7a0f241a8e468!2sBaitul%20Mukarram%20Shopping%20Complex!5e0!3m2!1sen!2sbd!4v1637745298551!5m2!1sen!2sbd" allowFullScreen loading="lazy"></iframe>
                        </div>
                    </div>
                    <div className="our_factory address_us mt-5">
                        <div className="title_address">
                            <h5>
                                Visit our factory
                            </h5>
                            <details>
                                <summary>see address</summary>
                                <address>
                                    Madrasa road, Mizmizi, Siddirgonj, Narayangoanj, Bangladesh
                                </address>
                            </details>
                        </div>

                        <div className="wrapper">
                            <iframe title="factory address" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14615.433465465729!2d90.49211026250435!3d23.681022507536376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b6dc5a01c597%3A0x50ca28d41351ca43!2sBooks%20Garden%20Housing%20Society!5e0!3m2!1sen!2sbd!4v1637745995368!5m2!1sen!2sbd" allowFullScreen loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </Container>
            <Container maxWidth='md' sx={{ mt: '4rem' }} >
                <div className="wrapper-contect-number d-flex a-i-c j-c-c gap-4">
                    <div className="single_number-box">
                        <div className="icon_wrapper">
                            <FiPhoneCall />
                        </div>
                        <div className="number-wrapper">
                            <h6>
                                01683622576
                            </h6>
                        </div>
                    </div>
                    <div className="single_number-box">
                        <div className="icon_wrapper">
                            <HiOutlineMail />
                        </div>
                        <div className="number-wrapper">
                            <h6>
                                <a href="mailto:fashion.leather.2020@email.com" className='t-d-n' >
                                    send mail
                                </a>
                            </h6>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default ContactUs
