

export const getLocalSearch = () => {
    let localCart:any = localStorage.getItem("local-search1"); 
    let  cart = JSON.parse(localCart);
    return cart; 
}

export const removeLocalSearch = () => {
    let localCart = localStorage.removeItem("local-search1"); 
    return true; 
}

export const addLocalSearch = (cartCopy:any) => {
    let stringCart:any = JSON.stringify(cartCopy);
    localStorage.setItem("local-search1", stringCart)

    setTimeout(()=>{
        localStorage.removeItem("local-search1")
    }, 1000 * 60*60)
    return true; 
}

export const getLocalQuery = () => {
    let localCart = localStorage.getItem("local-search-query1"); 
    return localCart; 
}

export const addLocalQuery = (cartCopy:any) => {
    localStorage.setItem("local-search-query1", cartCopy)
    setTimeout(()=>{
        localStorage.removeItem("local-search-query1")
    }, 1000 * 60*60)
    return true; 
}