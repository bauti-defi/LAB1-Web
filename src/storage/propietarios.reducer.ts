import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Reducer } from "redux";
import { Action } from "./dispatch.actions";

export type Propietario = {
    lote_id: string;
    user_id: string;
    device_id: string;
    nickname: string;
    enabled: boolean;
    creation_date: Date;
};

export interface PropietarioState {
  propietarios: Propietario[];
  loading: boolean;
}
const initialState: PropietarioState = {
  propietarios: [],
  loading: true,
};

export const usePropietarioSelector: TypedUseSelectorHook<PropietarioState> = useSelector;


const propietarioReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
      case Action.LOADING:
          return {...state, loading: action.loading}
    case Action.ADD_PROPIETARIO:
      return { ...state, propietarios: [...state, action.propietario] };
    case Action.REMOVE_PROPIETARIO:
      return { ...state, propietario: state.propietario };
    default:
      return state;
  }
};

export default propietarioReducer;

