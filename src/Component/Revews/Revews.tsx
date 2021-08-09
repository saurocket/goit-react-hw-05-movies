import React, {useEffect, useState} from "react";
import {Button, makeStyles} from "@material-ui/core";
import {Paper, Container, Grid} from "@material-ui/core";
import bgImage from '../../assets/hero.jpg'
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetailsInformation} from "../../redux/detailsReducer";
import {AppStateType} from "../../redux/strore";
import {getReviewsfromId} from "../../redux/reviewsReducer";
import {ReviewsTabs} from "./ReviewsTab/ReviewsTabs";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    mainFeaturesPos: {
        position: "relative",
        color: theme.palette.common.white,
        marginTop: theme.spacing(10),
        minHeight: '80vh',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: "rgba(0,0,0,0.4)"
    },
    buttonWrapper:{
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        textAlign: 'center',
    }

}));


type LocationStateType = {
    pathname: string
}

 const Reviews = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation<LocationStateType>()
    const [background, setBackground] = useState<null | string>(null)
    let pathname = location.state?.pathname || '/'
    const {backdrop_path} = useSelector((state:AppStateType) => state.details.description)
    const {results} = useSelector((state:AppStateType) => state.reviews)
    const {id} = useParams<{ id?: string | undefined }>()
    useEffect(() => {
        if(id){
            dispatch(getReviewsfromId(id))
            dispatch(getDetailsInformation(id))
        }
        return () => {
            // dispatch(actions.clearStateCast())
        }
    },[id])
    useEffect(()=> {
        setBackground(backdrop_path)
    },[backdrop_path])
    const goBackHandler = () => {
        history.push(pathname)
    }
    const classes = useStyles()
    return (
        <>
            <Paper className={classes.mainFeaturesPos}
                   style={background
                       ? {backgroundImage: `url(https://image.tmdb.org/t/p/original${background})`}
                       : {backgroundImage: `url(${bgImage})`}}
            >
                <Container fixed>
                    <div className={classes.overlay}/>
                    <Grid container spacing={1}>
                        {results.length>0
                            ? <ReviewsTabs reviews={results}/>
                            : <Typography variant="h1" component="h2">
                                Reviews is not found
                            </Typography>}
                    </Grid>
                    <div className={classes.buttonWrapper}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={goBackHandler}
                        >
                            Go Back
                        </Button>
                    </div>
                </Container>
            </Paper>
        </>
    )
}

export default Reviews