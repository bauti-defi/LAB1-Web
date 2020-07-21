import { combineReducers } from "redux";
import guardiaReducer from "./guardias.reducer";
import loteReducer from "./lote.reducer";
import propietarioReducer from "./propietarios.reducer";

const rootReducer = combineReducers({
  guardia: guardiaReducer,
  propietario: propietarioReducer,
  lote: loteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
