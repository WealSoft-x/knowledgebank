"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __importDefault(require("immutable"));
const initialState = {
    searchItems: {
        title: '',
        shipNo: '',
    },
};
/**
 * Reducer ImportSearchReducer
 *
 * @param state
 * @param action
 * @return {any |*}
 */
exports.default = (state = initialState, action = {}) => {
    let prevState = immutable_1.default.fromJS(state);
    let nextState = {};
    switch (action.type) {
        case '':
            nextState = prevState.merge({
                searchItems: action.searchItems,
            });
            break;
        default:
            nextState = prevState;
    }
    return nextState.toJS();
};
