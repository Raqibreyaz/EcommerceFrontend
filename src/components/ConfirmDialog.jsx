import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const showConfirmation = async (title, text, confirmText = 'confirm', cancelText = 'cancel', icon = 'warning') => {
    return swal.fire({
        title,
        text,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        confirmButtonColor: 'red',
        icon
    })
}
