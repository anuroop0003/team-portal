export interface ApiError {
  detail?:
    | string
    | Array<{
        loc: (string | number)[];
        msg: string;
        type: string;
      }>;
}
