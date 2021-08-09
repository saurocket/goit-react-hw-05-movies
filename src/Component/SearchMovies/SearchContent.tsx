import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core/";
import {AppStateType} from "../../redux/strore";
import {useDispatch, useSelector} from "react-redux";
import {throttle} from 'lodash'
import {Cards} from "../HomePage/Cards/Cards";
import {MoreInfo} from "../HomePage/Backdrop/Backdrop";
import {SearchMovies} from "./SearchMovies";
import page404 from '../../assets/404.jpg'
import {actions, getMoviesFromInput} from "../../redux/seatchReducer";
import {PageContainer} from "../PageContainer";

export const SearchContent = () => {

    const dispatch = useDispatch()
    const {movies, searchValue, totalPages, totalResults} = useSelector((state: AppStateType) => state.search)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    useEffect(() => {
        if (currentPage * 20 === movies.length) {
            return
        }
        if (totalPages && currentPage <= totalPages) {
            dispatch(getMoviesFromInput(searchValue, currentPage))
        }
    }, [currentPage])


    const handleClose = () => {
        setOpen(false)
        dispatch(actions.clearFilter())
    };
    const scrollHandler = throttle((e: any): void => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setCurrentPage(prevState => prevState + 1)
        }
    }, 500)


    return (
        <PageContainer>
            <SearchMovies/>
            {totalResults === 0 && <img src={page404} alt='404'/>}

            <Grid container spacing={2}>
                {movies.length > 0 && <Cards
                    cards={movies}
                    open={open}
                    setOpen={setOpen}
                />
                }
            </Grid>
            <MoreInfo
                who='search'
                open={open}
                handleClose={handleClose}
            />
        </PageContainer>
    )
}
