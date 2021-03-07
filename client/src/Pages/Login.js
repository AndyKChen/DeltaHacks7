import React, { useRef, useState } from 'react';
import { Button, Card, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './Login.jss'; 
import { useAuth } from '../Contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";
import { Alert } from '@material-ui/lab';

export default function Login() {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const  { login }  = useAuth();
    const [error, setError] = useState("")
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        console.log(email);
        try{
          setError("");
          setLoading(true);
          await login(email, password);
          //{<Alert severity="success">Account successfully created</Alert>}
          history.push("/")
        } catch{
          setError("Failed to login");
        }
        setLoading(false)
    }

    return (
      <div className={classes.rootRoot}>
        <Card variant="outlined" raised="true" className={classes.root}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5" color="primary" className={classes.title}>
                  Log in
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    className={classes.textField}
                    ref={emailRef}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    className={classes.textField}
                    ref={passwordRef}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                  >
                    Log In
                  </Button>
                  <Grid container className={classes.links}>
                    <Grid item xs={12}>
                      <Button href="/signup" color="primary">
                        {"Haven't got an Account? Sign up"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
        </Card>
      </div>
    )
}