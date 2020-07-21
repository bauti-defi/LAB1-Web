import { Reducer } from "redux";
import { Action } from "./dispatch.actions";

export type Lote = {
  id: string;
  name: string;
  street: string;
  num: number;
  code: number;
};

export interface LoteState {
  lotes: Lote[];
  loading: boolean;
}

const initialState: LoteState = {
  lotes: [],
  loading: true,
};

const loteReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.LOADING_LOTES:
      return { ...state, loading: action.loading };
    case Action.SAVE_LOTES:
      return { ...state, lotes: action.lotes, loading: false };
    case Action.ADD_LOTE:
      return { ...state, lotes: [...state.lotes, action.lote] };
    case Action.REMOVE_LOTE:
      return {
        ...state,
        lotes: state.lotes.filter((lote) => lote.id !== action.lote_id),
      };
    default:
      return state;
  }
};

export default loteReducer;
