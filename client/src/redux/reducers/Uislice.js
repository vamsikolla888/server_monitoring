import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import showToaster from '../../common/toast/CommonToast';

export const DialogTypes = {
  COMMONDIALOG: 'commonDialog',
};
const initialState = {
  toast: {
    show: false,
    severity: 'error',
    message: '',
    life: 3000,
    summary: 'Error',
  },
  pagination: { first: 0, rows: 10, page: 1, totalCount: 0 },
  loggedUser: { details: null },
  form: { isEditMode: false, formData: null },
};

export const fetchIcons = createAsyncThunk('fetch/icons', async (obj) => {
  const Icon = await obj.icon;
  return { ...obj, Icon };
});

const Uislice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (_, action) => {
      showToaster(action.payload);
    },
    hideToast: (state) => {
      state.show = false;
    },
    setLoggedUser: (state, action) => {
      state.loggedUser.details = action.payload.user;
    },
    setItem: (state, action) => {
      console.log('AC', action);
      localStorage.setItem(
        action.payload.key,
        JSON.stringify(action.payload.value)
      );
    },
    setFormData: (state, action) => {
      state.form.isEditMode = action.payload.isEditMode;
      state.form.formData = action.payload.formData;
    },
    clearFormData: (state) => {
      state.form = { isEditMode: false, formData: null };
    },
    setPagination: (state, action) => {
      state.pagination = Object.assign(state.pagination, action.payload);
    },
    clearPagination: (state) => {
      state.pagination = { first: 0, rows: 10, page: 1, totalCount: 0 };
    },
  },

  /**@ASYNC handling */
  // extraReducers: builder => {
  //     builder.addCase(fetchIcons.fulfilled, (state, action) => {

  //         let findIcon = state?.sidebarIcons.find(icon => icon.name === action.payload.name);
  //         if(!findIcon) {
  //             console.log("FULL", action.payload);
  //             state.sidebarIcons.push(action.payload)
  //         }
  //     }),
  //     builder.addCase(fetchIcons.rejected, (state, action) => {
  //         console.log("ERROR")
  //     })
  // }
});

export const {
  showToast,
  hideToast,
  setItem,
  setLoggedUser,
  setFormData,
  clearFormData,
  setPagination,
  clearPagination,
} = Uislice.actions;
export default Uislice.reducer;
