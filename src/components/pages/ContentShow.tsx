import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import { Content, Post } from "interfaces/index";
import { getContent } from "lib/api/contents";
import { getPost } from "lib/api/posts";

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

type ContentShowProps = RouteComponentProps<{ title: string }>;

const ContentShow: React.FC<ContentShowProps> = (props) => {
  const classes = useStyles();
  const urlTitle = props.match.params.title;

  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<Content[]>([]);
  const [title, setTitle] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post[]>([]);
  const [uuid, setUuid] = useState<string>("");

  const handleGetContent = async () => {
    try {
      const res = await getContent(urlTitle);

      if (res.status === 200) {
        setContent(res.data.content);
        setTitle(res.data.content.title);
        setPosts(res.data.posts);
        // setUuid(res.data.posts);

        console.log(res);
      } else {
        console.log("No contents");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetContent();
  }, []);

  const clickGetPost = async () => {
    try {
      const res = await getPost(uuid);

      if (res.status === 200) {
        setPost(res.data.post);

        console.log(res);
      } else {
        console.log("No contents");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      {!loading ? (
        posts.length > 0 ? (
          posts.map((post: Post, index: number) => {
            return (
              <Grid container key={index} justify="center">
                <Link to={`/c/${title}`} className={classes.link}>
                  <div style={{ marginTop: "0.5rem" }}>
                    <Typography>{post.title}</Typography>
                  </div>
                </Link>
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

export default ContentShow;
