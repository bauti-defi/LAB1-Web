const axios = require("axios").default;

// Agregar guardia
export const addGuardia = () =>
  axios({
    method: "post",
    url: "http:/localhost:3500/guardia/register",
  });

// Eliminar guardia
export const deleteGuardia = (guardia_id) =>
  axios({
    method: "delete",
    url: "http:/localhost:3500/guardia/delete",
    params: {
      guardia: guardia_id,
    },
  });

// Generar QR para asociar guardia
export const getAssociationQR = (token: string) =>
  axios({
    method: "post",
    url: "http://localhost:3500/message/guardia/to/barrio",
    headers: {
      Authorization: token,
    },
  });

// Información de un guardia
export type GuardiaDTO = {
  g_id: string;
  g_rank: number;
  g_email: string;
  g_birth: Date;
  g_fn: string;
  g_ln: string;
  g_doc_id: string;
  g_doc_type: number;
  g_since: string;
};
