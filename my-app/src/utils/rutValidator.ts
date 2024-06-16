export function validarRUT(rutCompleto: string): boolean {
    if (!rutCompleto || typeof rutCompleto !== 'string') return false;

    // Limpiar el RUT dejando solo números y el dígito verificador
    const rutLimpio = rutCompleto.replace(/[^0-9kK]+/g, '');

    // Verificar el mínimo de longitud aceptable (7 dígitos + DV)
    if (rutLimpio.length < 8) return false;

    // Extraer cuerpo y dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    let dv = rutLimpio.slice(-1).toUpperCase();

    // Calcular dígito verificador
    let suma = 0;
    let multiplo = 2;

    // Recorrer los dígitos del cuerpo de derecha a izquierda
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * +cuerpo[i];
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    // Calcular dígito verificador en base al módulo 11
    const dvEsperado = 11 - (suma % 11);

    // Casos especiales para dígitos verificadores
    if (dvEsperado === 11) dv = '0';
    if (dvEsperado === 10) dv = 'K';

    // Verificar si el dígito verificador calculado coincide con el dígito verificador del RUT
    return dv === dvEsperado.toString();
}

// Ejemplos de uso
console.log(validarRUT('12.345.678-5')); // Supuesto RUT inválido
console.log(validarRUT('12.345.678-9')); // Supuesto RUT válido
