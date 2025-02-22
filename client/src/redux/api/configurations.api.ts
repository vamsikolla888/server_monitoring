import config from "@/config/config";
import { defaultFilter, IFilter } from "@/pages/filemanager/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import endpoints from "./api.endpoints";
import { CreateConfigurationResponse, IConfiguration, IGetConfigurationResponse } from "@/pages/configurations/types";

export const configurationsApiSlice = createApi({
    reducerPath: "configuration",
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiUrl
    }),
    tagTypes: ["Configurations"],
    endpoints: builder => {
        return {
            getConfigurations: builder.query<IGetConfigurationResponse, IFilter | void>({
                query: (filter = defaultFilter) => `${endpoints.configurations}?filter=${JSON.stringify(filter)}`,
                providesTags: ["Configurations"]
            }),
            createConfiguration: builder.mutation<CreateConfigurationResponse, IConfiguration>({
                query: (configuration) => ({
                    url: endpoints.configurations,
                    method: "POST",
                    body: configuration
                }),
                invalidatesTags: ["Configurations"]
            })
        }
    }
})

export const { useGetConfigurationsQuery, useCreateConfigurationMutation } = configurationsApiSlice;