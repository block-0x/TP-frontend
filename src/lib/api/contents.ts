import client from "lib/api/client";
import { UpdateContentFormData } from "interfaces/index";

import Cookies from "js-cookie";

// コンテンツ情報を取得
export const getContents = () => {
  return client.get("contents", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// コンテンツを更新
export const updateContent = (
  id: number | undefined | null,
  data: UpdateContentFormData
) => {
  return client.put(`content/${id}`, data);
};

// コンテンツ詳細
export const getContent = (title: string) => {
  return client.get(`c/${title}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
