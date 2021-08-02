import React, { useState, useContext, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import "date-fns";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,
  CardHeader,
  Box,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import MenuIcon from "@material-ui/icons/Menu";
import AlertMessage from "components/utils/AlertMessage";
import { UpdatePostFormData } from "interfaces/index";
import { createPost } from "lib/api/admin";
import ReactMarkdown from "react-markdown";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { AccountCircle, Send } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6),
  },
  submitBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none",
  },
  header: {
    textAlign: "center",
  },
  cardContent: {
    height: "700px",
  },
  card: {
    padding: theme.spacing(2),
  },
  inputFileButton: {
    textTransform: "none",
    color: theme.palette.primary.main,
  },
  imageUploadBtn: {
    textAlign: "right",
  },
  input: {
    display: "none",
  },
  box: {
    marginBottom: "1.5rem",
  },
  preview: {
    width: "100%",
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  body: {
    margin: "0",
  },
  h30: {
    paddingTop: "30px",
  },
  h50: {
    paddingTop: "50px",
  },
  h70: {
    paddingTop: "70px",
  },
  h100: {
    paddingTop: "100px",
  },
  cWhite: {
    color: "#FA6088",
  },
  headerStyle: {
    height: "50px",
    background: "#1AB394",
  },
  p10: {
    padding: "10px",
  },
  p20: {
    padding: "20px",
  },
  p30: {
    padding: "30px",
  },
  navTitle: {
    color: "rgba(0, 0, 0, 0.87)",
  },
  navHeader: {
    color: "#fff",
  },
  navText: {
    fontWeight: "bold",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "bolder",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const PostCreate: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const theme = useTheme();
  // フォームデータを作成
  const createFormData = (): UpdatePostFormData => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);

    return formData;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = createFormData();

    try {
      const res = await createPost(null, data);
      console.log(res);

      if (res.status === 200) {
        // histroy.push("/contents");

        setTitle("");
        setBody("");

        console.log("Successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };
  const height = 500;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <List>
          <Link to={`/${text}`} className={classes.navTitle}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={`${text}`} />
            </ListItem>
          </Link>
        </List>
      ))}
      <Divider />
    </div>
  );

  // const drawwer = (
  //   <div>
  //     <div className={classes.toolbar} />
  //     <Divider />
  //     <List>
  //       {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>
  //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //           </ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {["All mail", "Trash", "Spam"].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>
  //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //           </ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //   </div>
  // );

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <form noValidate autoComplete="off">
            <Card className={classes.card}>
              <CardHeader
                className={classes.header}
                title="テックペーパー作成"
              />
              <CardContent className={classes.cardContent}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="タイトル"
                  value={title}
                  margin="dense"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="内容"
                  value={body}
                  multiline
                  margin="dense"
                  inputProps={{
                    style: {
                      height,
                    },
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBody(e.target.value)
                  }
                />
                <div style={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    disabled={!title || !body ? true : false} // 空欄があった場合はボタンを押せないように
                    className={classes.submitBtn}
                    onClick={handleSubmit}
                  >
                    送信
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
          <AlertMessage // エラーが発生した場合はアラートを表示
            open={alertMessageOpen}
            setOpen={setAlertMessageOpen}
            severity="error"
            message="保存に失敗しました"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="テックペーパー作成" />
            <CardContent className={classes.cardContent}>
              <h2>{title}</h2>
              <ReactMarkdown>{body}</ReactMarkdown>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PostCreate;
