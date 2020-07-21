import React, { useEffect, useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import {
  getAllGuardias,
  getAssociationQR,
} from "../../requests/guardias.requests";
import { useGuardiaSelector } from "../../storage/app.selectors";
import { Action } from "../../storage/dispatch.actions";
import "../guardias/guardias.screen.css";
import GuardiasTable from "../guardias/guardias.table";
var QRCode = require("qrcode.react");

const GuardiaScreen = () => {
  const [cookie] = useCookies();
  const [QR, setQR] = useState(null);
  const dispatch = useDispatch();
  const loading: boolean = useGuardiaSelector((state) => state?.loading);

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

  useEffect(() => {
    if (loading) {
      getAllGuardias(cookie.session.token)
        .then((response) => {
          dispatch({
            type: Action.SAVE_GUARDIAS,
            guardias: response.data || [],
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({ type: Action.LOADING_GUARDIAS, loading: false });
        });
    }
  }, []);

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
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
              Para asociar un guardia, dele click al botón que se encuentra
              abajo. Se abrirá un código QR, el cual debe ser escaneado por el
              guardia. Una vez escaneado, haga click en cualquier parte para
              volver a este menú.
            </div>

            <div id="outPopUp">
              <button
                type="button"
                className="button"
                onClick={handleAssociation}
              >
                Asociar Guardia
              </button>
              <Popup
                open={!!QR}
                closeOnDocumentClick
                onClose={() => setQR(null)}
              >
                <QRCode value={QR} includeMargin={true} size={512} />
              </Popup>
            </div>
          </div>
        )}
      </Popup>
      <GuardiasTable />
    </React.Fragment>
  );
};

export default withCookies(GuardiaScreen);
