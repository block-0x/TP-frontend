// サインアップ
export interface SignUpData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: number;
  prefecture: number;
  birthday: Date;
  image: string;
}

export interface SignUpFormData extends FormData {
  append(name: keyof SignUpData, value: String | Blob, fileName?: string): any;
}

// サインイン
export interface SignInData {
  email: string;
  password: string;
}

// ユーザー
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  image: {
    url: string;
  };
  gender: number;
  birthday: String | number | Date;
  profile: string;
  prefecture: number;
  allowPasswordChange: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateUserData {
  id: number | undefined | null;
  name?: string;
  prefecture?: number;
  profile?: string;
  image?: string;
}

export interface UpdateUserFormData extends FormData {
  append(
    name: keyof UpdateUserData,
    value: String | Blob,
    fileName?: string
  ): any;
}

// いいね
export interface Like {
  id?: number;
  fromUserId: number | undefined | null;
  toUserId: number | undefined | null;
}

// チャットルーム
export interface ChatRoom {
  chatRoom: {
    id: number;
  };
  otherUser: User;
  lastMessage: Message;
}

// メッセージ
export interface Message {
  chatRoomId: number;
  userId: number | undefined;
  content: string;
  createdAt?: Date;
}

// コンテンツ
export interface Content {
  id: number;
  title: string;
  summary: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// コンテンツ編集
export interface UpdateContentData {
  id: number | undefined | null;
  title?: string;
  summary?: string;
}

// コンテンツ編集フォーマット
export interface UpdateContentFormData extends FormData {
  append(title: keyof UpdateContentData, value: String | Blob): any;
}

// 投稿
export interface Post {
  id: number;
  uuid: string;
  userId: number;
  contentId: number;
  title: string;
  body: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdatePost {
  id: number | undefined | null;
  title?: string;
  body?: string;
}

export interface UpdatePostFormData extends FormData {
  append(title: keyof UpdatePost, value: String | Blob): any;
}

// // 投稿編集
// export interface UpdateContentData {
//   id: number | undefined | null;
//   title?: string;
//   summary?: string;
//
// }

// // 投稿編集フォーマット
// export interface UpdateContentFormData extends FormData {
//   append(
//     title: keyof UpdateUserData,
//     value: String | Blob,
//     fileName?: string
//   ): any;
// }
