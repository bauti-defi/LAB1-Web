import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Reducer } from 'redux'; 
import { Action } from './dispatch.actions';

export type Guardia = {
    user_id:string
    rank:number;
    email?: string;
    fn?: string;
    ln?: string;
    doc_id?: string;
    doc_type?: number;
    guardia_since?: string;
}

export interface GuardiaState {
    guardias: Guardia[];
}
const initialState: GuardiaState = {
    guardias: [],
}

export const useGuardiaSelector: TypedUseSelectorHook<GuardiaState> = useSelector;

const guardiaReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.ADD_GUARDIA:
            return { ...state, guardias: [...state, action.guardia]}
        case Action.REMOVE_GUARDIA:
            return {...state, lotes: state.guardia}
    }
}