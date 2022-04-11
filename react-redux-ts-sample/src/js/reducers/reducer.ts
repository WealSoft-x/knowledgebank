import Immutable from 'immutable';

const initialState = {
    searchItems:
        {
            title: '',
            shipNo: '',
        },
}

/**
 * Reducer ImportSearchReducer
 *
 * @param state
 * @param action
 * @return {any |*}
 */
export default (state = initialState, action: any = {}):any => {
    let prevState:any = Immutable.fromJS(state);
    let nextState:any = {};

    switch (action.type) {
        case '':
            nextState = prevState.merge({
                searchItems: action.searchItems,
            });
            break;
        default :
            nextState = prevState;
    }
    return nextState.toJS();
}