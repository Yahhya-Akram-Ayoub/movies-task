import { createSlice, nanoid } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
  },
  reducers: {
    addUser: {
      reducer: (state, action) => {
        state.userList.push(action.payload);
      },
      prepare(value) {
        return {
          payload: {
            key: nanoid(),
            value: value,
          },
        };
      },
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
