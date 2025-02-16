import { createAsyncThunk } from '@reduxjs/toolkit';
import showToaster from '../../common/toast/CommonToast';
import { ApiStore } from '../Apislice';
import { hideDialog, showDialog } from './dialogSlice';
import { dialogTypes } from '../../constants/constants';
import { showToast } from './Uislice';
import { CommonToastTypes } from '../../common/toast/Toast';

export const add = createAsyncThunk(
  'fetch/add',
  async ({ url, body, refetch = null }, { dispatch, rejectWithValue }) => {
    try {
      const results = await dispatch(
        ApiStore.endpoints.post.initiate({ url, body })
      ).unwrap();
      if (results?.respCode) {
        await dispatch(hideDialog({ type: dialogTypes.COMMONDIALOG }));
        const refetchResult = await refetch();
        console.log('REFECH RESULTS', refetchResult);
      }
    } catch (err) {
      dispatch(
        showToast({ type: CommonToastTypes.ERROR, message: err.message })
      );
    }
  }
);

export const update = createAsyncThunk(
  'fetch/update',
  async ({ url, body, refetch = null }, { dispatch, rejectWithValue }) => {
    try {
      const results = await dispatch(
        ApiStore.endpoints.put.initiate({ url, body })
      ).unwrap();
      if (results?.respCode) {
        await dispatch(hideDialog({ type: dialogTypes.COMMONDIALOG }));
        const refetchResult = await refetch();
        console.log('REFECH RESULTS', refetchResult);
      }
    } catch (err) {
      dispatch(
        showToast({ type: CommonToastTypes.ERROR, message: err.message })
      );
    }
  }
);

export const multiDelete = createAsyncThunk(
  'fetch/multiDelete',
  async ({ url, body, refetch = null }, { dispatch, rejectWithValue }) => {
    try {
      const results = await dispatch(
        ApiStore.endpoints.post.initiate({ url, body })
      ).unwrap();
      if (results?.respCode) {
        await dispatch(hideDialog({ type: dialogTypes.DELETECONFIRMATION }));
        const refechResult = await refetch();
        console.log('REFECH RESULTS', refechResult);
      }
      console.log('RESULTSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', results);
    } catch (err) {
      console.log('CUSTOM API SLICE ERROR', err);
    }
  }
);

export const showDeleteToast = createAsyncThunk(
  'fetch/showDelete',
  async ({ url = null }, { dispatch }) => {
    console.log('SHWO DELETE TOAST', url);
    await dispatch(showDialog({ type: dialogTypes.DELETECONFIRMATION }));
  }
);

export const remove = createAsyncThunk(
  'fetch/delete',
  async ({ url, refetch = null }, { dispatch, rejectWithValue }) => {
    try {
      const results = await dispatch({ url });
      if (results?.respCode) {
        await dispatch(hideDialog({ type: dialogTypes.DELETECONFIRMATION }));
        // const refechResult = await refetch();
        // console.log("REFECH RESULTS", refechResult);
      }
    } catch (err) {
      console.log('CUSTOM API SLICE ERROR', err);
    }
  }
);

export const get = createAsyncThunk(
  'fetch/get',
  async ({ url, refetch = null }, { dispatch, rejectWithValue }) => {
    try {
      // Dispatch the API call and unwrap the result to get the data or throw an error
      const result = await dispatch(
        ApiStore.endpoints.getAllDetails.initiate(url)
      ).unwrap();
      console.log('RESULTS', result);
      return result; // Return the result if successful
    } catch (err) {
      console.error('ERROR', err);
      return rejectWithValue(err); // Return error for proper rejection handling
    }
  }
);

export const upload = createAsyncThunk(
  'fetch/upload',
  async ({ url, body, refetch = null }, { dispatch, rejectWithValue }) => {
    let formData = new FormData();
    formData.append('file', body);
    console.log('FORMDATA', formData.values());
    const results = await dispatch(
      ApiStore.endpoints.post.initiate({ url, body: formData, headers: {} })
    ).unwrap();
    return results;
  }
);
