import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import {
  createLote,
  CreateLoteDTO,
  getAssociationQR,
} from "../../requests/lotes.requests";
import { useLoteSelector } from "../../storage/app.selectors";
import { Action } from "../../storage/dispatch.actions";
import { Lote } from "../../storage/lote.reducer";
import "./lotes.table.css";
import Popup from "reactjs-popup";

const LotesTable = (props) => {
  const [cookie] = useCookies();
  const lotes: Lote[] = useLoteSelector((state) => state?.lotes);
  const loading: boolean = useLoteSelector((state) => state?.loading);
  const dispatch = useDispatch();

  const setLoading = (loading: boolean) =>
    dispatch({ type: Action.LOADING_LOTES, loading });

  const actions = [
    {
      icon: "important_devices",
      tooltip: "Asociar Propietario",
      onClick: (event, rowData) => {
        setLoading(true);
        getAssociationQR(rowData.id, cookie.session.token)
          .then((response) => response.data)
          .then((data) => {
            data.path = "propietario/register";
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

  const edit_actions = {
    isEditable: (rowData) => false,
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
  };

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
          title="Lista de Lotes"
          editable={edit_actions}
          actions={actions}
          isLoading={loading}
          columns={columns}
          data={lotes}
          localization={{
            header: {
              actions: "  Acciones",
            },
            body: {
              addTooltip: "Agregar Lote",
            },
          }}
        />
      </ThemeProvider>
    </React.Fragment>
  );
};

const columns = [
  { title: "Nombre/Número", field: "name" },
  { title: "Calle", field: "street" },
  { title: "Numero de Calle", field: "num" },
  { title: "Codigo Postal", field: "code" },
];

const theme = createMuiTheme({
  typography: {
    fontSize: 18,
  },
});
export default withCookies(LotesTable);
