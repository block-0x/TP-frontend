import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import { Content } from "interfaces/index";
import { getContents } from "lib/api/contents";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 340,
    maxWidth: "100%",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Contents: React.FC = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(true);
  const [contents, setContents] = useState<Content[]>([]);

  const handleGetContents = async () => {
    try {
      const res = await getContents();

      if (res.status === 200) {
        setContents(res.data.contents);
      } else {
        console.log("No contents");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetContents();
  }, []);
  const MAX_LENGTH = 20;
  return (
    <>
      {!loading ? (
        contents.length > 0 ? (
          contents.map((content: Content, index: number) => {
            return (
              <Grid container key={index} justify="center">
                <List>
                  <Link to={`/c/${content.title}`} className={classes.link}>
                    <div className={classes.root}>
                      <ListItem alignItems="flex-start" style={{ padding: 0 }}>
                        <ListItemText
                          primary={content.title}
                          secondary={
                            <div style={{ marginTop: "0.5rem" }}>
                              <Typography></Typography>
                            </div>
                          }
                        />
                      </ListItem>
                      <div style={{ marginTop: "0.5rem" }}>
                        <Typography>
                          {content.summary.substr(0, MAX_LENGTH) + "..."}
                        </Typography>
                      </div>
                    </div>
                  </Link>
                  <Divider component="li" />
                </List>
              </Grid>
            );
          })
        ) : (
          <Typography component="p" variant="body2" color="textSecondary">
            コンテンツはありません
          </Typography>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Contents;
