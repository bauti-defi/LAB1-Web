import { Reducer } from "redux";
import { Action } from "./dispatch.actions";

export type Guardia = {
  id: string;
  rank: number;
  email: string;
  first_name: string;
  last_name: string;
  dev_id: string;
  doc_id: string;
  since: string;
};

export interface GuardiaState {
  guardias: Guardia[];
  loading: boolean;
}
const initialState: GuardiaState = {
  guardias: [],
  loading: true,
};

const guardiaReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.ADD_GUARDIA:
      return { ...state, guardias: [...state.guardia, action.guardia] };
    case Action.REMOVE_GUARDIA:
      return {
        ...state,
        guardias: state.guardias.filter((g) => g.id != action.guardia_id),
      };
    case Action.SAVE_GUARDIAS:
      return { ...state, guardias: action.guardias, loading: false };
    case Action.LOADING_GUARDIAS:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};

export default guardiaReducer;
