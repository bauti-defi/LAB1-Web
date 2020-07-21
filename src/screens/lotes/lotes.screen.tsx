import React, { useEffect, useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { getAll } from "../../requests/lotes.requests";
import { useLoteSelector } from "../../storage/app.selectors";
import { Action } from "../../storage/dispatch.actions";
import LotesTable from "./lotes.table";

var QRCode = require("qrcode.react");

function LoteScreen() {
  const [cookie] = useCookies();
  const [QR, setQR] = useState(null);
  const loading: boolean = useLoteSelector((state) => state?.loading);
  const dispatch = useDispatch();

  const setLoading = (loading: boolean) =>
    dispatch({ type: Action.LOADING_LOTES, loading });

  useEffect(() => {
    if (loading) {
      getAll(cookie.session.token)
        .then((response) => {
          dispatch({ type: Action.SAVE_LOTES, lotes: response.data || [] });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div className="button">
            <h1>  Instrucciones para asociar un propietario </h1>
            <div>
        <ol>
          <li> 1. Cree el lote al que pertenece el propietario (en caso aún no exista) agregando la información requerida. </li>
          </ol>
          </div>
            <div>
        <ol>
          <li> 2. Presione el botón de la izquierda, dentro de la columna <em>Acciones</em>. Aparecerá un código QR. &nbsp;</li>
          </ol>
          </div>
            <div>
        <ol>
            <li> 3. Indique al propietario escanear el código QR que aparece en pantalla usando la aplicación. En caso sean múltiples propietarios, cada uno debe
            escanearlo usando su teléfono &nbsp;</li>
          </ol>
          </div>
            <div>
        <ol>
          <li> 4. Haga click en cualquier parte de la pantalla afuera del código para volver al panel de lotes</li>
          </ol>
          </div>
        </div>
      <div>&nbsp;</div>
      <Popup open={!!QR} closeOnDocumentClick onClose={() => setQR(null)}>
        <QRCode value={QR} includeMargin={true} size={512} />
      </Popup>
      <LotesTable onShowQR={setQR} />
    </React.Fragment>
  );
}

export default withCookies(LoteScreen);
