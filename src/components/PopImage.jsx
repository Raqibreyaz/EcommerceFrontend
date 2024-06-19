import swal from 'sweetalert2'

export function PopImage(imageUrl, removeOption) {

    let obj = {
        imageUrl,
        imageHeight: 350,
        showCloseButton: true,
        showConfirmButton: removeOption,
    }

    if (removeOption) {
        obj.confirmButtonText = 'Remove'
        obj.confirmButtonColor = 'red'
    }

    return swal.fire(obj)
}

