import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userId: "",
    userToken: "",
  },
  reducers: {
    logIN(state, action) {
      return {
        isLoggedIn: !state.isLoggedIn,
        userToken: action.payload.token,
        userId: action.payload.userId,
      };
    },
    logOUT(state) {
      const logout = async () => {
        await axios
          .post("http://127.0.0.1:8000/api/user/logout", "", {
            headers: {
              Authorization: `Bearer ${state.userToken}`,
            },
          })
          .then(({ data }) => {
            
          })
          .catch((error) => {
            console.error(error.message);
          });
      };
      logout();
      return {
        isLoggedIn: false,
        userId: "",
        userToken: "",
      };
    },
  },
});

export const authActions = authSlice.actions;

const persistConfig = {
  key: "main",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
