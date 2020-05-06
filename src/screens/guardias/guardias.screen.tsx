import React from 'react';
import GuardiasTable from './guardias.table'
import { withCookies } from 'react-cookie';
var QRCode = require("qrcode.react");

function GuardiaScreen() {
  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <GuardiasTable />
    </React.Fragment>
  );
}

export default withCookies(GuardiaScreen);