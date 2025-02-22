export interface IConfiguration {
    serverName: string;
    serverIpAddress: string;
    baseFolder: string;
    created: Date;
}

export interface IGetConfigurations {
    configdocuments: IConfiguration[];
    pagination: { totalCount: number };
}

export interface ErrorResponse {
    errorCode?: string | number;
    errorMessage?: string;
}

export type IGetConfigurationResponse = IGetConfigurations & ErrorResponse;

export interface CreateConfigurations {
    _id: string;
    respMessage: string;
    respCode: string;
}

export type CreateConfigurationResponse = CreateConfigurations & ErrorResponse;
