import React, { useState } from 'react';
import { Container, Paper, Box, Typography, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { LISTAR_USUARIOS } from '../../api/graphql/query';
import { PAGADO } from '../../api/graphql/mutation';

interface Usuario {
  id: number;
  username: string;
  lastname: string;
  rut: string;
  profesion: string;
  estado: string;
}

interface ListaUsuariosData {
  listarTodosLosUsuarios: Usuario[];
}

const ProfileAdmin: React.FC = () => {
  const { loading, error, data } = useQuery<ListaUsuariosData>(LISTAR_USUARIOS);
  const [updatePago] = useMutation(PAGADO);

  const [selectedUsuarios, setSelectedUsuarios] = useState<{ [rut: string]: boolean }>({});
  const [listaClientes, setListaClientes] = useState<Usuario[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Usuario | null>(null);
  const [searchTermUsuarios, setSearchTermUsuarios] = useState<string>('');
  const [searchRutUsuarios, setSearchRutUsuarios] = useState<string>('');
  const [searchTermClientes, setSearchTermClientes] = useState<string>('');
  const [searchRutClientes, setSearchRutClientes] = useState<string>('');

  if (loading) return <p>Cargando...</p>;
  if (error) {
    console.error(error); // Añade esto para imprimir el error en la consola
    return <p>Error al cargar los usuarios: {error.message}</p>;
  }

  const listaUsuarios: Usuario[] = data?.listarTodosLosUsuarios || [];

  const handleInscribir = async () => {
    const usuariosAInscribir = Object.keys(selectedUsuarios)
      .filter((key) => selectedUsuarios[key])
      .map((key) => listaUsuarios.find((usuario) => usuario.rut === key))
      .filter((usuario): usuario is Usuario => !!usuario);
  
    const usuariosYaInscritos = usuariosAInscribir.filter((usuario) =>
      listaClientes.some((cliente) => cliente.rut === usuario.rut)
    );
  
    if (usuariosYaInscritos.length > 0) {
      const nombresUsuariosYaInscritos = usuariosYaInscritos.map(
        (usuario) => `${usuario.username} ${usuario.lastname}`
      ).join(', ');
      alert(`Usuario(s) ${nombresUsuariosYaInscritos} ya registrado(s), por favor, quite la selección.`);
      return;
    }
  
    const newClientes = usuariosAInscribir.filter(
      (usuario) => !listaClientes.some((cliente) => cliente.rut === usuario.rut)
    );
  
    try {
      await Promise.all(newClientes.map(usuario => 
        updatePago({ variables: { rut: usuario.rut, estado: 'pagado' } })
      ));
      setListaClientes((prevClientes) => [...prevClientes, ...newClientes]);
      setSelectedUsuarios({});
    } catch (error) {
      console.error("Error updating payment status: ", error);
    }
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
  
  // Filtrar usuarios no inscritos con estado noPagado
  const filteredUsuarios = getNonInscritos().filter(
    (usuario) =>
      usuario.estado === 'noPagado' &&
      (usuario.username.toLowerCase().includes(searchTermUsuarios.toLowerCase()) ||
        usuario.lastname.toLowerCase().includes(searchTermUsuarios.toLowerCase())) &&
      usuario.rut.includes(searchRutUsuarios)
  );

  // Filtrar clientes inscritos con estado pagado
  const filteredClientes = listaClientes.filter(
    (cliente) =>
      cliente.estado === 'pagado' &&
      (cliente.username.toLowerCase().includes(searchTermClientes.toLowerCase()) ||
        cliente.lastname.toLowerCase().includes(searchTermClientes.toLowerCase())) &&
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
                  {usuario.username} {usuario.lastname}
                </Typography>
                <Typography variant="body2">RUT: {usuario.rut}</Typography>
                <Typography variant="body2">Profesión: {usuario.profesion}</Typography>
                <Typography variant="body2">Estado: {usuario.estado}</Typography>
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
                  {cliente.username} {cliente.lastname}
                </Typography>
                <Typography variant="body2">RUT: {cliente.rut}</Typography>
                <Typography variant="body2">Profesión: {cliente.profesion}</Typography>
                <Typography variant="body2">Estado: {cliente.estado}</Typography>
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
