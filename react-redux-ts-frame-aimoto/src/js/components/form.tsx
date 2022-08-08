import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import ReactDOM from 'react-dom';
import { Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme();

export default function Comfirm() {
  const dispatch = useDispatch()
  const [form1, setForm1] = useState({value: "", isErr: false, errContents: ""})
  const [form2, setForm2] = useState({value: "", chkVal: false, isErr: false, errContents: ""})
  const [form3, setForm3] = useState({value: "", isErr: false, errContents: ""})
  const [form4, setForm4] = useState({value: "", isErr: false, errContents: ""})
  const errText = "必須項目を入力して下さい"
  const valErrText = "数値で入力してください"
  const [isErr, setErr] = useState(false)
  const [isErrVal, setErrVal] = useState(false)
  const history = useHistory()
  const textInput = useRef<HTMLDivElement>(null!)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    let isErr = false
    let isValErr = false
    if(!form1.value) {
      setForm1({value: "", isErr: true, errContents: errText})
      isErr = true
    }
    if(!form2.value) {
      setForm2({value: "", chkVal: false, isErr: true, errContents: errText})
      isErr = true
    }
    if(isNaN(parseInt(form2.value)) ) {
      setForm2({value: form2.value, chkVal: true, isErr: true, errContents: valErrText})
      isValErr = true
    }
    if(isErr) {
      console.log("必須項目未入力エラー");
      setErr(true)
      return
    } else if(isValErr) {
      console.log("バリデーションエラー")
      setErrVal(true)
      return
    }
    dispatch({
        type: 'SET_ENQUET',
        value: {
          name: form1.value,
          telNumber: form2.value,
          gender: form3.value,
          job: form4.value,
        },
    })
    history.push('/comfirm')
  };

  useEffect(() => {
      console.log("useEffect");
      textInput.current.focus();
  },[]);

  const ErrorComponent = () => {
    if (isErr) {
        return (
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={true} autoHideDuration={3000} onClose={() => setErr(false)} >
                <Alert severity="error" onClose={() => setErr(false)}>
                    <AlertTitle>Error</AlertTitle>
                    {errText}
                </Alert>
            </Snackbar>
        )
    } else if (isErrVal) {
      return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={true} autoHideDuration={3000} onClose={() => setErrVal(false)} >
            <Alert severity="error" onClose={() => setErrVal(false)}>
                <AlertTitle>Validation Error</AlertTitle>
                {valErrText}
            </Alert>
        </Snackbar>
      )
    } else {
        return <></>
    }
  }

  const checkValid = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('blur処理入りました。入力データ：%s', form2.value);
    const parceVal = parseInt(form2.value);
    if ( isNaN(parceVal) ) {
      console.log('バリデーションチェック問題あり');
      setForm2({value: form2.value, chkVal: true, isErr: true, errContents: valErrText})
      setErrVal(true)
      return 
    } else {
      console.log('バリデーションチェック問題なし');
    }
  }

  return (
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            アンケート
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography component="h2" variant="h6">
              質問1：名前
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="form1"
              label="名前を入力してください"
              name="form1"
              error={form1.isErr}
              autoComplete="form1"
              helperText={form1.errContents}
              onChange={(e) => setForm1({value: e.target.value, isErr: false, errContents: ""})}
              value={form1.value}
              inputRef={textInput}
            />
            <Typography component="h2" variant="h6">
              質問2：電話番号
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="form2"
              label="電話番号を入力してください"
              name="form2"
              error={form2.isErr}
              autoComplete="form2"
              helperText={form2.errContents}
              onChange={(e) => setForm2({value: e.target.value, chkVal: false, isErr: false, errContents: ""})}
              value={form2.value}
              onBlur={checkValid}
            />
            <Typography component="h2" variant="h6">
              質問3：性別
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="other"
                name="radio-buttons-group"
                onChange={(e) => setForm3({value: e.target.value, isErr: false, errContents: ""})}
                value={form3.value}
              >
                <FormControlLabel value="female" control={<Radio />} label="女性" />
                <FormControlLabel value="male" control={<Radio />} label="男性" />
                <FormControlLabel value="other" control={<Radio />} label="その他" />
              </RadioGroup>
            </FormControl>
            <Typography component="h2" variant="h6">
              質問4：職業
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="select-job-label" />
              <Select
                labelId="select-job-label"
                defaultValue="other"
                name="selects-group"
                onChange={(e) => setForm4({value: e.target.value, isErr: false, errContents: ""})}
                value={form4.value}
              >
                <MenuItem value={"businessmen"}>会社員</MenuItem>
                <MenuItem value={"independent"}>自営業</MenuItem>
                <MenuItem value={"other"}>その他</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              回答送信
            </Button>
          </Box>
        </Box>
      </Container>
      <ErrorComponent />
    </ThemeProvider>
  );
}