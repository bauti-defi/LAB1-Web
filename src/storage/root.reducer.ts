import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import loteReducer from "./lotes.reducer";
import guardiaReducer from "./guardias.reducer";

const rootReducer = combineReducers({
  lote: loteReducer,
  guardia: guardiaReducer
});

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
