import toast, { Toaster } from 'react-hot-toast'

export const toastError = (error:any) => {
    // console.log(error)
    // console.log(typeof error?.response?.data?.message)
    if (typeof error?.response?.data?.message == 'string') toast.error(error?.response?.data?.message)
    // alert(error?.response?.data?.message)
    else if (typeof error?.message == 'string') toast.error(error.message)
    // alert(error.message)
    else if (typeof error == 'string') toast.error(error)
    // alert(error)
    // alert("ERROR")
    else toast.error('ERROR')
}


export const errorMSg = (error:any) => {
    // console.log(error)
    // console.log(typeof error?.response?.data?.message)
    if (typeof error?.response?.data?.message == 'string') return (error?.response?.data?.message)
    // alert(error?.response?.data?.message)
    else if (typeof error?.message == 'string') return (error.message)
    // alert(error.message)
    else if (typeof error == 'string') return (error)
    // alert(error)
    // alert("ERROR")
    else return ('ERROR')
}
export const toastSuccess = (message:string) => {
    toast.success(message)
    // alert(message)
}
