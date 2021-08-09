import React from "react";
import {AppBar, Container, Toolbar} from "@material-ui/core/";
import {LinkPage} from "./LinkPage";

export const Header = () => {


    return (
        <AppBar position="fixed">
            <Container fixed>
                <Toolbar>
                    <LinkPage path={'/'} label={'Movies'} activeOnlyWhenExact={true}/>
                    <LinkPage path={'/movies'} label={'Search movies'}/>
                </Toolbar>
            </Container>
        </AppBar>
    )
}


