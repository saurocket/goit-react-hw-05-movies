import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core/";
import {actions, getMovies} from "../../redux/trandsReducer";
import {AppStateType} from "../../redux/strore";
import preloader from '../../assets/preloader.svg'
import {Cards} from "./Cards/Cards";
import {MoreInfo} from "./Backdrop/Backdrop";
import {useDispatch, useSelector} from "react-redux";
import {throttle} from 'lodash'
import {PageContainer} from "../PageContainer";

export const HomePage = () => {

    const dispatch = useDispatch()
    const selector = useSelector((state: AppStateType) => state.trands)
    const {trands} = selector
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [open, setOpen] = React.useState(false);



    useEffect(() => {
            if(currentPage*20 === trands.length){
                return
            }

            dispatch(getMovies(currentPage))
        }

        , [currentPage])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])


    const handleClose = () => {
        setOpen(false)
        dispatch(actions.clearFilter())
    };
    const scrollHandler = throttle( (e: any): void => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setCurrentPage(prevState => prevState + 1)
        }
    }, 500)
    return (
        <PageContainer>
                <Grid  container spacing={2}>
                    {trands.length > 0 ? <Cards
                            cards={trands}
                            open={open}
                            setOpen={setOpen}
                        /> :

                        <img src={preloader} alt='loading'/>
                    }
                </Grid>
                <MoreInfo
                    who='trands'
                    open={open}
                    handleClose={handleClose}
                />
        </PageContainer>
    )
}
