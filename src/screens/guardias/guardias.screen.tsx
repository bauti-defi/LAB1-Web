import React from 'react';
import GuardiasTable from './guardias.table'
import { withCookies } from 'react-cookie';
import { generateGuardiaQR } from '../../requests/guardias.requests';
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