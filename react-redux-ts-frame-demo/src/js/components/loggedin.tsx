import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LeftMenu from './left-menu';
import { useSelector } from "react-redux";
import { useState } from 'react';

export default function Loggedin() {

    const loginReducer = useSelector((state:any) => {return state.rootReducer.LoginReducer});
    const [username, setUsername] = useState(loginReducer.loginItems.username)

    console.log(loginReducer)
    return (
      <>
        <AppBar position="static">
        <Toolbar variant="dense">
            <LeftMenu/>
            <Typography variant="h6" color="inherit" component="div" />
        </Toolbar>
        </AppBar>
        <h1>ようこそ{username}</h1>
    </>
    );
}