import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {ProductionCompany} from "../../../redux/detailsReducer";
import {Typography} from "@material-ui/core";
import noImage from '../../../assets/noImage.png'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
            justifyContent: 'center',
        },
        avatarWrapper: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center'
        },
        avatar: {
            backgroundColor: 'gray',
            width:  theme.spacing(20),
            height:  theme.spacing(7)
        },
        text: {
            zIndex: 3,
            color: theme.palette.common.white,
        }

    }),
);
 type PropsTypes = {
     production_companies: Array<ProductionCompany>
 }
export const BottomBar:React.FC<PropsTypes> = ({production_companies}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {production_companies.map(({id,logo_path,name,origin_country}) =>{
                return (
                    <div key={id} className={classes.avatarWrapper}>
                        <Avatar
                            className={classes.avatar}
                            alt={name}
                            src={`https://image.tmdb.org/t/p/original${logo_path}`}
                            variant='rounded'
                            children={<img src={noImage} alt='noImg' style={{height: 100}}/>}
                        />
                        <Typography
                            className={classes.text}
                            component="p"
                            variant="h6"
                            align='center'
                        >
                            {name}
                        </Typography>
                    </div>
                )
            })}
        </div>
    );
}