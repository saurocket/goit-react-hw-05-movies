import React, {useEffect, useState} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/strore";
import {trandsItem} from "../../../redux/trandsReducer";
import pageNotFound from '../../../assets/404.jpg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',


        },
        img: {
            height: '60vh'
        },
        wrapperCard: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        title: {
            marginTop: theme.spacing(3),
            maxHeight: '80vh',
            maxWidth: '100vh',
        }

    }),
);

type PropsType = {
    open: boolean
    handleClose: () => void
    who: 'search' | 'trands'
}
export const MoreInfo: React.FC<PropsType> = ({open, handleClose, who}) => {
    const classes = useStyles();
    // @ts-ignore
    const currentElement = useSelector((state: AppStateType) => state[who].filteredMovies)



    const [element, setElement] = useState<null | trandsItem>(null)

    useEffect(() => {
        if (currentElement?.length === 1) {
            setElement(currentElement[0])
        }
        return () => {
            setElement(null)
        }

    }, [currentElement])



    return (
        <div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <div className={classes.wrapperCard}>
                    <img
                        className={classes.img}
                        src={element?.poster_path ?
                            element.backdrop_path ? `https://image.tmdb.org/t/p/original${element.backdrop_path}` :
                                `https://image.tmdb.org/t/p/original${element.poster_path}`
                            : pageNotFound}
                        alt="moreInfo"/>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        component='h3'
                        align="center"

                    >
                        {element?.overview ?
                            `${element.overview}` :
                            'description is not found'
                        }
                    </Typography>
                </div>
            </Backdrop>
        </div>
    );
}