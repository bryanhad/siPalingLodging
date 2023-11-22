import { POSITION, useToast } from "vue-toastification"

function useToast_ErrorAxios(err, customMessage) {
    let errorMessage
    if (customMessage) {
        errorMessage = customMessage
    } else {
        if (Array.isArray(err.response.data)) {
            if (err.response.data[0].message) {
                errorMessage = err.response.data[0].message
            } else {
                errorMessage = err.response.data[0]
            }
        } else {
            if (err.response.data.message) {
                errorMessage = err.response.data.message
            } else {
                errorMessage = err.response.statusText
            }
        }
    }
    useToast().error(errorMessage)
}

function useToast_SuccessAxios(message) {
    useToast().success(message, { position: POSITION.TOP_CENTER })
}

export { useToast_ErrorAxios, useToast_SuccessAxios }
