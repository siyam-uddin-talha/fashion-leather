import { Badge, IconButton } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { useDispatch, useSelector } from 'react-redux'

import UseGetData from '../../api/UseGetData'
import { GetFavoriteItemAction } from '../../Redux/Actions/AddToFavAction';
import GetBusketProductFail from '../../Redux/Actions/GetBusketProductFail';


const FavoriteItems = () => {


    const dispatch = useDispatch()
    const AddToFavoriteReducer = useSelector(state => state.AddToFavoriteReducer)

    const GetMyFavItems = useCallback(async () => {
        try {
            const res = await UseGetData(`/api/home/favorite`)
            if (res) {
                dispatch(GetFavoriteItemAction(res.data.favorite ? res.data.favorite.favoriteItems : []))
            }
            if (res.data.message === 'not login') dispatch(GetBusketProductFail())
        } catch (error) {
            console.log(error.message)
        }

    }, [dispatch]
    )

    useEffect(() => {
        GetMyFavItems()
    }, [GetMyFavItems, dispatch])


    return (
        <IconButton
            size="medium"
            aria-label="show favourite products"
            color="inherit">
            <Link to='/my/favorites' className='c-gray' >
                <Badge badgeContent={AddToFavoriteReducer.favorite.length > 0 ? AddToFavoriteReducer.favorite.length : 0} color="primary">
                    <FavoriteBorderOutlinedIcon />
                </Badge>
            </Link>
        </IconButton>
    )
}

export default FavoriteItems
