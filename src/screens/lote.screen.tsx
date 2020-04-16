import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Popup from "reactjs-popup";
import {
  createInvite,
  createLote,
  CreateLoteDTO,
  deleteLote,
  getAll,
} from "../requests/lotes.requests";

var QRCode = require("qrcode.react");

function LoteScreen() {
  const [cookie] = useCookies();
  const [lotes, setLotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [QR, setQR] = useState(null);

  const actions = [
    {
      icon: "important_devices",
      tooltip: "Asociar Propietario",
      onClick: async (event, rowData) => {
        setLoading(true);
        await createInvite(
          rowData.lote_id,
          cookie.session.token
        ).then((response) => setQR(JSON.stringify(response.data)));
        setLoading(false);
      },
    },
  ];

  const edit_actions = {
    isEditable: (rowData) => false,
    isDeletable: (rowData) => true,
    onRowAdd: (newRow) => {
      const dto: CreateLoteDTO = {
        name: newRow.lote_name,
        num: +newRow.lote_num,
        street: newRow.lote_street,
        code: +newRow.lote_code,
      };
      return new Promise((resolve, reject) => {
        setTimeout(
          () =>
            createLote(dto, cookie.session.token).then((response) => {
              if (response.data) {
                newRow.propietarios = [];
                setLotes([...lotes, newRow]);
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
          deleteLote(oldData.lote_id, cookie.session.token).then((response) => {
            if (response) {
              setLotes([
                ...lotes.filter((lote) => lote.lote_id != oldData.lote_id),
              ]);
              resolve();
            }
            reject();
          });
        }, 3000);
      });
    },
  };

  useEffect(() => {
    getAll(cookie.session.token)
      .then((response) => {
        setLotes(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Popup open={!!QR} closeOnDocumentClick onClose={() => setQR(null)}>
        <QRCode value={QR} includeMargin={true} size={512} />
      </Popup>
      <MaterialTable
        title="Lista de Lotes"
        editable={edit_actions}
        actions={actions}
        isLoading={loading}
        columns={columns}
        data={lotes}
        detailPanel={[
          {
            render: detailPanel,
          },
        ]}
      />
    </React.Fragment>
  );
}

function detailPanel(rowData) {
  return (
    <div>
      <h2>Propietarios</h2>
      {rowData.propietarios.map(propietarioLabel)}
    </div>
  );
}

function propietarioLabel(propietario) {
  return (
    <div>
      <h5>
        Nombre: {propietario.last_name}, {propietario.first_name}
      </h5>
      <h5>DNI: {propietario.doc_id}</h5>
    </div>
  );
}

const columns = [
  { title: "Nombre/Número", field: "lote_name" },
  { title: "Calle", field: "lote_street" },
  { title: "Numero de Calle", field: "lote_num" },
  { title: "Codigo Postal", field: "lote_code" },
];

export default LoteScreen;
