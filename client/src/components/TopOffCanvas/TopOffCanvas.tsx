"use client"
import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import SearchInput from '../SearchInput/SearchInput';
import styles from './styles.module.scss'



export default function TopOffCanvas({handleClosetop,showtop}:any) {

 
  return (
   <>
   
   <Offcanvas show={showtop} onHide={handleClosetop} placement='top'
    backdropClassName="top_backdrop" 
    className={`${styles.top_offcanvas} top_offcanvas`}>
        <Offcanvas.Header className={styles.top_header} closeButton >
          
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.top_body}>
            
         <SearchInput handleClosetop={handleClosetop}/>
        </Offcanvas.Body>
      </Offcanvas>
   
   </>
  )
}
