export interface BookReqType {
  title: string;
  author: string;
  message: string;
  url: string;
}

export interface BookResType {
  bookId: number;
  title: string;
  author: string;
  message: string;
  url: string;

  createdAt: string;
}

export interface LoginReqType {
  email: string;
  password: string;
}

export interface LoginResType {
  token: string;
}
