import React, { useState } from "react";
import { withCookies, useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import MaterialTable from "material-table";
import { AddBox, ArrowDownward} from '@material-ui/icons';
const axios = require("axios").default;

function Table() {
  return (
    <MaterialTable
      title="Lista de Lotes"
      columns={[{ title: "Nombre/Número", field: "name" }]}
      data={[{ name: "316", members: ["Diego", "Camila"] }]}
      detailPanel={(rowData) => {
        return (
          <div>
            {rowData.members.map((string) => (
              <h5>{string}</h5>
            ))}
          </div>
        );
      }}
    />
  );
}

export default Table;
