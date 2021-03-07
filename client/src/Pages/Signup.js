import React, { useRef, useState } from 'react';
import { Button, Card, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './Signup.jss'; 
import { useAuth } from '../Contexts/AuthContext'
import { Alert } from "@material-ui/lab"
import { Link, useHistory } from 'react-router-dom'

export default function Signup() {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const history = useHistory()

async function handleSubmit(e) {
  e.preventDefault();
  console.log(emailRef.current.value);
  console.log(passwordRef.current.value);
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var passwordCheck = document.getElementById("password-reenter").value;
  console.log(email);
  try{
    setError("");
    setLoading(true);
    if (password !== passwordCheck){throw error;}
    await signup(email, password);
    // <Alert severity="success">Account successfully created</Alert>
    history.push("/login")
  } catch{
    setError("Failed to create an account");
  }
  setLoading(false)
}

return (
  <div className={classes.rootRoot}>
    <Card variant="outlined" raised="true" className={classes.root}>
        <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" color="primary" className={classes.title}>
              Sign Up
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                primary
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password-reenter"
                label="Re-enter Password"
                type="password"
                id="password-reenter"
                color="primary"
                className={classes.textField}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Create Account
              </Button>
              <Grid container className={classes.links}>
                <Grid item xs={12}>
                  <Button href="/login" color="primary">
                    Already have an account? Login
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