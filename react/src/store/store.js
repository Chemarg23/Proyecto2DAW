import { configureStore, createSlice } from "@reduxjs/toolkit";
import WishListService from "../services/WishListService";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    token: "",
    auth: false,
    email: "",
    createdAt: "",
    dischargeDate: "",
    rol: 0,
    phone: "",
    date: "",
    series: [],
    imgPath: "",
  },
  reducers: {
    addUser: (state, action) => {
      console.log(1234)
      const {
        id,
        name,
        token,
        email,
        createdAt,
        rol,
        dischargeDate,
        phone,
        date,
        series,
        imgPath,
      } = action.payload;
      state.id = id;
      state.name = name;
      state.token = token;
      state.auth = true;
      state.email = email;
      state.createdAt = createdAt;
      state.rol = rol;
      state.phone = phone;
      state.dischargeDate = dischargeDate;
      state.date = date;
      state.series = series;
      state.imgPath = imgPath ? imgPath : "default.png";
    },
    updateUser: (state, action) => {
      const { name, email, phone, imgPath } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.imgPath = imgPath ? imgPath : "default.png";
    },
    clear(state) {
      state.id = "";
      state.name = "";
      state.token = "";
      state.auth = false;
      state.email = "";
      state.createdAt = "";
      state.rol = 0;
      state.phone = "";
      state.dischargeDate = "";
      state.series = [];
      state.imgPath = "";
      localStorage.removeItem("user");
    },
    addToList(state, action) {
      const service = new WishListService();
      state.series.unshift(action.payload);
      service.add(state.id, action.payload.id);
    },
    removeFromList(state, action) {
      const service = new WishListService();
      state.series = state.series.filter(
        (serie) => serie.id !== action.payload.id
      );
      service.delete(state.id, action.payload.id);
    },
  },
});

export const { addUser, clear, addToList, removeFromList, updateUser } =
  userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

store.subscribe(() => {
  const userState = store.getState().user;
  localStorage.setItem("user", JSON.stringify(userState));
});
