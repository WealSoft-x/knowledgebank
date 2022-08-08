import Immutable from 'immutable';

interface initialState {
    loginItems: loginItems
    enquetItems: enquetItems
}

interface loginItems {
    username: string
}

interface enquetItems {
    name: string
    telNumber: string
    gender: string
    job: string
}

const initialState:initialState = {
    loginItems:
        {
            username: '',
        },
    enquetItems:
        {
            name: '',
            telNumber: '',
            gender: '',
            job: '',
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
        case 'SET_ENQUET':
            nextState = prevState.merge({
                enquetItems: action.value,
            });
            break;
        default :
            nextState = prevState;
    }
    return nextState.toJS();
}