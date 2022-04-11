import {combineReducers} from 'redux';
import SampeleReducer from './reducer';

/**
 * Constant rootReducer
 *
 * @type {Reducer<any>}
 */
const rootReducer:any = combineReducers({
    SampeleReducer,
});

export default rootReducer;