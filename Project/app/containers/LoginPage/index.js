import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import NavBar from '../../components/NavigationBar';
import TextField from '../../components/Base/TextField';
import Footer from '../../components/Footer';

/* eslint-disable react/prefer-stateless-function */
export default class LoginPage extends React.PureComponent {
  render() {
    return (
      <div>
        <NavBar />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="baseline"
          style={{ flexGrow: 1, padding: '20px 100px' }}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <h1>Welcome back</h1>
            <Paper style={{ padding: 20 }}>
              <Grid container direction="column" style={{ flexGrow: 1 }}>
                <Grid item xs={12} style={{ flexGrow: 1 }}>
                  <h4 style={{ marginBottom: 0 }}>Email</h4>
                  <TextField style={{ marginTop: 0, width: '100%' }} />
                </Grid>
                <Grid item xs={12} style={{ flexGrow: 1 }}>
                  <h4 style={{ marginBottom: 0 }}>Password</h4>
                  <TextField style={{ marginTop: 0, width: '100%' }} />
                </Grid>
                <Grid item xs={12} style={{ flexGrow: 1, marginTop: 10 }}>
                  <a
                    href="/login#"
                    style={{
                      textDecoration: 'none',
                      color: 'rgb(0, 159, 217)',
                    }}
                  >
                    Forgot password?
                  </a>
                </Grid>
                <Grid item xs={12} style={{ flexGrow: 1, marginTop: 10 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: 'rgb(0, 159, 217)',
                      color: '#fff',
                      textTransform: 'none',
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}
