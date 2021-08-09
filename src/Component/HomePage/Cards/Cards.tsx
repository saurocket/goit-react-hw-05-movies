import {Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography} from "@material-ui/core";
import React, {Dispatch, SetStateAction} from "react";

import {useDispatch} from "react-redux";
import {useHistory, useLocation} from 'react-router-dom'
import img404 from '../../../assets/404.jpg'
import {trandsItem} from "../../../redux/trandsReducer";
import {actions} from "../../../redux/seatchReducer";

type PropsTypes = {
    cards: Array<trandsItem>
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}
const useStyle = makeStyles((theme) => ({
    card:{
        animation: 'showImage 1s forwards ',
    },
    cardMedia:{
        paddingTop: "120%",
        cursor: 'pointer'
    },
    cardContent: {
        flexGrow: 1,
    },
    title: {
        height: '5rem',
        overflow: 'hidden'
    },

}))



export const Cards:React.FC<PropsTypes> = ({cards, setOpen, open}) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const history = useHistory()
    const {pathname} = useLocation()


    const handleToggle = (id: number) => {
        dispatch(actions.setCurrentId(id))
        setOpen(!open);
    };



    return (
        <>
            {cards.map(card => <Grid
                item
                key={card.id}
                xs={6} sm={4} md={3}
            >
                <Card
                    className={classes.card}
                >
                    <CardMedia className={classes.cardMedia}
                               image={`https://image.tmdb.org/t/p/original${card.poster_path}`}
                               title="Image title"
                               onClick={() => handleToggle(card.id)}
                   />


                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6" component='h3' align="center" className={classes.title}>
                            {card.title}
                        </Typography>

                    </CardContent>
                    <CardActions disableSpacing>
                        <Button
                            size='small'
                            color="primary"
                            variant='outlined'
                            onClick={() => history.push(`/movies/${card.id}/casts`, {pathname}) }
                        >
                            Cast
                        </Button>
                        <Button
                            size='small'
                            color="primary"
                            variant='outlined'
                            onClick={() => history.push(`/movies/${card.id}`,{pathname}) }
                        >
                            details
                        </Button>

                        <Button
                            size='small'
                            color="primary"
                            variant='outlined'
                            onClick={() => history.push(`/movies/${card.id}/reviews`,{pathname}) }
                        >
                            Reviews
                        </Button>
                    </CardActions>
                </Card>
            </Grid>)}
        </>
    )
}


