import { createSlice } from "@reduxjs/toolkit";
import { changeImageUser, fetchDataUser } from "../actionCreator";

const initialStateUser = {
  loading: false,
  data: [],
  error:'',
} ;

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
        // Gérez l'état pendant que l'action est en cours d'exécution
        state.loading = true;
        state.error = null;
      })
      .addCase(changeImageUser.fulfilled, (state, action) => {
        // Gérez l'état lorsque l'action est réussie
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(changeImageUser.rejected, (state, action) => {
        // Gérez l'état lorsque l'action échoue
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  userSlice.actions;

export default userSlice.reducer;
