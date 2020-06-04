import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import guardiaReducer from "./guardias.reducer";
import loteReducer from "./lotes.reducer";

const rootReducer = combineReducers({
  lote: loteReducer,
  guardia: guardiaReducer,
});

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
