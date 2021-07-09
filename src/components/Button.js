import  PropTypes  from 'prop-types'
import ButtonMUI from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    btn: {
      margin: theme.spacing(30, 0, 2),
    },
  }));

const Button = ({text, width, height,onClick}) => {
    const classes = useStyles();
    return (
        <ButtonMUI
        onClick={onClick}
        variant="contained"
        color="primary"
        className={classes.btn}
      >
       {text}
      </ButtonMUI>
    )
}

Button.defaultProps={
    text: "Click me!",
    width: 20,
    height: 20,
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func.isRequired,
}

export default Button
