import {Container, makeStyles} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
    mainContent: {
        color: "red",
        marginTop: theme.spacing(10),
    },
    cardGrid: {
        marginTop: theme.spacing(4),
    },
}))

export const PageContainer= ({children}: any) => {
    const classes = useStyle()
    return (
        <div className={classes.mainContent}>
            <Container className={classes.cardGrid} maxWidth="md">
                {children}
            </Container>
        </div>
    )
}