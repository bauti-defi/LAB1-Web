import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import loteReducer from "./lotes.reducer";

const rootReducer = combineReducers({
  lote: loteReducer,
});

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
