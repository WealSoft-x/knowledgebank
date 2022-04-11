"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_redux_1 = require("react-redux");
const configure_store_1 = __importDefault(require("./stores/configure-store"));
const routes_1 = __importDefault(require("./routes/routes"));
const round_up_reducer_1 = __importDefault(require("./reducers/round-up-reducer"));
const store = (0, configure_store_1.default)(round_up_reducer_1.default);
const routes = (0, routes_1.default)();
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store }, routes), document.getElementById('app'));
