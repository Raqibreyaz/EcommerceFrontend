import swal from 'sweetalert2'

export function PopImage(imageUrl) {
    return swal.fire({
        imageUrl,
        imageHeight:350,
        showCloseButton:false
    });
}

