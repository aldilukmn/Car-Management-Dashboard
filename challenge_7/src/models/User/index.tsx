interface UserRequest {
  email?: string,
  username: string,
  password: string
}

type UserTokenProps = {
  userToken: string;
}

export type {UserRequest, UserTokenProps};