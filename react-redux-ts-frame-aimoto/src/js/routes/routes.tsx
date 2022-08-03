import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loggedin from '../components/loggedin';
import MainComponent from '../components/main';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/front-sample' component={MainComponent} />
                <Route exact path='/loggedin' component={Loggedin} />
            </Switch>
        </BrowserRouter>
    );
}