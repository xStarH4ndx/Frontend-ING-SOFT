import React, { useState } from 'react';
import { Container, Paper, Box, Typography, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';

interface Usuario {
  nombre: string;
  apellido: string;
  rut: string;
  edad: number;
}

export const ProfileAdmin: React.FC<{}> = () => {
  const listaUsuarios: Usuario[] = [
    { nombre: 'Juan', apellido: 'Perez', rut: '12345678-9', edad: 30 },
    { nombre: 'Ana', apellido: 'Gomez', rut: '98765432-1', edad: 25 },
    { nombre: 'Luis', apellido: 'Martinez', rut: '11223344-5', edad: 35 }
  ];

  const [selectedUsuarios, setSelectedUsuarios] = useState<{ [rut: string]: boolean }>({});
  const [listaClientes, setListaClientes] = useState<Usuario[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Usuario | null>(null);
  const [searchTermUsuarios, setSearchTermUsuarios] = useState<string>('');
  const [searchRutUsuarios, setSearchRutUsuarios] = useState<string>('');
  const [searchTermClientes, setSearchTermClientes] = useState<string>('');
  const [searchRutClientes, setSearchRutClientes] = useState<string>('');

  const handleInscribir = () => {
    const usuariosAInscribir = Object.keys(selectedUsuarios)
      .filter((key) => selectedUsuarios[key])
      .map((key) => listaUsuarios.find((usuario) => usuario.rut === key))
      .filter((usuario): usuario is Usuario => !!usuario);

    const usuariosYaInscritos = usuariosAInscribir.filter((usuario) =>
      listaClientes.some((cliente) => cliente.rut === usuario.rut)
    );

    if (usuariosYaInscritos.length > 0) {
      const nombresUsuariosYaInscritos = usuariosYaInscritos.map(
        (usuario) => `${usuario.nombre} ${usuario.apellido}`
      ).join(', ');
      alert(`Usuario(s) ${nombresUsuariosYaInscritos} ya registrado(s), por favor, quite la selección.`);
      return;
    }

    const newClientes = usuariosAInscribir.filter(
      (usuario) => !listaClientes.some((cliente) => cliente.rut === usuario.rut)
    );

    setListaClientes((prevClientes) => [...prevClientes, ...newClientes]);
    setSelectedUsuarios({});
  };

  const handleEliminar = () => {
    if (selectedCliente) {
      setListaClientes(listaClientes.filter((cliente) => cliente !== selectedCliente));
      setSelectedCliente(null);
    }
  };

  const toggleUsuarioSelection = (usuario: Usuario) => {
    setSelectedUsuarios((prevSelected) => ({
      ...prevSelected,
      [usuario.rut]: !prevSelected[usuario.rut]
    }));
  };

  const handleClienteSelection = (cliente: Usuario) => {
    if (selectedCliente === cliente) {
      setSelectedCliente(null);
    } else {
      setSelectedCliente(cliente);
    }
  };

  const isClienteSelected = (cliente: Usuario) => {
    return selectedCliente === cliente;
  };

  const getNonInscritos = () => {
    return listaUsuarios.filter((usuario) => !listaClientes.some((cliente) => cliente.rut === usuario.rut));
  };
  
  const filteredUsuarios = getNonInscritos().filter(
    (usuario) =>
      (usuario.nombre.toLowerCase().includes(searchTermUsuarios.toLowerCase()) ||
        usuario.apellido.toLowerCase().includes(searchTermUsuarios.toLowerCase())) &&
      usuario.rut.includes(searchRutUsuarios)
  );
  

  const filteredClientes = listaClientes.filter(
    (cliente) =>
      (cliente.nombre.toLowerCase().includes(searchTermClientes.toLowerCase()) ||
        cliente.apellido.toLowerCase().includes(searchTermClientes.toLowerCase())) &&
      cliente.rut.includes(searchRutClientes)
  );

  const selectAllUsuarios = () => {
    const newSelectedUsuarios: { [rut: string]: boolean } = {};
    getNonInscritos().forEach((usuario) => {
      newSelectedUsuarios[usuario.rut] = true;
    });
    setSelectedUsuarios(newSelectedUsuarios);
  };
  

  // Actualizar disponibilidad del botón "Inscribir" en tiempo real
  const canInscribir = Object.values(selectedUsuarios).some((value) => value);

  
  return (
    <Container style={{ marginTop: '0px', height: '100vh', overflow: 'auto', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Paper de usuarios registrados */}
        <Paper style={{ marginTop: '40px', width: '45%', padding: '16px', maxHeight: '80vh', overflow: 'auto', position: 'relative', zIndex: 1 }}>
          <h3>Usuarios Registrados</h3>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            fullWidth
            value={searchTermUsuarios}
            onChange={(e) => setSearchTermUsuarios(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Buscar por RUT"
            variant="outlined"
            fullWidth
            value={searchRutUsuarios}
            onChange={(e) => setSearchRutUsuarios(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={selectAllUsuarios}
              style={{ marginBottom: '16px' }}
            >
              Seleccionar Todos
            </Button>
            {filteredUsuarios.map((usuario, index) => (
              <Paper
                key={index}
                style={{
                  margin: '8px 0',
                  padding: '8px',
                  backgroundColor: '#f0f0f0'
                }}
              >
                <Typography variant="h6">
                  {usuario.nombre} {usuario.apellido}
                </Typography>
                <Typography variant="body2">RUT: {usuario.rut}</Typography>
                <Typography variant="body2">Edad: {usuario.edad}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedUsuarios[usuario.rut] || false}
                      onChange={() => toggleUsuarioSelection(usuario)}
                      disabled={listaClientes.some((cliente) => cliente.rut === usuario.rut)}
                    />
                  }
                  label={listaClientes.some((cliente) => cliente.rut === usuario.rut) ? "Inscrito" : "Seleccionar"}
                />
              </Paper>
            ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleInscribir}
            disabled={!canInscribir}
            style={{ marginTop: '16px' }}
          >
            Inscribir
          </Button>
        </Paper>

        {/* Paper de usuarios inscritos */}
        <Paper style={{ marginTop: '40px', width: '45%', padding: '16px', maxHeight: '80vh', overflow: 'auto', position: 'relative', zIndex: 1 }}>
          <h3>Usuarios Inscritos</h3>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            fullWidth
            value={searchTermClientes}
            onChange={(e) => setSearchTermClientes(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Buscar por RUT"
            variant="outlined"
            fullWidth
            value={searchRutClientes}
            onChange={(e) => setSearchRutClientes(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <Box>
            {filteredClientes.map((cliente, index) => (
              <Paper
                key={index}
                style={{
                  margin: '8px 0',
                  padding: '8px',
                  backgroundColor: '#e0e0e0'
                }}
                onClick={() => handleClienteSelection(cliente)}
              >
                <Typography variant="h6">
                  {cliente.nombre} {cliente.apellido}
                </Typography>
                <Typography variant="body2">RUT: {cliente.rut}</Typography>
                <Typography variant="body2">Edad: {cliente.edad}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isClienteSelected(cliente)}
                      onChange={() => handleClienteSelection(cliente)}
                    />
                  }
                  label="Seleccionar"
                />
              </Paper>
            ))}
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEliminar}
            disabled={!selectedCliente}
            style={{ marginTop: '16px', marginRight: '8px' }}
          >
            Eliminar
          </Button>
        </Paper>
      </div>
    </Container>
  );
};

export default ProfileAdmin;
