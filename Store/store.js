import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

import signInSlice from "./Slices/SignIn";
import contactsSlice from "./Slices/Contacts";

export const rootReducer = combineReducers({
  signIn: signInSlice,
  contactsData: contactsSlice,
});

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
});

// export const persistor = persistStore(store);
