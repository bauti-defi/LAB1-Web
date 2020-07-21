import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Reducer } from "redux";
import { Action } from "./dispatch.actions";

export type Guardia = {
  user_id: string;
  rank: number;
  email: string;
  fn: string;
  ln: string;
  doc_id: string;
  doc_type: number;
  guardia_since: string;
};

export interface GuardiaState {
  guardias: Guardia[];
  loading: boolean;
}
const initialState: GuardiaState = {
  guardias: [],
  loading: true,
};

export const useGuardiaSelector: TypedUseSelectorHook<GuardiaState> = useSelector;

const guardiaReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.ADD_GUARDIA:
      return { ...state, guardias: [...state.guardia, action.guardia] };
    case Action.REMOVE_GUARDIA:
      return {
        ...state,
        guardia: state.guardia.filter(
          (prop) => prop.id != state.guardia.id
        ),
      };
    case Action.SAVE_GUARDIAS:
      return { ...state, guardias: action.guardias, loading: false };
    case Action.LOADING_GUARDIAS:
      return { ...state, loading: action.loading};
    default:
      return state;
  }
};

export default guardiaReducer;
