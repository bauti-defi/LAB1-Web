import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import Popup from "reactjs-popup";
import { getAssociationQR } from "../../requests/guardias.requests";
import "../guardias/guardias.screen.css";
import GuardiasTable from "../guardias/guardias.table";
var QRCode = require("qrcode.react");

function GuardiaScreen() {
  const [cookie] = useCookies();
  const [QR, setQR] = useState(null);

  const handleAssociation = (event) => {
    getAssociationQR(cookie.session.token)
      .then((response) => response.data)
      .then((data) => {
        data.path = "guardia/register";
        return data;
      })
      .then(JSON.stringify)
      .then(setQR);
  };

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <button type="button" onClick={handleAssociation}>
        Asociar Guardia
      </button>
      <Popup open={!!QR} closeOnDocumentClick onClose={() => setQR(null)}>
        <QRCode value={QR} includeMargin={true} size={512} />
      </Popup>
      <Popup
        trigger={<button className="button">Asociar Guardia</button>}
        modal
      >
        {(close) => (
          <div className="flex-container">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header"> Asociación de Guardia </div>
            <div className="content">
              {" "}
              Escanee el código QR mostrado para asociar un guardia al barrio.
            </div>
            <div id="outPopUp">
              <QRCode value={QR} size="256" />
            </div>
          </div>
        )}
      </Popup>
      <GuardiasTable />
    </React.Fragment>
  );
}

export default withCookies(GuardiaScreen);
