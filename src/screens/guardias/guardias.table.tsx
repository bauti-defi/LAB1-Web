import MaterialTable from "material-table";
import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import {
  addGuardia,
  generateGuardiaQR,
  GuardiaDTO,
} from "../../requests/guardias.requests";
import { useGuardiaSelector } from "../../storage/guardias.reducer";
import { Guardia } from "../../storage/guardias.reducer";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Action } from "../../storage/dispatch.actions";

function GuardiasTable(props) {
  const [cookie] = useCookies();
  const guardias: Guardia[] = useGuardiaSelector((state) => state.guardias);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(!guardias);

    // const edit_actions = {
    // isEditable: (rowData) => false,
    // isDeletable: (rowData) => false,
    // onRowAdd: (newRow) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(
    //       () =>
    //         addGuardia().then((response) => {
    //           if (response.data) {
    //               generateGuardiaQR()
    //                   .then(JSON.stringify)
    //                   .then((qrData) => {
    //                       props.onShowQR(qrData);
    //                       setLoading(false);
    //                   })
    //             dispatch({ type: Action.ADD_LOTE, lote: response.data });
    //             resolve();
    //           }
    //           reject();
    //         }),
    //       3000
    //     );
    //   });
    // },
    // onRowDelete: (oldData) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       addGuardia().then((response) => {
    //         if (response) {
    //           dispatch({ type: Action.REMOVE_LOTE, lote_id: oldData.id });
    //           resolve();
    //         }
    //         // reject();
    //       });
    //     }, 3000);
    //   });
    // },
    // }

  const actions = [
    {
      icon: "important_devices",
      tooltip: "Agregar guardia",
      onClick: async (event, rowData) => {
        setLoading(true);
        generateGuardiaQR()
          .then((response) => response.data)
          .then((data) => {
            data.path = "guardia/to/barrio";
            return data;
          })
          .then(JSON.stringify)
          .then((qrData) => {
            props.onShowQR(qrData);
            setLoading(false);
          });
      },
    },
  ];


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
          actions={actions}
        //   editable={edit_actions}
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
    { title: "Apellido", field: 'last_name' },
    { title: "Nombre", field: 'first_name' },
    { title: "Rango", field: 'rank' },
    { title: "Fecha de Ingreso", field: 'since' }

];

export default withCookies(GuardiasTable)
