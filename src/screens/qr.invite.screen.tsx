import React from "react";

var QRCode = require("qrcode.react");

const QRInviteScreen = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("i");
  const message = params.get("m");

  if (!message || !id) {
    return <label>Invalido!</label>;
  }

  return (
    <view>
      <label>Invitacion QR</label>
      <QRCode
        value={JSON.stringify({ id, message, path: "invite" })}
        includeMargin={true}
        size={256}
      />
    </view>
  );
};

export default QRInviteScreen;
