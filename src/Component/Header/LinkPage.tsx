import {Link, useRouteMatch} from "react-router-dom";
import {Box, IconButton, makeStyles,Typography} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1),

    },
    title: {
        flexGrow: 1
    },
    logo: {
        color: 'gray',
        borderBottom: '2px solid gray'

    },
    logoActive: {
        color: 'white',
        borderBottom: '2px solid white'
    }


}));

type  PropsType = {
    path: string
    label: string
    activeOnlyWhenExact?:boolean
}

export const LinkPage:React.FC<PropsType> = ({path, label, activeOnlyWhenExact}) => {
    const classes = useStyles();
    let match = useRouteMatch({
        path: path,
        exact: activeOnlyWhenExact
    })

    return (
        <Link className={match ? classes.logoActive : classes.logo} to={path}>
            <IconButton edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.menuButton}
            >
                {path === '/' ? <MovieIcon/> : <SearchIcon/>}
                <Box ml={1}>
                    <Typography variant="h6" className={classes.title}>{label}</Typography>
                </Box>
            </IconButton>
        </Link>
    )


}