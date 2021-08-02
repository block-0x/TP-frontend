import React, { useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "date-fns";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Box from "@material-ui/core/Box";
import CancelIcon from "@material-ui/icons/Cancel";
import AlertMessage from "components/utils/AlertMessage";
import { UpdateContentFormData } from "interfaces/index";
import { createContent } from "lib/api/admin";

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
  card: {
    padding: theme.spacing(2),
    maxWidth: 340,
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
}));

const ContentCreate: React.FC = () => {
  const classes = useStyles();
  const histroy = useHistory();
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  // フォームデータを作成
  const createFormData = (): UpdateContentFormData => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("summary", summary);

    return formData;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = createFormData();

    try {
      const res = await createContent(null, data);
      console.log(res);

      if (res.status === 200) {
        histroy.push("/contents");

        setTitle("");
        setSummary("");

        console.log("Successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="コンテンツ作成" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="コンテンツ"
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
              label="概要"
              value={summary}
              margin="dense"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSummary(e.target.value)
              }
            />
            <div style={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!title || !summary ? true : false} // 空欄があった場合はボタンを押せないように
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
        message="メールアドレスかパスワードが間違っています"
      />
    </>
  );
};

export default ContentCreate;
