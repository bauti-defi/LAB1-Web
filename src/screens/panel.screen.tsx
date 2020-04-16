import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";

const axios = require("axios").default;

var QRCode = require("qrcode.react");

export default function PanelScreen() {
  const [cookie] = useCookies();
  const [invitationCode, setInvitationCode] = useState();
  const [showQR, setShowQR] = useState(false);

  function requestInvite(event) {
    axios({
      method: "get",
      url: "http://localhost:3500/barrio/new/invite",
      headers: {
        Authorization: cookie.session.token,
      },
    }).then((response) => {
      setInvitationCode(response.data);
      setShowQR(true);
    });
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
      }}
    >
      <div>
        <h3>Acá voy a mostrar la info del barrio</h3>
      </div>

      {showQR ? (
        <div>
          <QRCode value={invitationCode} />
          <div>
            <Button type="button" onClick={(e) => setShowQR(false)}>
              Ocultar
            </Button>
          </div>
        </div>
      ) : (
        <Button type="button" onClick={requestInvite}>
          Mostrar Invitacion QR
        </Button>
      )}
    </div>
  );
}
