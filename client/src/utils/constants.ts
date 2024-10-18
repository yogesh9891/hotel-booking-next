export const customStyles = {
    control: (base: any) => ({
        ...base,
        border: '1px solid #526b67 !important',
        boxShadow: '0 !important',
        color:"#737373",
        padding:'8px',
        zindex:'9',
        minHeight:'60px',
        '&:hover': {
            border: '2px solid #526b67 !important',
           
        },

        menu: (provided:any) => ({
            ...provided,
            zIndex: 9999, // Increase the z-index here
          }),

          menuPortal: (provided:any) => ({ ...provided, zIndex: 5 }),
      
        
    }),
    option: (base:any) => ({
        ...base,
        cursor: "pointer",
        background: "white",
        color:"#526b67d1",
        zindex:'9',   // this was the mistake (I needed to remove this)
        "&:hover": {
           backgroundColor: "#526b67d1",
           color:"#fff",
         },
})

}




export const getRateNameFromRateId = (rate: string) => {
    
    let ratesArr:any = {
        "2" : "Room Only",
        "4" : "Breakfast",
        "5": "Breakfast and Lunch/Dinner",
        "6": "Breakfast, Lunch and Dinner",
    };
    return ratesArr[rate];
}