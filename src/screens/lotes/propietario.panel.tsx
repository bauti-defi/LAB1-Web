import React from "react";
import { Lote, Propietario } from "../../storage/lotes.reducer";

function PropietariosPanel(rowData: Lote) {
  return (
    <div>
      <h2>Propietarios</h2>
      {rowData.propietarios.map(propietarioLabel)}
    </div>
  );
}

function propietarioLabel(propietario: Propietario) {
  return (
    <div key={propietario.id}>
      <h5>
        Nombre: {propietario.last_name}, {propietario.first_name}
      </h5>
      <h5>DNI: {propietario.doc_id}</h5>
    </div>
  );
}

export default PropietariosPanel;
