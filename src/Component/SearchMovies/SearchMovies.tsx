import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux";
import {actions, getMoviesFromInput } from '../../redux/seatchReducer';
import {AppStateType} from "../../redux/strore";
import { useHistory, useLocation} from 'react-router-dom';
import qs from 'query-string'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            '& > *': {
                marginBottom: theme.spacing(5),
                width: '75ch',
            },
        },
    }),
);

export const  SearchMovies = () =>  {
    const location = useLocation()
    const classes = useStyles();
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const {searchValue} = useSelector((state: AppStateType) => state.search)
    const  history = useHistory()
    const changeHandlert = (e:ChangeEvent<HTMLTextAreaElement>):void => {
        setValue(e.target.value.trim())
    }

    useEffect(() => {
        const searchQuery = Object.values(qs.parse(location.search))[0]
        if(searchQuery !== undefined){
         // @ts-ignore
            setValue(searchQuery)
            dispatch((actions.clerarMovies()))
            // @ts-ignore
            dispatch(actions.querySearch(searchQuery))
            // @ts-ignore
            dispatch(getMoviesFromInput(searchQuery, 1))
        }
        if (searchValue.length !== 0){
            history.push({
                search: `query=${searchValue}`
            })
        }
    },[])
    useEffect(() => {
        setValue(searchValue)
    },[searchValue])




    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (value === searchValue){
            return
        }else{
            if(value.length === 0){
                return
            }
            history.push({
                search: `query=${value}`
            })
            dispatch((actions.clerarMovies()))
            dispatch(actions.querySearch(value))
            dispatch(getMoviesFromInput(value, 1))
        }
    }
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
            <TextField
                // @ts-ignore
                onChange={(e) => changeHandlert(e)}
                value={value}
                id="outlined-basic"
                label="Search Movies"
                variant="outlined"
            />
        </form>
    );
}