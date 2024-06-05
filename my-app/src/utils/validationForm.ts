import * as yup from 'yup'

export const LoginValidate = yup.object().shape({
    correo: yup.string().email("Correo Inválido").required("El correo es requerido"),
    password: yup.string().required("La contraseña es requerida"),
});