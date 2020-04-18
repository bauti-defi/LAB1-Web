import React from "react";
import { Lote } from "../../storage/lotes.reducer";

function PropietariosPanel(rowData: Lote) {
  return (
    <div>
      <h2>Propietarios: {rowData.propietarios?.length}</h2>
    </div>
  );
}

export default PropietariosPanel;
