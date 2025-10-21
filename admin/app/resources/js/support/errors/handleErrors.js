// import { Notify } from "quasar";

// export const handleErrors = (error) => {
//   if (error && error.response && error.response.data) {
//     let errorMessage = "";
//     let response = error.response.data;
//     // response.hasOwnProperty("status")
//     if (Object.prototype.hasOwnProperty.call(response, "status") && response.status === false) {
//       errorMessage = error.response.data.error.message;
//       // response.hasOwnProperty("errors")
//     } else if (Object.prototype.hasOwnProperty.call(response, "errors")) {
//       let errors = response.errors;
//       for (let field in errors) {
//         errorMessage += `${errors[field][0]}<br/>`;
//       }
//     } else {
      
//       if (typeof response === 'string') {
//         errorMessage = response;
//       } else if (response.message) {
//         errorMessage = response.message;
//       } else {
//         errorMessage = JSON.stringify(response);
//       }
//     }
//     notify(errorMessage);
//   } else {
//     notify("Ha ocurrido un error inesperado, intente mas tarde");
//   }
// };

// export const notify = (message) => {
//   Notify.create({
//     message: message,
//     icon: "warning",
//     color: "red-5",
//     textColor: "white",
//     position: "top-right",
//     html: true,
//   });
// };

// export const customMessageByType = (error) => {
//   const messages = {
//     401: "¡Usuario no autorizado! Verifique su nombre de usuario y contraseña.",
//     403: "¡Acceso denegado! ¡Este usuario no tiene permiso para acceder a este recurso!",
//     404: "¡Recurso no encontrado!",
//     422: "¡Validación fallida!",
//     500: "¡Ocurrió un error inesperado, inténtalo de nuevo más tarde!",
//   };

//   return messages[error.response.status];
// };