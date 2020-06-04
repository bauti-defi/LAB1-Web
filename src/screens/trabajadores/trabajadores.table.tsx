import MaterialTable from "material-table";
import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Lote, useLoteSelector } from "../../storage/lotes.reducer";
import { ThemeProvider, createMuiTheme, Typography } from "@material-ui/core";
import { registerTrabajador, TrabajadorRegistrationDTO } from '../../requests/trabajadores.requests'

function TrabajadoresTable(props) {
  const [cookie] = useCookies();
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {/* <ThemeProvider theme={theme}> */}
      {/* <MaterialTable
        options={{
          headerStyle: {
            backgroundColor: 	"#CBD1D4",
            color: "#414B56",
            fontSize: "14px"
          },
        }}
        title="Lista de Trabajadores"
        columns={columns}
        detailPanel={[]}
      />
      </ThemeProvider> */}
    </React.Fragment>
  );
}

const columns = [
  { title: "Apellido", field: "surname" },
  { title: "Nombre", field: "name" },
  { title: "Ocupación", field: "occupation" },
];


const theme = createMuiTheme({
  typography: {
      fontSize: 18,
  }
});
export default withCookies(TrabajadoresTable);
