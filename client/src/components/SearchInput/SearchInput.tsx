import React from 'react'
import style from '@/components/SearchInput/SearchInput.module.scss'
import StayFormInput from '@/components/StayFormInput/StayFormInput'



export default function SearchInput({handleClosetop,showtop,SetToggleOffcanvas}:any) {

    return (
        <>



            <div className={style.form_input} >
                <StayFormInput  handleClosetop={handleClosetop} SetToggleOffcanvas={SetToggleOffcanvas} />
            </div>

        </>
    )
}
