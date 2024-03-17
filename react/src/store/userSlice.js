import { createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    token: "",
    auth: false,
    email: "",
    createdAt: "",
    dischargeDate:"",
    rol: 0,
    phone:"",
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      const { name, token, email, createdAt, rol,dischargeDate,phone  } = action.payload;
      state.name = name;
      state.token = token;
      state.auth = true;
      state.email = email;
      state.createdAt = createdAt;
      state.rol = rol;
      state.phone = phone
      state.dischargeDate = dischargeDate
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addUser, changeEmail, setLoading, setError } = userSlice.actions;

export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  const service = new AuthService();
  const user = await service.userLogin(credentials);
  dispatch(addUser(user));
};

export default userSlice.reducer;
