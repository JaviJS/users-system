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

export const handleErrorsGraph = (error) => {
  let errorMessage = "";

  if (
    error &&
    error.errors &&
    Array.isArray(error.errors)
  ) {
    error.errors.forEach(err => {
      if (err.extensions && err.extensions.validation) {
        Object.values(err.extensions.validation).forEach(messages => {
          errorMessage += messages.join("\n") + "\n";
        });
      }
    });

    notifyError(errorMessage.trim());
  } else {
    notifyError("Ha ocurrido un error inesperado, intente más tarde");
  }
};



