import React, { useState, useEffect } from "react";
import { withCookies, useCookies } from "react-cookie";
import MaterialTable from "material-table";
import Popup from 'reactjs-popup'

const axios = require("axios").default;

var QRCode = require('qrcode.react');

function LoteScreen() {

  const [cookie] = useCookies(['session'])
  const [lotes, setLotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showQR, setShowQR] = useState(false)
  const [associationURL, setAssociationURL] = useState(null)

  const actions = [
    {
      icon: 'important_devices',
      tooltip: 'Asociar Propietario',
      onClick: (event, rowData) => {
        setAssociationURL(`lote/associate?lote=${rowData.lote_id}&barrio=${cookie.session.acc_id}`)
        setShowQR(true)
      }
    }
  ]

  useEffect(() =>{
    axios({
      method: 'get',
      url: 'http://localhost:3500/lote/all',
      headers:{
        Authorization: cookie.session.token
      }
    }).then(response => {
      setLotes(response.data)
      setLoading(false)
    })
    .catch(error => console.error(error))
  }, [])

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Popup
        open={showQR}
        closeOnDocumentClick
        onClose={() => setShowQR(false)}
      >
        <QRCode 
        value={associationURL}
        includeMargin={true}
        size={512}
        />
      </Popup>
      <MaterialTable
        title="Lista de Lotes"
        actions={actions}
        isLoading={loading}
        columns={columns}
        data={lotes}
        detailPanel={[
          {
          render: detailPanel
        }]
        }
      />
    </React.Fragment>
  );
}

function detailPanel(rowData){
  return (
    <div>
      <h2>Propietarios</h2>
      {rowData.propietarios.map(propietarioLabel)}
    </div>
  );
}

function propietarioLabel(propietario){
  return (
    <div>
      <h5>Nombre: {propietario.last_name}, {propietario.first_name}</h5>
      <h5>DNI: {propietario.doc_id}</h5>
    </div>
  );
}

const columns = [
  { title: "Nombre/Número", field: "lote_name" },
  { title: "Calle", field: "lote_street" },
  { title: "Numero de Calle", field: "lote_num" },
  { title: "Codigo Postal", field: "lote_code" }
]

export default LoteScreen;
