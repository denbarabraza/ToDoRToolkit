import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import {RootDispatch} from "../../state/store";
import {logOutTC} from "../../state/authReducer";

const AppBarItem = () => {

    const dispatch = RootDispatch()

    const logOutHandler=()=>{
        dispatch(logOutTC())
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit" onClick={logOutHandler}>Log Out</Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarItem;