import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loggedin from '../components/loggedin';
import Comfirm from '../components/comfirm';
import Complete from '../components/complete';
import MainComponent from '../components/main';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/front-sample' component={MainComponent} />
                <Route exact path='/loggedin' component={Loggedin} />
                <Route exact path='/comfirm' component={Comfirm} />
                <Route exact path='/complete' component={Complete} />
            </Switch>
        </BrowserRouter>
    );
}