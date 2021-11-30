import React from 'react'
import { useSelector } from 'react-redux'
import NotLogin from '../../../components/singleComponents/NotLogin';
import WishListProductSingle from './WishListProductSingle';


const WishListProducts = () => {

    const { favorite } = useSelector(state => state.AddToFavoriteReducer)
    const { login } = useSelector(state => state.User)

    if (!login) {
        return <NotLogin />
    }

    return (
        <section className='sec-pad bg-w wishtList_view list_view' >
            <WishListProductSingle item={favorite} />
        </section>
    )
}

export default WishListProducts
