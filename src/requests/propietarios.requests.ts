const axios = require("axios").default;

export const getAll = (token: string) =>
  axios({
    method: "get",
    url: "http://localhost:3500/barrio/propietarios/all",
    headers: {
      Authorization: token,
    },
  });

export const addPropietario = (propietario_id) =>
  axios({
    method: "post",
    url: "http:/localhost:3500/propietario/register",
    params: {
      propietario: propietario_id,
    },
  });

export const disablePropietario = (
  prop_id: string,
  prop_dev_id: string,
  prop_lote_id: string,
  token: string
) =>
  axios({
    method: "put",
    url: "http://localhost:3500/barrio/propietario/disable",
    data: { prop_id, prop_dev_id, prop_lote_id },
    headers: {
      Authorization: token,
    },
  });

export const getAssociationQR = (token: string) =>
  axios({
    method: "post",
    url: "http://localhost:3500/message/prop/to/lote",
    headers: {
      Authorization: token,
    },
  });
