import React, { useEffect, useState } from "react";
import GuardiasTable from "./guardias.table";
import { withCookies, useCookies } from "react-cookie";
import { generateGuardiaQR } from "../../requests/guardias.requests";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { Button } from "@material-ui/core";
import { useRootSelector } from "../../storage/root.reducer";
import { Action } from "../../storage/dispatch.actions";
import '../guardias/guardias.screen.css'
var QRCode = require("qrcode.react");


function GuardiaQR() {
  return (
    <Popup 
     position='top center' 
      trigger={
      <Button variant="contained" color="inherit" component="span"
        size='large'> Mostrar Código QR de asociación a barrio</Button>} modal>
      <QRCode value='http://localhost:3500/message/guardia/to/barrio'
        includeMargin={true}
        size={420}
      />
    </Popup>
  );
}

function GuardiaScreen() {
  const [cookie] = useCookies();
  const [QR, setQR] = useState(null);
  const dispatch = useDispatch();
  const loading: boolean = useRootSelector(
    (state) => state?.guardia.loading || true
  );

  const setLoading = (loading: boolean) =>
    dispatch({ type: Action.LOADING, loading });

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <GuardiaQR />
      <GuardiasTable/>
    </React.Fragment>
  );
}

export default withCookies(GuardiaScreen);
