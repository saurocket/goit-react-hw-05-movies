import {Button, Grid, makeStyles, PropTypes, Typography} from "@material-ui/core";
import React from "react"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    mainFeaturesPosContent: {
        position: "relative",
        marginTop: theme.spacing(0),
        padding: theme.spacing(6),
    },
    description: {
        fontStyle: 'italic'
    },
    descriptionBottom: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));



type  PropsTypes = {
    release_date: string,
    overview: string,
    title: string,
    pathname:string | undefined,
}

export const LeftBar:React.FC<PropsTypes> = ({title, overview, release_date, pathname}) => {

    const history = useHistory()

    const goBackHandler = () => {
        const goBackPath = pathname || '/'
        history.push(goBackPath)
    }



    const classes = useStyles()

    return     <Grid item md={6}>
    <div className={classes.mainFeaturesPosContent}>
        <Typography
            component="h1"
            variant="h3"
            color="inherit"
            align='center'
        >
            {title}
        </Typography>
        <Typography
            className={classes.description}
            variant="h5"
            component="p"
            color="inherit"
            paragraph

        >
            {overview}
        </Typography>
        <div className={classes.descriptionBottom}>
            <Button
                variant="contained"
                color="secondary"
                onClick={goBackHandler}
            >
                Go Back
            </Button>
            <Typography
                component="p"
                variant="h6"
                color="initial"
                align='center'
            >
                Release date - {release_date}
            </Typography>

        </div>
    </div>
    </Grid>
}