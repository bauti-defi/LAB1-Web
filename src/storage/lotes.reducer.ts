import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Reducer } from "redux";
import { Action } from "./dispatch.actions";

export type Propietario = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  doc_id: string;
  doc_type: number;
  since: string;
};

export type PropietarioList = Propietario[];

export type Lote = {
  id: string;
  name: string;
  street: string;
  num: number;
  code: number;
  propietarios?: PropietarioList;
};

export type LoteRelation = {
  lote_id: string;
  lote_name: string;
  lote_street: string;
  lote_num: number;
  lote_code: number;
  prop_id?: string;
  email?: string;
  prop_fn?: string;
  prop_ln?: string;
  doc_id?: string;
  doc_type?: number;
  prop_since?: string;
};

export interface LoteState {
  lotes: Lote[];
}

const initialState: LoteState = {
  lotes: [],
};

export const useLoteSelector: TypedUseSelectorHook<LoteState> = useSelector;

const loteReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.SAVE_LOTES:
      return { ...state, lotes: parseRelations(action.relations) };
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

const parseRelations = (relations: LoteRelation[]): Lote[] => {
  const lotes: Lote[] = [];
  relations.map(parseRelation).forEach((lote) => {
    let match = lotes.find((l) => l.id === lote.id);
    if (match) {
      match.propietarios = [
        ...match.propietarios,
        ...lote.propietarios,
      ] as PropietarioList;
    } else {
      lotes.push(lote);
    }
  });
  return lotes;
};

const parseRelation = (relation: LoteRelation): Lote => {
  return {
    id: relation.lote_id,
    name: relation.lote_name,
    street: relation.lote_street,
    num: relation.lote_num,
    code: relation.lote_code,
    propietarios: ([
      {
        id: relation.prop_id,
        email: relation.email,
        first_name: relation.prop_fn,
        last_name: relation.prop_ln,
        doc_id: relation.doc_id,
        doc_type: relation.doc_type,
        since: relation.prop_since,
      },
    ] as unknown) as PropietarioList,
  };
};

export default loteReducer;
