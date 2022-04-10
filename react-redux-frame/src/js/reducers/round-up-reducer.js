import {combineReducers} from 'redux';
import SampeleReducer from './reducer';

/**
 * Constant rootReducer
 *
 * @type {Reducer<any>}
 */
const rootReducer = combineReducers({
    SampeleReducer,
});

export default rootReducer;