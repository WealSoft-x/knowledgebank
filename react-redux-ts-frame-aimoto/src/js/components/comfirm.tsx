import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LeftMenu from './left-menu';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const theme = createTheme();

export default function Comfirm() 
{
    const dispatch = useDispatch()
    const enquetReducer = useSelector((state:any) => {return state.rootReducer.ComfirmReducer});
    const [name, setName] = useState(enquetReducer.enquetItems.name)
    const [telNumber, setTelnumber] = useState(enquetReducer.enquetItems.telNumber)
    const [gender, setGender] = useState(enquetReducer.enquetItems.gender)
    const [job, setJob] = useState(enquetReducer.enquetItems.job)
    const [posts, setPosts] = useState([])
    const history = useHistory()

    useEffect(() => {
        console.log("useEffect_confirm");
        fetch("http://google.com", {mode: "no-cors", method: "post"})
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
    },[]);
    console.log("googleレスポンス：",posts)

    console.log("名前：", name)
    console.log("電話番号：", telNumber)
    console.log("性別：", gender)
    console.log("職業：", job)

    let prevGender = "";
    let prevJob = "";

    if (gender == "female") {
        prevGender = "女性";
    } else if (gender == "male"){
        prevGender = "男性";
    } else if (gender == "other"){
        prevGender = "その他";
    } else {
        prevGender = "未入力";
    }

    if (job == "businessmen") {
        prevJob = "会社員";
    } else if (job == "independent"){
        prevJob = "自営業";
    } else if (job == "other"){
        prevJob = "その他";
    } else {
        prevJob = "未入力";
    }

    const pageBack = () => {
        console.log('pageback button click')
        history.push('./front-sample')
    }

    const toCompPage = () => {
        console.log('complete button click')
        history.push('./complete')
    }

    return (
        <>
        <AppBar position="static">
            <Toolbar variant="dense">
                <LeftMenu/>
                <Typography variant="h6" color="inherit" component="div"/ >
            </Toolbar>
        </AppBar>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                    >
                    <h1>入力内容確認</h1>
                    <h3>名前：{name}</h3>
                    <h3>電話番号：{telNumber}</h3>
                    <h3>性別：{prevGender}</h3>
                    <h3>職業：{prevJob}</h3>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                            toCompPage();
                        }}
                        >
                        回答送信
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                            pageBack();
                        }}
                        >
                        戻る
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    );
}