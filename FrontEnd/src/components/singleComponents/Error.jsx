import { Container } from '@mui/material'
import React from 'react'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
const CustomButtonRoot = styled('button')`
  background-color: #007fff;
  padding: 10px 13px;
  height:100%;
  border-radius:.4rem;
  font-family: 'Source Sans Pro', sans-serif;
  color: #fff;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #004386;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;

function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}


const Error = () => {
    return (
        <section className='sec-pad error_page' >
            <Container component="main" maxWidth="md" className='error_wrapper d-flex a-i-c j-c-c f-d-c gap-5' >
                <div className="svg_wrapper col-sm-4 col-6">
                    <img src="/images/error.svg" className='img-fluid' alt="error" />
                </div>
                <div className="back_to_home_">
                    <div className="button-wrapper">
                        <Link to='/' className='t-d-n c-gray' >
                            <CustomButton>
                                Backto home
                            </CustomButton>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Error
