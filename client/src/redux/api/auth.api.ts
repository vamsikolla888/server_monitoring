import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import endpoints from "./api.endpoints";
import { ILoginBody, ILoginResponse } from "@/pages/auth/sign-in/types";

export const authApiSlice = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiUrl,
    }),
    endpoints: builder => {
        return {
            login: builder.mutation<ILoginResponse, ILoginBody>({
                query: body => ({
                    url: endpoints.login,
                    method: "POST",
                    body
                })
            })
        }
    }
})


export const { useLoginMutation } = authApiSlice;