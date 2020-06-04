import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Action } from "../../storage/dispatch.actions";
import { Guardia, useGuardiaSelector } from "../../storage/guardias.reducer";

function GuardiasTable(props) {
  const [cookie] = useCookies();
  const guardias: Guardia[] = useGuardiaSelector((state) => state?.guardias);
  const dispatch = useDispatch();

  const setLoading = (loading: boolean) =>
    dispatch({ type: Action.LOADING, loading });

  // const actions = [
  //   {
  //     icon: "add",
  //     tooltip: "Agregar guardia",
  //     isFreeAction: true,
  //     onClick: (event) => {
  //       generateGuardiaQR(cookie.session.token);
  //     }
  //   },
  // ];

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <MaterialTable
          options={{
            headerStyle: {
              backgroundColor: "#CBD1D4",
              color: "#414B56",
              fontSize: "14px",
            },
          }}
          title="Lista de Guardias"
          // actions={actions}
          columns={columns}
          data={guardias}
        />
      </ThemeProvider>
    </React.Fragment>
  );
}
const theme = createMuiTheme({
  typography: {
    fontSize: 18,
  },
});

const columns = [
  { title: "Apellido", field: "last_name" },
  { title: "Nombre", field: "first_name" },
  { title: "Rango", field: "rank" },
  { title: "Fecha de Ingreso", field: "since" },
];

export default withCookies(GuardiasTable);
