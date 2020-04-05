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
      data={[{ name: "Diego", members: ["aa", "bb"] }]}
      detailPanel={(rowData) => {
        return (
          <div>
            {rowData.members.map((string) => (
              <h3>{string}</h3>
            ))}
          </div>
        );
      }}
    />
  );
}

export default Table;
