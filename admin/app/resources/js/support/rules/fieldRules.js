/* eslint-disable */

const rules = {
  required: (val) => !!val || `Este campo es requerido`,
  minLength: (length) => (val) =>
    !val ||
    val.length >= Number(length) ||
    `Este campo debe tener un mínimo de ${length} caracteres!`,
  maxLength: (length) => (val) =>
    !val ||
    val.length <= Number(length) ||
    `Este campo debe tener un máximo de ${length} caracteres!`,
  email: (val) =>
    !val ||
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
    'Este campo debe ser un e-mail válido!',
  phone: (val) =>
    !val ||
    /^\+56\d{9}$/.test(val) ||
    'El formato del teléfono no es válido. Debe ser +56XXXXXXXXX.',
  number: (val) =>
    !val ||
    /^-?\d+$/.test(val) ||
    'Este campo debe ser un número número entero (positivo o negativo)!',
  letters: (val) =>
    !val || /^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ ]+$/.test(val) || 'El campo solo puede contener letras'
};

export default rules;