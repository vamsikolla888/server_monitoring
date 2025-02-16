import { createSlice } from '@reduxjs/toolkit';
import { dialogTypes } from '../../constants/constants';

const initialState = {
  [dialogTypes.COMMONDIALOG]: { show: false, editMode: false },
  [dialogTypes.DELETECONFIRMATION]: { show: false },
  [dialogTypes.SESSIONEXPIRED]: { show: false },
  [dialogTypes.FORMDIALOG]: { show: false, isEditMode: false, data: null },
  [dialogTypes.TABLESETTINGS]: { show: false },
};

const dialogSlice = createSlice({
  name: 'dialogSlice',
  initialState,
  reducers: {
    showDialog: (state, { payload }) => {
      state[payload.type].show = true;
    },
    hideDialog: (state, { payload }) => {
      state[payload.type].show = false;
    },
  },
});

export const { showDialog, hideDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
