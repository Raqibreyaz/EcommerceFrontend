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





// import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
// import { useState, forwardRef, act } from 'react'

// const DialogBox = forwardRef(
//     function DialogBox(props, ref) {

//         let [isOpen, setIsOpen] = useState(true)

//         console.log(props);

//         let { head, message = '', action, confirmResponse } = props

//         head = head ? head : 'Are You Sure?'
//         action = action ? action : 'logout'


//         function open(e) {
//             setIsOpen(true)
//         }

//         function close(e) {
//             setIsOpen(false)
//             confirmResponse(e.target.childNodes[0].data)
//         }

//         return (

//             <Transition appear show={isOpen}>
//                 <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
//                     <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                         <div className="flex min-h-full items-center justify-center p-4">
//                             <TransitionChild
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 transform-[scale(95%)]"
//                                 enterTo="opacity-100 transform-[scale(100%)]"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 transform-[scale(100%)]"
//                                 leaveTo="opacity-0 transform-[scale(95%)]"
//                             >
//                                 <DialogPanel className="w-full max-w-md rounded-xl bg-zinc-800 p-6 backdrop-blur-2xl">
//                                     <DialogTitle as="h3" className="text-base/7 font-medium text-white">
//                                         {head}
//                                     </DialogTitle>
//                                     <p className="mt-2 text-sm/6 text-white/50">
//                                         {message}
//                                         {/* Your payment has been successfully submitted. We’ve sent you an email with all of the details of
//                                     your order. */}
//                                     </p>
//                                     <div className="mt-4 space-x-3">
//                                         <Button
//                                             className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
//                                             onClick={(e) => close(e)}
//                                         >
//                                             cancel
//                                         </Button>

//                                         <Button
//                                             className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
//                                             ref={ref}
//                                             onClick={
//                                                 (e) => close(e)
//                                             }
//                                         >
//                                             {action}
//                                         </Button>
//                                     </div>
//                                 </DialogPanel>
//                             </TransitionChild>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition>
//         )
//     }
// )



// export default DialogBox