import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Action } from "../../storage/dispatch.actions";
import { Guardia, useGuardiaSelector } from "../../storage/guardias.reducer";
import { disableGuardia } from "../../requests/guardias.requests";

function GuardiasTable(props) {
  const [cookie] = useCookies();
  const guardias: Guardia[] = useGuardiaSelector((state) => state?.guardias);
  const dispatch = useDispatch();

  const loading: boolean = useGuardiaSelector((state) => state?.loading);

  const edit_actions = {
    isEditable: (rowData) => false,
    isDeletable: (rowData) => true,
    onRowDelete: (oldData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          disableGuardia(
            oldData.id,
            oldData.dev_id,
            cookie.session.token
          ).then((response) => {
            if (response) {
              dispatch({
                type: Action.REMOVE_GUARDIA,
                guardia_id: oldData.id,
              });
              resolve();
            }
            reject();
          });
        }, 3000);
      })
    }
  }
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
          editable={edit_actions}
          isLoading={loading}
          columns={columns}
          data={guardias}
          localization={{
            header: {
              actions: " Acciones",
            },
          }}
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
