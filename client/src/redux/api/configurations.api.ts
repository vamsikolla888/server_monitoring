import config from "@/config/config";
import { defaultFilter, IFilter } from "@/pages/filemanager/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import endpoints from "./api.endpoints";
import { CreateConfigurationResponse, IGetConfigurationResponse } from "@/pages/configurations/types";
import { Configuration } from "@/pages/configurations/schema";

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
            createConfiguration: builder.mutation<CreateConfigurationResponse, Configuration>({
                query: (configuration) => ({
                    url: endpoints.configurations,
                    method: "POST",
                    body: configuration
                }),
                invalidatesTags: ["Configurations"]
            }),
            updateConfiguration: builder.mutation<CreateConfigurationResponse, { body: Configuration, id: string}>({
                query: ({ body, id }) => ({
                    url: `${endpoints.configurations}/${id}`,
                    method: "PUT",
                    body
                }),
                invalidatesTags: ["Configurations"]
            }),
            multiDeleteConfiguration: builder.mutation<CreateConfigurationResponse, { selectedIds: string[] }>({
                query: ({ selectedIds }) => ({
                    url: `${endpoints.configurations}/multiDelete`,
                    method: "POST",
                    body: { selectedIds }
                }),
                invalidatesTags: ["Configurations"]
            })
        }
    }
})

export const { useGetConfigurationsQuery, useCreateConfigurationMutation, useUpdateConfigurationMutation, useMultiDeleteConfigurationMutation } = configurationsApiSlice;