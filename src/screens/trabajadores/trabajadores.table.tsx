
import MaterialTable from "material-table";
import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import {
  createInvite,
  createLote,
  CreateLoteDTO,
  deleteLote,
} from "../../requests/lotes.requests";
import { Action } from "../../storage/dispatch.actions";
import { Lote, useLoteSelector } from "../../storage/lotes.reducer";

function TrabajadoresTable(props) {
  const [cookie] = useCookies();
  const lotes: Lote[] = useLoteSelector((state) => state.lote.lotes);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(!lotes);

  const actions = [
    {
      icon: "important_devices",
      tooltip: "Asociar Propietario",
    },
  ];

  return (
    <React.Fragment>
      <MaterialTable
      options={{
          headerStyle:{
              backgroundColor: '#414B56'
          },
          
      }}
        title="Lista de Trabajadores"
        isLoading={loading}
        columns={columns}
        data={lotes}
        detailPanel={[
        ]}
      />
    </React.Fragment>
  );
}

const columns = [
  { title: "Apellido", field: "surname" },
  { title: "Nombre", field: "name" },
  { title: "Ocupación", field: "occupation" },
];

export default withCookies(TrabajadoresTable);
