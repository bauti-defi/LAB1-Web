import { createMuiTheme } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { deletePropietario } from "../../requests/propietarios.requests";
import { Action } from "../../storage/dispatch.actions";
import {
  Propietario,
  usePropietarioSelector,
} from "../../storage/propietarios.reducer";

function PropietariosPanel(rowData) {
  return (
    <div>
      <h2>Propietarios: {rowData.propietarios?.length}</h2>
    </div>
  );
}
function PropietariosTable(props) {
  const [cookie] = useCookies();
  const propietarios: Propietario[] = usePropietarioSelector(
    (state) => state?.propietarios
  );

  const loading: boolean = usePropietarioSelector((state) => state?.loading);
  const dispatch = useDispatch();

  const edit_actions = {
    isEditable: (rowData) => false,
    isDeletable: (rowData) => true,
    onRowDelete: (oldData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          deletePropietario(oldData.id, cookie.session.token).then(
            (response) => {
              if (response) {
                dispatch({
                  type: Action.REMOVE_PROPIETARIO,
                  propietario_id: oldData.id,
                });
                resolve();
              }
              reject();
            }
          );
        }, 3000);
      });
    },
  };
  return (
    <React.Fragment>
      <MaterialTable
        options={{
          headerStyle: {
            backgroundColor: "#CBD1D4",
            color: "#414B56",
            fontSize: "14px",
          },
        }}
        title="Lista de Propietarios"
        editable={edit_actions}
        // actions={actions}
        isLoading={loading}
        columns={columns}
        data={propietarios}
        localization={{
          header: {
            actions: "  Acciones",
          },
          body: {
            addTooltip: "Agregar Lote",
          },
        }}
        detailPanel={[
          {
            render: PropietariosPanel,
          },
        ]}
      />
    </React.Fragment>
  );
}

const columns = [
  { title: "Nombre", field: "name" },
  { title: "Lote", field: "name" },
  { title: "Fecha de asociación", field: "name" },
];

const theme = createMuiTheme({
  typography: {
    fontSize: 18,
  },
});

export default withCookies(PropietariosTable);
