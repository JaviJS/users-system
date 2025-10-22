import { notifyError } from "../../support/helpers/notification.js"

export const handleErrors = (error) => {
  if (error && error.response && error.response.data) {
    let errorMessage = "";
    let response = error.response.data;
    if (response.hasOwnProperty("status") && response.status === false) {
      errorMessage = error.response.data.error.message;
    } else if (response.hasOwnProperty("errors")) {
      let errors = response.errors;
      for (let field in errors) {
        errorMessage += `${errors[field][0]}\n`;
      }
    } else {
      
      if (typeof response === 'string') {
        errorMessage = response;
      } else if (response.message) {
        errorMessage = response.message;
      } else {
        errorMessage = JSON.stringify(response);
      }
    }
    notifyError(errorMessage);
  } else {
    notifyError("Ha ocurrido un error inesperado, intente mas tarde");
  }
};