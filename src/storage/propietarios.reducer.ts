import { Reducer } from "redux";
import { Action } from "./dispatch.actions";

export type Propietario = {
  lote_id: string;
  last_name: string;
  first_name: string;
  doc_id: string;
  dev_id: string;
  email: string;
  id: string;
  since: Date;
};

export interface PropietarioState {
  propietarios: Propietario[];
  loading: boolean;
}
const initialState: PropietarioState = {
  propietarios: [],
  loading: true,
};

const propietarioReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.LOADING_PROPIETARIOS:
      return { ...state, loading: action.loading };
    case Action.ADD_PROPIETARIO:
      return {
        ...state,
        propietarios: [...state.propietarios, action.propietario],
      };
    case Action.REMOVE_PROPIETARIO:
      return {
        ...state,
        propietarios: state.propietarios.filter(
          (prop) => prop.id != state.propietario_id
        ),
      };
    case Action.SAVE_PROPIETARIOS:
      return { ...state, propietarios: action.propietarios, loading: false };
    default:
      return state;
  }
};

export default propietarioReducer;
