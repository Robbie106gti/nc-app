import { WQUser } from './user';

export interface Ap {
  type: string;
  payload: any;
}
export interface Ap2 {
  type: string;
  payload: Er;
}
export interface Er {
  code: string;
  name: string;
  wqData: WQUser;
}
export interface Lg {
  type: string;
  payload: Login;
}
export interface Res {
  value: {
    email: string;
    class: string;
  };
}

export interface Login {
  username: string;
  password: string;
}
