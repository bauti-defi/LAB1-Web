import MaterialTable from "material-table";
import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import {
  createInvite,
  createLote,
  CreateLoteDTO,
  deleteLote,
} from "../../requests/lotes.requests";
import { Action } from "../../storage/dispatch.actions";
import { Lote, useLoteSelector } from "../../storage/lotes.reducer";
import PropietariosPanel from "./propietario.panel";

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
        await createInvite(rowData.id, cookie.session.token).then((response) =>
          props.onShowQR(JSON.stringify(response.data))
        );
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
      <MaterialTable
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
    </React.Fragment>
  );
}

const columns = [
  { title: "Nombre/Número", field: "name" },
  { title: "Calle", field: "street" },
  { title: "Numero de Calle", field: "num" },
  { title: "Codigo Postal", field: "code" },
];

export default withCookies(LotesTable);
