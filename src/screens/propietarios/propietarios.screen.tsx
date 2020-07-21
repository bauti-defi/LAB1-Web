
import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import Popup from "reactjs-popup";
import { getAll } from "../../requests/propietarios.requests";
import "../guardias/guardias.screen.css";
import PropietariosTable from "./propietarios.table";
var QRCode = require("qrcode.react");

function PropietarioScreen() {
  const [cookie] = useCookies();
  const [QR, setQR] = useState(null);

  const handleAssociation = (event) => {
    getAll(cookie.session.token)
      .then((response) => response.data)
      .then((data) => {
        data.path = "guardia/register";
        return data;
      })
      .then(JSON.stringify)
      .then(setQR);
  };

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      {/* <button type="button" onClick={handleAssociation}>
        Asociar Guardia
      </button> */}
      {/* <Popup
      trigger= {<button className="button">XD</button>}
        open={!!QR}
        closeOnDocumentClick
        position="right center"
        // onClose={() => setQR(null)}>
       > 
        <div>
          <a onClick={close}>&times</a>
       </div>
        <QRCode value={QR}   size={256} />
      </Popup> */}

  <Popup trigger={<button className="button"> Asociar Propietario</button>} modal>
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Modal Title </div>
        <div className="content">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            closeOnDocumentClick
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
      </Popup>
      <PropietariosTable />
    </React.Fragment>
  );

}

export default withCookies(PropietarioScreen);