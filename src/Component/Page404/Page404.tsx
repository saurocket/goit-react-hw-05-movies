import {PageContainer} from "../PageContainer";
import page404 from '../../assets/404.jpg'
import {Button, Container, makeStyles, Theme} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";


const useStyle = makeStyles((theme:Theme) => ({
    buttonWrapper: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        textAlign: 'center',
    }
}))

export const Page404 = () => {
    const history = useHistory()
    const classes = useStyle()
    return(
        <PageContainer>
            <img src={page404} alt='page not found'/>
            <div className={classes.buttonWrapper}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push('/')}
                >
                    Go Back
                </Button>
            </div>
        </PageContainer>
    )
}