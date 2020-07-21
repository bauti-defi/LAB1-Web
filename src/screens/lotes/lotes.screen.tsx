import React, { useEffect, useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { getAll } from "../../requests/lotes.requests";
import { Action } from "../../storage/dispatch.actions";
import { useLoteSelector } from "../../storage/lotes.reducer";
import LotesTable from "./lotes.table";

var QRCode = require("qrcode.react");

function LoteScreen() {
  const [cookie] = useCookies();
  const [QR, setQR] = useState(null);
  const loading: boolean = useLoteSelector((state) => state?.loading || true);
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
      <Popup open={!!QR} closeOnDocumentClick onClose={() => setQR(null)}>
        <QRCode value={QR} includeMargin={true} size={512} />
      </Popup>
      <LotesTable onShowQR={setQR} />
    </React.Fragment>
  );
}

export default withCookies(LoteScreen);
