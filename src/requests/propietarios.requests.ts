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
        method: 'post',
        url: "http:/localhost:3500/propietario/register",
        params: {
            propietario: propietario_id
        }
})

export const deletePropietario = (user_id: string, token: string) =>
    axios({
        method: "delete",
        url: "http://localhost:3500/propietarios/delete",
        params: {
            user: user_id,
        },
        headers: {
            Authorization: token,
        },
    });
