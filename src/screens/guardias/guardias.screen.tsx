import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import Popup from "reactjs-popup";
import { getAssociationQR } from "../../requests/guardias.requests";
import "../guardias/guardias.screen.css";
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
    </React.Fragment>
  );
}

export default withCookies(GuardiaScreen);
