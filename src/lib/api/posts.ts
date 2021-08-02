import client from "lib/api/client";
import Cookies from "js-cookie";

// 投稿情報を取得
// export const getPosts = () => {
//   return client.get("posts", {
//     headers: {
//       "access-token": Cookies.get("_access_token"),
//       client: Cookies.get("_client"),
//       uid: Cookies.get("_uid"),
//     },
//   });
// };

// 投稿詳細
export const getPost = (uuid: string) => {
  return client.get(`${uuid}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
