import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";

const theme = createTheme();

export default function SignIn() {

    const dispatch = useDispatch()
    const [name, setName] = useState({value: "", isErr: false, errContents: ""})
    const [pw, setPw] = useState({value: "", isErr: false, errContents: ""})
    const errText = "必須項目を入力して下さい"
    const [isErr, setErr] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const history = useHistory()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isErr = false
    if(!name.value) {
        setName({value: "", isErr: true, errContents: errText})
        isErr = true
    }
    if(!pw.value) {
        setPw({value: "", isErr: true, errContents: errText})
        isErr = true
    }
    if(isErr) {
        setErr(true)
        return
    }
    setSuccess(true)
    dispatch({
        type: 'SET_USER',
        value: {username: name.value},
    })
    history.push('/loggedin')
  };


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
    } else {
        return <></>
    }
}

const SuccessComponent = () => {
    if (isSuccess) {
        return (
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={true} autoHideDuration={3000} onClose={() => setSuccess(false)} >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    <AlertTitle>Success</AlertTitle>
                    ログイン成功
                </Alert>
            </Snackbar>
        )
    } else {
        return <></>
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
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ユーザ名"
              name="email"
              error={name.isErr}
              autoComplete="email"
              helperText={name.errContents}
              onChange={(e) => setName({value: e.target.value, isErr: false, errContents: ""})}
              value={name.value}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={name.isErr}
              helperText={name.errContents}
              onChange={(e) => setPw({value: e.target.value, isErr: false, errContents: ""})}
              value={pw.value}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <ErrorComponent />
      <SuccessComponent />
    </ThemeProvider>
  );
}