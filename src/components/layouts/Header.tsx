import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { AuthContext } from "App";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  linkBtn: {
    textTransform: "none",
    marginLeft: theme.spacing(1),
  },
}));

const Header: React.FC = () => {
  const { loading, isSignedIn } = useContext(AuthContext);
  const classes = useStyles();

  // 認証済みかどうかで表示ボタンを変更
  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <IconButton
              component={Link}
              to="/users"
              edge="start"
              className={classes.linkBtn}
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              component={Link}
              to="/contents"
              edge="start"
              className={classes.linkBtn}
              color="inherit"
            >
              <AccountBalanceIcon />
            </IconButton>
            <IconButton
              component={Link}
              to="/admin/contentcreate"
              edge="start"
              className={classes.linkBtn}
              color="inherit"
            >
              <AddBoxIcon />
            </IconButton>
            <IconButton
              component={Link}
              to="/admin/postcreate"
              edge="start"
              className={classes.linkBtn}
              color="inherit"
            >
              <AddToPhotosIcon />
            </IconButton>
          </>
        );
      } else {
        return (
          <>
            <IconButton
              component={Link}
              to="/signin"
              edge="start"
              className={classes.linkBtn}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/contents"
            variant="h6"
            className={classes.title}
          >
            TECH PAPER
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
