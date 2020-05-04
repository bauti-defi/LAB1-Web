import MaterialTable from "material-table";
import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Lote, useLoteSelector } from "../../storage/lotes.reducer";
import { ThemeProvider, createMuiTheme, Typography } from "@material-ui/core";

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
      <ThemeProvider theme={theme}>
      <MaterialTable
        options={{
          headerStyle: {
            backgroundColor: 	"#CBD1D4",
            color: "#414B56",
            fontSize: "14px"
          },
        }}
        title="Lista de Trabajadores"
        isLoading={loading}
        columns={columns}
        data={lotes}
        detailPanel={[]}
      />
      </ThemeProvider>
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
