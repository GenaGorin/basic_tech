import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;

export function getUsers() {
  return async (dispatch) => {
    try {
      const response = await api.getUsers();
      dispatch(setUsers(response.data.users));
    } catch (e) {
      console.log(e.response);
    }
  };
}
