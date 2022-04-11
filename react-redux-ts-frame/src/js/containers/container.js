"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const main_component_1 = __importDefault(require("../components/main-component"));
const SampleActions = __importStar(require("../actions/actions"));
const round_up_reducer_1 = __importDefault(require("../reducers/round-up-reducer"));
/**
 * import-search-container Container
 *
 */
exports.default = (0, react_redux_1.connect)(state => {
    return {
        state: {
            SampleReducer: round_up_reducer_1.default.SampleReducer,
        },
    };
}, dispatch => {
    return {
        actions: {
            SampleActions: (0, redux_1.bindActionCreators)(SampleActions, dispatch),
        }
    };
})(main_component_1.default);
