import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box,} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer1: {
    
    height: "10vh",
    paddingTop:50,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className="Footer">
      <Box
        className={classes.footer1}
        textAlign="center"
        height="10vh"
        pt={{ xs: 5, sm: 10 }}
        pb={{ xs: 5, sm: 0 }}
      >
         Copyright &copy; Public Blog {new Date().getFullYear()}
      </Box>
    </div>
  );
}

export default Footer;
