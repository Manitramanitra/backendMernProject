import { createSlice } from "@reduxjs/toolkit";
import { changeImageUser, fetchDataUser } from "../actionCreator";

const initialStateUser = {
  loading: false,
  data: [],
  error: "",
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
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
      })
      .addCase(changeImageUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeImageUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        if (action.payload.error) {
          state.error = action.payload.error;
        }
      })
      .addCase(changeImageUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const resetError = createAction({
//   name: "user/resetError",
//   initialStateUser,
//   reducers: {
//     resetError: (state) => {
//       state.error = null;
//     },
//   },
// });

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  userSlice.actions;

export default userSlice.reducer;
