import MaterialTable from "material-table";
import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Lote, useLoteSelector } from "../../storage/lotes.reducer";
import { ThemeProvider, createMuiTheme, Typography } from "@material-ui/core";
import { registerTrabajador, TrabajadorRegistrationDTO } from '../../requests/trabajadores.requests'

function TrabajadoresTable(props) {
  const [cookie] = useCookies();
  const lotes: Lote[] = useLoteSelector((state) => state.lote.lotes);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(!lotes);

  // WIP
  // const edit_actions = { isEditable: (rowData) => false,
  //   isDeletable: (rowData) => true,
  //   onRowAdd: (newRow) => {
  //     const dto: TrabajadorRegistrationDTO = {
  //       email: newRow.string,
  //     first_name: newRow.first_name,
  //     last_name: newRow.strin,
  //     doc_id: newRow.string,
  //     doc_type: newRow.number,
  //     password: newRow.string, // Password as string?
  //     };
  //     return new Promise((resolve, reject) => {
  //       setTimeout(
  //         () =>
  //           createLote(dto, cookie.session.token).then((response) => {
  //             if (response.data) {
  //               dispatch({ type: Action.ADD_LOTE, lote: response.data });
  //               resolve();
  //             }
  //             reject();
  //           }),
  //         3000
  //       );
  //     });
  //   },
  //   onRowDelete: (oldData) => {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         deleteLote(oldData.id, cookie.session.token).then((response) => {
  //           if (response) {
  //             dispatch({ type: Action.REMOVE_LOTE, lote_id: oldData.id });
  //             resolve();
  //           }
  //           reject();
  //         });
  //       }, 3000);
  //     });
  //   },
  // };
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <MaterialTable
        options={{
          headerStyle: {
            backgroundColor: 	"#CBD1D4",
            color: "#414B56",
            fontSize: "14px"
          },
        }}
        title="Lista de Trabajadores"
        isLoading={loading}
        columns={columns}
        data={lotes}
        detailPanel={[]}
      />
      </ThemeProvider>
    </React.Fragment>
  );
}

const columns = [
  { title: "Apellido", field: "surname" },
  { title: "Nombre", field: "name" },
  { title: "Ocupación", field: "occupation" },
];


const theme = createMuiTheme({
  typography: {
      fontSize: 18,
  }
});
export default withCookies(TrabajadoresTable);
