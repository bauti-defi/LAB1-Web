const axios = require("axios").default;

export const getAll = (token: string) =>
  axios({
    method: "get",
    url: "http://localhost:3500/lote/barrio/all",
    headers: {
      Authorization: token,
    },
  });

export const deleteLote = (lote_id: string, token: string) =>
  axios({
    method: "delete",
    url: "http://localhost:3500/lote/delete",
    params: {
      lote: lote_id,
    },
    headers: {
      Authorization: token,
    },
  });

export const createLote = (data: CreateLoteDTO, token: string) =>
  axios({
    method: "post",
    url: "http://localhost:3500/lote/new",
    data,
    headers: {
      Authorization: token,
    },
  });

export const getAssociationQR = (lote_id: string, token: string) =>
  axios({
    method: "post",
    url: "http://localhost:3500/message/prop/to/lote",
    params: {
      lote: lote_id,
    },
    headers: {
      Authorization: token,
    },
  });

export type CreateLoteDTO = {
  name: string;
  num: number;
  street: string;
  code: number;
};
