import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isErrorUser: false,
  isSuccessUser: false,
  isLoadingUser: false,
  messageUser: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.loginUser(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logoutUser();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoadingUser = false;
      state.isSuccessUser = false;
      state.isErrorUser = false;
      state.messageUser = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.isSuccessUser = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.isErrorUser = true;
        state.messageUser = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
