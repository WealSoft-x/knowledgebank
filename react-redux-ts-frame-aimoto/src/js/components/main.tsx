import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LeftMenu from './left-menu';
import Form from './form';

export default function MainComponent() {
    return (
      <>
        <AppBar position="static">
        <Toolbar variant="dense">
            <LeftMenu/>
            <Typography variant="h6" color="inherit" component="div"/ >
        </Toolbar>
        </AppBar>
        <Form />
      </>
    );
}