import React from 'react'
import {CastType} from "../../redux/castsReducer";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import noImage from "../../assets/casts.jpg";
import {createStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    wrapper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
        zIndex: 3
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    text:{
        fontSize: '0.8rem',

        color: 'gray'
    },
    name: {
        fontSize: '1rem',
        color: theme.palette.common.white,
    }



}))

type PropsType = {
    casts: Array<CastType>
}


export const CastsItem:React.FC<PropsType> = ({casts}) => {
    const classes = useStyles()
    return<>
        {casts.map(({character, name,profile_path}) => {
            return (
                <Grid item xs={6} sm={4} md={2}
                       key={name}
                      className={classes.wrapper}
                >
                        <Avatar
                            className={classes.avatar}
                            alt={name}
                            src={`https://image.tmdb.org/t/p/original${profile_path}`}
                            variant = "circular"
                            children={<img src={noImage} alt='noImg' style={{height: 100}}/>}
                        />
                   <div>
                       <Typography
                           className={classes.name}
                           component="p"
                           variant="h6"
                           align='center'
                       >
                           {name}
                       </Typography>
                       <Typography
                           className={classes.text}
                           component="p"
                           variant="h6"
                           align='center'
                       >
                           {character}
                       </Typography>
                   </div>

                </Grid>

            )

        })}
        </>

}