import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { Action } from "../../storage/dispatch.actions";
import { useRootSelector } from "../../storage/root.reducer";
import "../guardias/guardias.screen.css";
import GuardiasTable from "./guardias.table";
var QRCode = require("qrcode.react");

function GuardiaQR() {
  return (
    <Popup
      position="top center"
      trigger={
        <Button
          variant="contained"
          color="inherit"
          component="span"
          size="large"
        >
          {" "}
          Mostrar Código QR de asociación a barrio
        </Button>
      }
      modal
    >
      <QRCode
        value="http://localhost:3500/message/guardia/to/barrio"
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
      <GuardiasTable />
    </React.Fragment>
  );
}

export default withCookies(GuardiaScreen);
