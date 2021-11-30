import { IconButton } from '@mui/material'
import React from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'

const Increase_DecreaseQty = ({ increaseFun, decraseFun, id, qty }) => {


    const IncreaseQty = () => {
        increaseFun(id)
    }

    const DecreaseQty = () => {
        decraseFun(id)
    }


    return (
        <React.Fragment>
            <div className="increase_decrease_wrapper d-flex a-i-c gap-1 touch-b-none">
                <div className="qty_title touch-none">
                    <span>
                        Quantity
                    </span>
                </div>
                <div className="button_wrapper amouts_qty d-flex a-i-c gap-2 touch-gap-none touch-f-d-c">
                    <div className="btn__qty">
                        <IconButton aria-label="plus" size='small' onClick={() => IncreaseQty()} >
                            <BiPlus />
                        </IconButton>
                    </div>
                    <span >
                        {qty}
                    </span>
                    <div className="btn__qty">
                        <IconButton aria-label="minus" size='small' onClick={() => DecreaseQty()} >
                            <BiMinus />
                        </IconButton>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Increase_DecreaseQty
