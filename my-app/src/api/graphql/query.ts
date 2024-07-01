import { gql } from '@apollo/client';

// Definición de queries
export const LISTAR_USUARIOS = gql`
  query {
    listarTodosLosUsuarios {
      id
      username
      lastname
      rut
      profesion
      estado
    }
  }
`;

export const BUSCAR_USUARIO_POR_ID = gql`
  query buscarUsuarioPorId($id: Int!) {
    buscarUsuarioPorId(id: $id) {
      id
      username
      lastname
      rut
      profesion
      correo
      estado
    }
  }
`

;

// ... (Definir las demás queries y mutations que necesites)
