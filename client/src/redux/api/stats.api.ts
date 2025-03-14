import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import endpoints from "./api.endpoints";

export const statsApiSlice = createApi({
    reducerPath: "stats",
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiUrl
    }),
    tagTypes: ["Stats"],
    endpoints: builder => {
        return {
            getStats: builder.query<{ data: { running: number, pending: number }}, void>({
                query: () => `${endpoints.stats}`,
                providesTags: ["Stats"]
            }),
        }
    }
})

export const { useGetStatsQuery } = statsApiSlice;