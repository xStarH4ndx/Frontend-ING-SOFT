import { gql } from '@apollo/client';

// Definición de mutations
export const CREAR_USUARIO = gql`
  mutation crearUsuario($createUsuarioInput: CreateUsuarioInput!) {
    crearUsuario(createUsuarioInput: $createUsuarioInput) {
      id
      username
      lastname
      rut
      profesion
      correo
      estado
    }
  }
`;

export const UPDATE_USUARIO = gql`
  mutation updateUsuario($updateUsuarioInput: UpdateUsuarioInput!) {
    updateUsuario(updateUsuarioInput: $updateUsuarioInput) {
      id
      username
      lastname
      rut
      profesion
      correo
      estado
    }
  }
`;
