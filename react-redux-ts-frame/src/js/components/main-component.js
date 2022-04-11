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
const React = __importStar(require("react"));
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const FormControlLabel_1 = __importDefault(require("@mui/material/FormControlLabel"));
const Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
const Link_1 = __importDefault(require("@mui/material/Link"));
const Grid_1 = __importDefault(require("@mui/material/Grid"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const LockOutlined_1 = __importDefault(require("@mui/icons-material/LockOutlined"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const styles_1 = require("@mui/material/styles");
const axios_1 = __importDefault(require("axios"));
function Copyright(props) {
    return (React.createElement(Typography_1.default, Object.assign({ variant: "body2", color: "text.secondary", align: "center" }, props),
        'Copyright © ',
        React.createElement(Link_1.default, { color: "inherit", href: "https://mui.com/" }, "Your Website"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
const theme = (0, styles_1.createTheme)();
function MainComponent() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios_1.default.post("http://localhost/api/login", {
            id: data.get('email'),
            password: data.get('password')
        }).then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
        });
    };
    return (React.createElement(styles_1.ThemeProvider, { theme: theme },
        React.createElement(Container_1.default, { component: "main", maxWidth: "xs" },
            React.createElement(CssBaseline_1.default, null),
            React.createElement(Box_1.default, { sx: {
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                } },
                React.createElement(Avatar_1.default, { sx: { m: 1, bgcolor: 'secondary.main' } },
                    React.createElement(LockOutlined_1.default, null)),
                React.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "Sign in"),
                React.createElement(Box_1.default, { component: "form", onSubmit: (e) => handleSubmit(e), noValidate: true, sx: { mt: 1 } },
                    React.createElement(TextField_1.default, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true }),
                    React.createElement(TextField_1.default, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password" }),
                    React.createElement(FormControlLabel_1.default, { control: React.createElement(Checkbox_1.default, { value: "remember", color: "primary" }), label: "Remember me" }),
                    React.createElement(Button_1.default, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 } }, "Sign In"),
                    React.createElement(Grid_1.default, { container: true },
                        React.createElement(Grid_1.default, { item: true, xs: true },
                            React.createElement(Link_1.default, { href: "#", variant: "body2" }, "Forgot password?")),
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(Link_1.default, { href: "#", variant: "body2" }, "Don't have an account? Sign Up"))))),
            React.createElement(Copyright, { sx: { mt: 8, mb: 4 } }))));
}
exports.default = MainComponent;
