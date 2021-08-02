import client from "lib/api/client";
import Cookies from "js-cookie";

import { UpdateContentFormData, UpdatePostFormData } from "interfaces/index";

// コンテンツを作成
export const createContent = (
  id: number | undefined | null,
  data: UpdateContentFormData
) => {
  return client.post("admin/contents", data);
};

// 投稿を作成
export const createPost = (
  id: number | undefined | null,
  data: UpdatePostFormData
) => {
  return client.post("admin/posts", data);
};
