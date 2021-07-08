import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookies from 'universal-cookie';



const initialFormData = Object.freeze({
  address: "",
  rememberMe: false,
  addressValid:true,
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundcolor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ethereum_address = require('ethereum-address');

export default function SignIn() {
  const classes = useStyles();

  const [formData, updateFormData] = React.useState(initialFormData);

 
  

  const handleChangeText = (e) => {

      const newMessageObj = { 
        address:e.target.value.trim(),
        addressValid: ethereum_address.isAddress(e.target.value.trim()) 
      };
      updateFormData(newMessageObj); 

    };

  const handleChangeSwitchButton = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.checked
    });
  }

  const handleSubmit = async (e) => {
    
    
    //updating values once again would be nice
    console.log(formData);

    if(ethereum_address.isAddress(formData.address))
    {
      const cookies = new Cookies();
      if(formData.rememberMe){
        console.log("login s cookiem");
        
        cookies.set("address", formData.address.trim(), { path: '/' });
        //obicni request na /
      }
      else{
        console.log("login bez cookiem");
        cookies.remove("address");
        //post request na / sa adresom u podacima POSTa
      }
    }else{
         e.preventDefault();
    }

    //redirect user to / where cookie will be inspected, and if valid redirect him to homepage
  };
  

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            backgroundcolor="transparent"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="Etherium address"
            type="text"
            id="address"
            autoComplete="current-address"
            onChange={handleChangeText}
            error={!formData.addressValid}
            helperText={!formData.addressValid ? 'Invalid etherium address.' : ''}
          />
          <FormControlLabel
            control={<Checkbox name="rememberMe" onChange={handleChangeSwitchButton} value="yes" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
