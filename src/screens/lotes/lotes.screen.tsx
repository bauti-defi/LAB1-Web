import React, { useEffect, useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { getAll } from "../../requests/lotes.requests";
import { Action } from "../../storage/dispatch.actions";
import LotesTable from "./lotes.table";

var QRCode = require("qrcode.react");

function LotesScreen() {
  const [cookie] = useCookies();
  const [QR, setQR] = useState(null);
  const dispatch = useDispatch();

  console.log("lotes");
  useEffect(() => {
    async function fetch() {
      return await getAll(cookie.session.token)
        .then((response) => {
          dispatch({ type: Action.SAVE_LOTES, relations: response.data });
        })
        .catch((error) => console.error(error));
    }
    fetch();
  }, []);

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Popup open={!!QR} closeOnDocumentClick onClose={() => setQR(null)}>
        <QRCode value={QR} includeMargin={true} size={512} />
      </Popup>
      <LotesTable onShowQR={setQR} />
    </React.Fragment>
  );
}

export default withCookies(LotesScreen);
