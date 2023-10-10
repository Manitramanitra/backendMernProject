import { createSlice } from "@reduxjs/toolkit";
import { fetchDataUser } from "../actionCreator";

const initialStateUser = {
  loading: false,
  data: [],
  error:'',
} ;

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  // reducers: {
  //   fetchDataStart(state) {
  //     state.loading = true;
  //     state.error = null;
  //   },
  //   fetchDataSuccess(state, action) {
  //     state.loading = false;
  //     state.data = action.payload;
  //   },
  //   fetchDataFailure(state, action) {
  //     state.loading = false;
  //     state.error = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  userSlice.actions;

export default userSlice.reducer;
