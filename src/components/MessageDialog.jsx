import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const SuccessMessage = async (title) => {
    return swal.fire({
        position: "top",
        icon: "success",
        text:title,
        showConfirmButton: false,
        timer: 3000
    })
}

export const FailedMessage = async (title) => {

    return swal.fire({
        position: "top",
        icon: "error",
        text:title,
        showConfirmButton: false,
        timer:3000
    });
}




// import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'

// function DialogBox({ head = '', message = '', buttonMessage = 'close', className = 'bg-red-500' }) {
//     let [isOpen, setIsOpen] = useState(true)

//     function open() {
//         setIsOpen(true)
//     }

//     function close() {
//         setIsOpen(false)
//     }

//     return (

//         <Transition appear show={isOpen}>
//             <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
//                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                     <div className="flex min-h-full items-center justify-center p-4">
//                         <TransitionChild
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 transform-[scale(95%)]"
//                             enterTo="opacity-100 transform-[scale(100%)]"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 transform-[scale(100%)]"
//                             leaveTo="opacity-0 transform-[scale(95%)]"
//                         >
//                             <DialogPanel className="w-full max-w-md rounded-xl bg-zinc-800 p-6 backdrop-blur-2xl">
//                                 <DialogTitle as="h3" className="text-base/7 font-medium text-white">
//                                     {head}
//                                 </DialogTitle>
//                                 <p className="mt-2 text-sm/6 text-white/50">
//                                     {message}
//                                     {/* Your payment has been successfully submitted. We’ve sent you an email with all of the details of
//                                     your order. */}
//                                 </p>
//                                 <div className="mt-4">
//                                     <Button
//                                         className={`inline-flex items-center gap-2 rounded-md ${className} py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white`}
//                                         onClick={close}
//                                     >
//                                         {buttonMessage}
//                                     </Button>
//                                 </div>
//                             </DialogPanel>
//                         </TransitionChild>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition>
//     )
// }

// export default DialogBox