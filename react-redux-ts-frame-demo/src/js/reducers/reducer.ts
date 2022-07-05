import Immutable from 'immutable';

interface initialState {
    loginItems: loginItems
}

interface loginItems {
    username: string
}

const initialState:initialState = {
    loginItems:
        {
            username: '',
        },
}

export default (state = initialState, action: any = {}):any => {
    let prevState:any = Immutable.fromJS(state);
    let nextState:any = {};

    switch (action.type) {
        case 'SET_USER':
            nextState = prevState.merge({
                loginItems: action.value,
            });
            break;
        default :
            nextState = prevState;
    }
    return nextState.toJS();
}