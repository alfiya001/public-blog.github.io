import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { Toolbar, Typography, AppBar } from "@material-ui/core";
import { Write } from "../pages/Write";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  type1: {
    flexGrow: "1",
    textAlign: "justify",
  },
  type2: {
    marginLeft: theme.spacing(10),
    display: "flex",
    cursor: "pointer",
  },
}));

function Header() {
  let navigate = useNavigate();
  const classes = useStyles();
  let role = localStorage.getItem("userrole");
  console.log("role ",role)
  // role = localStorage.getItem("role");

  const handleChange = (event) => {
    localStorage.setItem("USER_KEY", "");
    navigate("/signin");
  };
  // const handleChangeWrite = (event) => {
  //   navigate("/write");
  // };
  const handleChangeDashboard = (event) => {
    navigate("/dashboard");
  };
  return (
    <div className="Header">
      <AppBar className={classes.appBar} position="static">
        <Toolbar className="justify-content-between ">
          <Typography variant="h6" color="primary" className={classes.type1} onClick={(event) => {
                              navigate(`/`);
                            }}>
            Public Blog
          </Typography>
          {role != "USER" ? <Typography
            variant="h6"
            color="textSecondary"
            className={classes.type2}
            onClick={handleChangeDashboard}
            >
              Dashboard
          </Typography>: <div></div>}

          {/* {(() => {
            if (role == "ADMIN") {
              return <div>
              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.type2}
                onClick={handleChangeDashboard}
              >
                Dashboard
              </Typography>
            </div>;
            } else if (role == "AUTHOR") {
              return <div>
              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.type2}
                onClick={handleChangeWrite}
              >
                Write
              </Typography>
            </div>;
            } else {
              return <div></div>;
            }
          })()} */}
          <div>
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.type2}
              onClick={handleChange}
            >
              Logout
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
