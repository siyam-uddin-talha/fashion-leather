import React, { useCallback, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import UseGetData from '../../api/UseGetData';
import { Link } from 'react-router-dom'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    backgroundColor: alpha(theme.palette.grey[200], 0.5),
    '&:hover': {
        backgroundColor: alpha(theme.palette.grey[400], 0.10),
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '16ch',
            '&:focus': {
                width: '24ch',
            },
        },
    },
}));

export default function SearchBar() {

    const [inputValue, setInputValue] = React.useState('')
    const [product, setProduct] = React.useState([])
    const [SearchProdutc, setSearchProdutcs] = React.useState(product)

    const GetDataToDisplay = useCallback(async () => {
        const { data } = await UseGetData('/api/products')
        if (data.success) {
            setProduct(data.products)
        } else {
            setProduct([])
        }
    }, []
    )


    useEffect(() => {
        if (inputValue) {
            const produchSercth = (searchValue, Products) => {
                return Products.filter(e => {
                    const regex = new RegExp(searchValue, 'gi')
                    var wordInLine = "";
                    e.keywords.map(e => wordInLine = wordInLine + " " + e)
                    return wordInLine.match(regex) || e.catagory.match(regex) || e.title.match(regex)
                })


            }
            return setSearchProdutcs(produchSercth(inputValue, product))
        }
        else if (!inputValue) {
            setSearchProdutcs([])
        }

    }, [inputValue, product])

    useEffect(() => {
        GetDataToDisplay()
    }, [GetDataToDisplay])

    if (SearchProdutc.length > 12) {
        setSearchProdutcs(SearchProdutc.map(e => e).slice(0, 12))
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
            {SearchProdutc.length !== 0 && <div className="search_result">
                <ul className='search-result-links'>
                    {SearchProdutc.map((e, i) => {
                        return <React.Fragment key={i} >
                            <li onClick={() => setSearchProdutcs([])} >
                                <Link to={`/product/search/${e.catagory}`} >
                                    {e.catagory}
                                </Link>
                            </li>
                        </React.Fragment>
                    })}
                </ul>
            </div>}

        </Search>
    );
}
