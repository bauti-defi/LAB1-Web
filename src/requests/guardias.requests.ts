const axios = require("axios").default;

// Eliminar guardia
export const disableGuardia = (
  guardia_id: string,
  guardia_dev_id: string,
  token: string
) =>
  axios({
    method: "put",
    url: "http://localhost:3500/barrio/guardia/disable",
    data: { guardia_id, guardia_dev_id },
    headers: {
      Authorization: token,
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

export const getAllGuardias = (token: string) =>
  axios({
    method: "get",
    url: "http://localhost:3500/barrio/guardias/all",
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
