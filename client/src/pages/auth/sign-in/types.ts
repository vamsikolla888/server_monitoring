export interface LoginSuccess {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface ISuccessResponse {
    respCode: string;
    respMessage: string;
  }
  
  export interface IErrorResponse {
    errorCode: string;
    errorMessage: string;
  }
  
  export interface ILoginBody {
    email: string;
    password: string;
    entityType: "employee" | "users";
  }
  
  export type ILoginResponse = LoginSuccess & ISuccessResponse & IErrorResponse
  