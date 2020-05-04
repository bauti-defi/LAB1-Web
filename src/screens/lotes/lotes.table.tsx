import MaterialTable from "material-table";
import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import {
  createLote,
  CreateLoteDTO,
  deleteLote,
  getAssociationQR,
} from "../../requests/lotes.requests";
import { Action } from "../../storage/dispatch.actions";
import { Lote, useLoteSelector } from "../../storage/lotes.reducer";
import PropietariosPanel from "./propietario.panel";
import { createMuiTheme, ThemeProvider, Paper } from "@material-ui/core";

function LotesTable(props) {
  const [cookie] = useCookies();
  const lotes: Lote[] = useLoteSelector((state) => state.lote.lotes);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(!lotes);

  const actions = [
    {
      icon: "important_devices",
      tooltip: "Asociar Propietario",
      onClick: async (event, rowData) => {
        setLoading(true);
        await getAssociationQR(
          rowData.id,
          cookie.session.token
        ).then((response) => props.onShowQR(JSON.stringify(response.data)));
        setLoading(false);
      },
    },
  ];

  const edit_actions = {
    isEditable: (rowData) => false,
    isDeletable: (rowData) => true,
    onRowAdd: (newRow) => {
      const dto: CreateLoteDTO = {
        name: newRow.name,
        num: +newRow.num,
        street: newRow.street,
        code: +newRow.code,
      };
      return new Promise((resolve, reject) => {
        setTimeout(
          () =>
            createLote(dto, cookie.session.token).then((response) => {
              if (response.data) {
                dispatch({ type: Action.ADD_LOTE, lote: response.data });
                resolve();
              }
              reject();
            }),
          3000
        );
      });
    },
    onRowDelete: (oldData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          deleteLote(oldData.id, cookie.session.token).then((response) => {
            if (response) {
              dispatch({ type: Action.REMOVE_LOTE, lote_id: oldData.id });
              resolve();
            }
            reject();
          });
        }, 3000);
      });
    },
  };

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
        title="Lista de Lotes"
        editable={edit_actions}
        actions={actions}
        isLoading={loading}
        columns={columns}
        data={lotes}
        detailPanel={[
          {
            render: PropietariosPanel,
          },
        ]}
      />
      </ThemeProvider>
    </React.Fragment>
  );
}

const columns = [
  { title: "Nombre/Número", field: "name" },
  { title: "Calle", field: "street" },
  { title: "Numero de Calle", field: "num" },
  { title: "Codigo Postal", field: "code" },
];

const theme = createMuiTheme({
  typography: {
      fontSize: 18,
  }
});
export default withCookies(LotesTable);
