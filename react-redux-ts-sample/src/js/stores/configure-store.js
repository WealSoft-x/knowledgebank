"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_redux_1 = require("react-router-redux");
const history_1 = require("history");
const redux_1 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const redux_logger_1 = require("redux-logger");
exports.default = (rootReducer) => {
    const history = (0, history_1.createBrowserHistory)();
    const logger = (0, redux_logger_1.createLogger)();
    const router = (0, react_router_redux_1.routerMiddleware)(history);
    const enhancer = (0, redux_1.compose)((0, redux_1.applyMiddleware)(router, redux_thunk_1.default, logger));
    const reducers = (0, redux_1.combineReducers)({ rootReducer, routing: react_router_redux_1.routerReducer });
    const store = (0, redux_1.createStore)(reducers, enhancer);
    return store;
};
