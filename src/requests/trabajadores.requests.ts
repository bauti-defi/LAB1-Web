// TODO: Ask for endpoint

const axios = require("axios").default;

export const registerTrabajador = (data: TrabajadorRegistrationDTO) =>
  axios({
    method: "post",
    // url: "http://localhost:3500/trabajador/register",
    data,
  });


export type TrabajadorRegistrationDTO = {
  email: string;
  first_name: string;
  last_name: string;
  doc_id: string;
  doc_type: number;
  password: string; };