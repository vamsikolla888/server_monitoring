import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLoggedUser, setItem, showToast } from './reducers/Uislice';
import { CommonToastTypes } from '../common/toast/Toast';
import { getDataFromLocalStorage } from '../utils/localStorage';
import { showDialog, hideDialog } from './reducers/dialogSlice';
import { dialogTypes } from '../constants/constants';
import { get } from './reducers/apiThunkSlice';

export const ApiStore = createApi({
  reducerPath: 'apiStore',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8676/api/',
    headers: {
      Authorization:
        'Bearer ' +
        getDataFromLocalStorage(
          'loginCredentials',
          (obj) => obj['accessToken']
        ),
    },
  }),
  endpoints: (builder) => ({
    getAllDetails: builder.query({
      query: (url) => ({
        url,
        headers: {
          Authorization:
            'Bearer ' +
            getDataFromLocalStorage(
              'loginCredentials',
              (obj) => obj['accessToken']
            ),
        },
      }),
      transformResponse: (response) => {
        return response;
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        let { data } = await queryFulfilled;
        console.log('DATA', data);
        if (
          data?.errorCode &&
          data?.errorMessage.includes('Session expired please login again')
        ) {
          dispatch(showDialog({ type: dialogTypes.SESSIONEXPIRED }));
        }
      },
    }),
    post: builder.mutation({
      query: ({ url, body, headers = null }) => ({
        url,
        body,
        method: 'POST',
        headers: {
          // Conditionally spread the headers if provided, otherwise set default content-type
          ...(headers ? headers : { 'Content-Type': 'application/json' }),
          Authorization: `Bearer ${getDataFromLocalStorage('loginCredentials', (obj) => obj['accessToken'])}`,
        },
      }),
      transformResponse: (response) => response,
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {
        if (arg?.url === 'auth/login') {
          let { data } = await queryFulfilled;
          if (data?.respCode) {
            dispatch(setItem({ key: 'accessToken', value: data.accessToken }));
            dispatch(setItem({ key: 'loginCredentials', value: data }));
            dispatch(hideDialog({ type: dialogTypes.SESSIONEXPIRED }));
            dispatch(
              showToast({
                type: CommonToastTypes.SUCCESS,
                message: data.respMessage,
              })
            );
            dispatch(setLoggedUser({ user: data.details }));
          } else {
            dispatch(
              showToast({
                type: CommonToastTypes.ERROR,
                message: data.errorMessage,
              })
            );
          }

          // console.log("RES", response);
        } else {
          let { data } = await queryFulfilled;
          if (data?.errorMessage) {
            dispatch(
              showToast({
                type: CommonToastTypes.ERROR,
                message: data.errorMessage,
              })
            );
          } else {
            dispatch(
              showToast({
                type: CommonToastTypes.SUCCESS,
                message: data.respMessage,
              })
            );
          }
        }
        console.log('GET STATE', getState());
        console.log(
          'QUERY FULL',
          queryFulfilled,
          requestId,
          extra,
          getCacheEntry
        );
      },
    }),
    put: builder.mutation({
      query: ({ url, body }) => ({
        url,
        body,
        method: 'PUT', // Change to PUT method
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            getDataFromLocalStorage(
              'loginCredentials',
              (obj) => obj['accessToken']
            ),
        },
      }),
      transformResponse: (response) => response,
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {
        try {
          // if(arg?.url.includes("employees")) {
          // 	let { data } = await queryFulfilled;
          // 	console.log("VAMSI KIH", data);
          // 	if(data?.respCode && data?.employeeId) {
          // 		const employeeDetails = await dispatch(get({url: `employees/${data.employeeId}`})).unwrap();
          // 		console.log("EMPLOYEEE DETAILS            ", employeeDetails);
          // 		if(employeeDetails){
          // 			dispatch(setLoggedUser({ user: employeeDetails.details } ));
          // 		}
          // 	}
          // }
          let { data } = await queryFulfilled;
          if (data?.respCode) {
            console.log('DELETE SUCCESS', data.details);
            dispatch(
              showToast({
                type: CommonToastTypes.SUCCESS,
                message: data.respMessage,
              })
            );
          } else {
            dispatch(
              showToast({
                type: CommonToastTypes.ERROR,
                message: data.errorMessage,
              })
            );
          }
        } catch (error) {
          console.error('Error occurred during the PUT operation:', error);
          dispatch(
            showToast({
              type: CommonToastTypes.ERROR,
              message: 'Something went wrong',
            })
          );
        }

        console.log('GET STATE', getState());
        console.log(
          'QUERY FULL',
          queryFulfilled,
          requestId,
          extra,
          getCacheEntry
        );
      },
    }),

    delete: builder.mutation({
      query: ({ url }) => ({
        url,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            getDataFromLocalStorage(
              'loginCredentials',
              (obj) => obj['accessToken']
            ),
        },
      }),
      transformResponse: (response) => response,
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {
        try {
          let { data } = await queryFulfilled;

          if (data?.respCode) {
            console.log('DELETE SUCCESS', data.details);
            dispatch(
              showToast({
                type: CommonToastTypes.SUCCESS,
                message: data.respMessage,
              })
            );
          } else {
            dispatch(
              showToast({
                type: CommonToastTypes.ERROR,
                message: data.errorMessage,
              })
            );
          }
        } catch (error) {
          console.error('Delete operation failed:', error);
          dispatch(
            showToast({
              type: CommonToastTypes.ERROR,
              message: 'An error occurred while deleting',
            })
          );
        }

        console.log('GET STATE', getState());
        console.log(
          'QUERY FULL',
          queryFulfilled,
          requestId,
          extra,
          getCacheEntry
        );
      },
    }),
  }),
});

export const {
  useGetAllDetailsQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
} = ApiStore;
