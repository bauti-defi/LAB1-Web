    // TODO: Ask for endpoint

const axios = require("axios").default;

export const getAll = (token: string) =>
  axios({
    method: "get",
    url: "http://localhost:3500/trabajador/register",

    headers: {
      Authorization: token,
    },
  });

export const deleteLote = (lote_id: string, token: string) =>
  axios({
    method: "delete",
    // url: "http://localhost:3500/lote/delete",
    params: {
      lote: lote_id,
    },
    headers: {
      Authorization: token,
    },
  });
