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
export default (state = initialState, action = {}) => {
    let prevState = Immutable.fromJS(state);
    let nextState = null;

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