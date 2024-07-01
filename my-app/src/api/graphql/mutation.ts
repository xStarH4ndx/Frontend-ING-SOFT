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


export const REGISTER = gql`
  mutation register($username: String!, $lastname: String!, $rut: String!, $profesion: String!, $email: String!,$password: String!){
    register(username: $username, lastname: $lastname, rut: $rut, profesion: $profesion, email: $email, password: $password){
      message
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


export const FORGOT_PASS =  gql`
  mutation forgotPass($email:String!){
    forgotPass(email:$email){
      message
    }
  }
`;

export const LOGIN_MUTATION = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password){
    token
  }
}`;

export const IS_ADMIN_QUERY = gql`
  query {
    isAdmin
  }
`;

export const PAGADO = gql`
  mutation Pagado($rut: String!, $estado: String!) {
    pagado(rut: $rut, estado: $estado) {
      message
    }
  }
`;