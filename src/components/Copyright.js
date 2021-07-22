import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  Typography: {
    position: "fixed",
    bottom: "2%",
    width: "100%",
  },
}));

const TITLE = "ScamTrade";

const Copyright = () => {
  const classes = useStyles();
  return (
    <Box mt={8}>
      <Typography
        className={classes.Typography}
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          {TITLE}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;
