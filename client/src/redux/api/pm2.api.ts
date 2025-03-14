import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import endpoints from "./api.endpoints";
import { IFilter } from "@/pages/filemanager/types/types";
import { defaultFilter } from "@/pages/filemanager/types/types";

export const pm2ApiSlice = createApi({
    reducerPath: "pm2",
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiUrl
    }),
    tagTypes: ["PM2"],
    endpoints: builder => {
        return {
            getProcesses: builder.query<{processes: Array<object>}, IFilter | void>({
                query: (filter = defaultFilter) => `${endpoints.pm2}?filter=${JSON.stringify(filter)}`,
                providesTags: ["PM2"]
            }),
        }
    }
})

export const { useGetProcessesQuery } = pm2ApiSlice;