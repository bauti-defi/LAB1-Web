import React, { useEffect, useState } from 'react';
import GuardiasTable from './guardias.table'
import { withCookies, useCookies } from 'react-cookie';
import { generateGuardiaQR } from '../../requests/guardias.requests';
import { useDispatch } from 'react-redux';
var QRCode = require("qrcode.react");


function GuardiaScreen() {
  const [cookie] = useCookies();
  const [QR, setQR] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      return await generateGuardiaQR(cookie.session.token)
        .catch((error) => console.error(error));
    }
  })
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