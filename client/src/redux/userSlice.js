import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

//export const selectCount = (state: RootState) => state.app

export default userSlice.reducer;

export function login(data) {
  return async (dispatch) => {
    try {
      const response = await api.login(data);
      dispatch(setUser(response.data));
      // console.log("response", response.data);
    } catch (e) {
      console.log(e.response);
    }
  };
}

export function register(data) {
  return async (dispatch) => {
    try {
      const response = await api.register(data);
      dispatch(setUser(response.data));
      //console.log("response", response.data);
    } catch (e) {
      console.log(e.response);
    }
  };
}

export async function update(data) {
  const response = await api.update(data);
  console.log("response", response);
}
