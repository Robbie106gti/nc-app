export interface GeneralInfo {
  id: string;
  updatedBy: string;
  updatedAt: Time;
  createdAt: Time;
  createdBy: string;
  title: string;
  sub: string;
  image: string;
}

interface Time {
  seconds: number;
  nanoseconds: number;
}
