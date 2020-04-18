import { combineReducers, createStore } from "redux";
import loteReducer from "./lotes.reducer";

const rootReducer = combineReducers({
  lote: loteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

export default store;
