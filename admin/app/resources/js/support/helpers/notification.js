import { useToast } from "vue-toastification"

const toast = useToast();

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    timeout: 2500,
    closeOnClick: true,
    pauseOnHover: true,
  })
}

export const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
  })
}
