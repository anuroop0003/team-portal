export interface ApiError {
  detail?:
    | string
    | {
        code: string;
        email: string;
      }
    | Array<{
        loc: (string | number)[];
        msg: string;
        type: string;
      }>;
}
