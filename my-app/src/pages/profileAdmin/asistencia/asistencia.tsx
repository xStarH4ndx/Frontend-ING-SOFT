import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
// Asegúrate de importar correctamente tu query si se solucionó el error de módulo
// import { LISTAR_USUARIOS } from "../graphql/queries";

const AsistenciaPage: React.FC<{}> = () => {
  // Mock de datos para propósitos de ejemplo
  const initialRows = [
    { id: 1, username: "user1", lastname: "Lastname 1", rut: "12345678-9", profesion: "Teacher", estado: true },
    { id: 2, username: "user2", lastname: "Lastname 2", rut: "98765432-1", profesion: "Engineer", estado: false },
  ];
  const [usuarios, setUsuarios] = useState<any[]>(initialRows);

  // Simulación de uso de la consulta
  // const { loading, error, data } = useQuery(LISTAR_USUARIOS);

  useEffect(() => {
    // if (!loading && data) {
    //   setUsuarios(data.listarTodosLosUsuarios);
    // }
  }, []); // Agrega las dependencias necesarias aquí

  const handleAsistenciaChange = (params: GridCellParams) => {
    const { id, field, value } = params;
    // Implementa la lógica para actualizar el estado de asistencia del usuario con el ID proporcionado
    console.log(`Actualizar asistencia para el usuario con ID ${id} en el campo ${field} a ${value}`);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "rut", headerName: "RUT", width: 150 },
    { field: "profesion", headerName: "Profession", width: 150 },
    {
      field: "estado",
      headerName: "Attendance",
      width: 150,
      editable: true,
      renderCell: (params: GridCellParams) => (
        <Typography variant="body1" color={params.value ? "primary" : "error"}>
          {params.value ? "Present" : "Absent"}
        </Typography>
      ),
      cellClassName: "editable-cell",
      // Implementa la lógica de edición de celdas aquí si `editCellProps` no está disponible
      // onCellEditCommit: (params) => handleAsistenciaChange(params),
      // onCellClick: (params) => handleAsistenciaChange(params),
    },
  ];

  // Simulación de loading y error
  const loading = false;
  const error: any = null; // Asegúrate de manejar correctamente el tipo de `error` aquí

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // Asegúrate de que `error` tenga la propiedad `message`

  return (
    <Container maxWidth="md">
      {/* Círculos de fondo */}
      <div style={{
        position: "absolute",
        top: "-350px",
        right: "-350px",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        backgroundColor: "#fd5f30",
        zIndex: -1
      }}></div>
      <div style={{
        position: "absolute",
        bottom: "-350px",
        left: "-350px",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        backgroundColor: "#4273f3",
        zIndex: -1
      }}></div>

      {/* Contenido principal */}
      <Typography variant="h5" gutterBottom sx={{ mt: 10 }}>
        Attendance List
      </Typography>
      {/* Elevando la tabla dentro de un Paper */}
      <Paper elevation={3} style={{ height: 500, width: "100%" }}>
        <DataGrid rows={usuarios} columns={columns} />
      </Paper>
    </Container>
  );
};

export default AsistenciaPage;
