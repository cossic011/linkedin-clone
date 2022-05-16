import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalState: {
    key: "modalState",
    default: false,
  },
  modalType: {
    key: "modalTypeState",
    default: "dropIn",
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: (state) => {
      state.modalState.default = !state.modalState.default;
    },
    modalType: (state, action) => {
      state.modalType.default = action.payload;
    },
  },
});

export const { modalOpen, modalType } = modalSlice.actions;
export default modalSlice.reducer;
