import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SampleContainer from '../containers/container';

/**
 * Routing
 *
 * @return {*}
 */
export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/front-sample' component={SampleContainer} />
            </Switch>
        </BrowserRouter>
    );
}