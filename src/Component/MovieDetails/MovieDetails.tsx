import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core";
import {Paper, Container, Grid} from "@material-ui/core";
import bgImage from '../../assets/hero.jpg'
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetailsInformation} from "../../redux/detailsReducer";
import {AppStateType} from "../../redux/strore";
import {LeftBar} from "./LeftBar/LeftBar";
import {RightBar} from "./RightBar/RihtBar";
import {BottomBar} from "./BottomBar/BottomBar";

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
        background: "rgba(0,0,0,0.7)"
    },

}));


type LocationStateType = {
    pathname: string
}

const MovieDetails = () => {
    const {id} = useParams<{ id?: string | undefined }>()
    const location = useLocation<LocationStateType>()
    const pathname = location.state?.pathname || '/'


    const dispatch = useDispatch()
    const {backdrop_path, title, overview, release_date, original_title, poster_path, homepage, production_companies} =
        useSelector((state: AppStateType) => state.details.description)

    const classes = useStyles();

    useEffect(() => {
        const setId = id || '1234'
        dispatch(getDetailsInformation(setId))
    }, [id])

    return (
        <>
            <Paper className={classes.mainFeaturesPos}
                   style={backdrop_path
                       ? {backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`}
                       : {backgroundImage: `url(${bgImage})`}}
            >
                <Container fixed>
                    <div className={classes.overlay}/>
                    <Grid container>
                            <LeftBar
                                title={title}
                                overview={overview}
                                release_date={release_date}
                                pathname={pathname}
                            />
                            <RightBar
                                homepage={homepage}
                                original_title={original_title}
                                poster_path={poster_path}
                            />
                    </Grid>
                <BottomBar
                    production_companies={production_companies}
                />

                </Container>
            </Paper>
        </>
    )
}
export default MovieDetails