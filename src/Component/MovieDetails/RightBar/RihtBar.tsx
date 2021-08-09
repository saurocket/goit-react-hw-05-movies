import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Grid, Link} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainFeaturesPosContent: {
        position: "relative",
        marginTop: theme.spacing(0),
        padding: theme.spacing(6),
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 345,
    },

}));

type PropsTypes = {
    original_title: string,
    poster_path: string,
    homepage: string,
}

export const RightBar: React.FC<PropsTypes> = ({poster_path, homepage, original_title}) => {
    const classes = useStyles();

    return (
        <Grid item md={6}>
        <div className={classes.mainFeaturesPosContent}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`https://image.tmdb.org/t/p/original${poster_path}`}
                        title={original_title}
                    />
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="h2"
                            align='center'
                        >
                            {original_title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link
                        component="a"
                        href={homepage}
                        variant="button"
                    >
                        Home page
                    </Link>
                </CardActions>
            </Card>
        </div>
        </Grid>
    );
}