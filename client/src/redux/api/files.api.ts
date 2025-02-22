import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import endpoints from "./api.endpoints";
import { IFiles, IFilter } from "@/pages/filemanager/types/types";
import { defaultFilter } from "@/pages/filemanager/types/types";

export const fileApiSlice = createApi({
    reducerPath: "files",
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiUrl
    }),
    tagTypes: ["Files"],
    endpoints: builder => {
        return {
            getFiles: builder.query<{files: IFiles[], pagination: { totalCount: number }}, IFilter | void>({
                query: (filter = defaultFilter) => `${endpoints.listFiles}?filter=${JSON.stringify(filter)}`,
                providesTags: ["Files"]
            }),
        }
    }
})

export const { useGetFilesQuery, usePrefetch } = fileApiSlice;