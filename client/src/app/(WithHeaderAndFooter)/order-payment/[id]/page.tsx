"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import OrderCompe from "@/assets/images/Cart/complete.gif";
import styles from "@/app/(WithHeaderAndFooter)/order-payment/[id]/order.module.scss"
import recycle from '@/assets/images/recycle.png';
import pro1 from '@/assets/images/pro1.webp'; 
import { signOut, useSession } from "next-auth/react";
import { Button, Modal } from 'react-bootstrap';
import Script from 'next/script';
import { phonepePaymentStatusCheck } from '@/service/order.service';
import { toastError } from '@/utils/toastMessage.ts';

function Page({ params }: { params: { id: string } }) {

  const pathname = usePathname();
  const [orderid, setOrderid] = useState<any>('');
  const [orderdata, setOrderdata] = useState<any>('');
const { data: session } = useSession();
  
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
   
    const [orderStatus, setOrderStatus] = useState(0);
    useEffect(() => {
        if (params && params.id) {
            setOrderid(params.id)
            handlePhonePaymentCallback(params.id);
        }
    }, [params])


    const handlePhonePaymentCallback   = async (id:string) => {
        try {
          let {data:res} = await phonepePaymentStatusCheck(id);
          if(res.data){
             await setOrderStatus(1)
            return 0
          }  else {
            setOrderStatus(2);
                return 0
            
          }
        } catch (error) {
          toastError(error)
          setOrderStatus(2);
       
        }
      }
    //   const getOrders = async (id:string) => {
    //     try {
    //        const { data: res } = await getOrderByIdApi(id);
    //        if (res) {
    //           console.log(res.data);
    //           setOrderdata(res.data);
    //           let id =  res.data.orderId ? getOrderIdSequence(res.data.orderId) : res.data?._id;
    //           setOrderStatus(1);
            
    //           console.log(id,"orderData?.shippingCharges orderData?.shippingCharges orderData?.shippingCharges ")
    //           setOrderid(id)
    //        }
    //     } catch (error: any) {
    //        console.log(error);
    //     }
    //  };
    
      
   

  
    return (

        <>
 
        <div className={styles.order_complete}>
            <div className="container">

           { orderStatus  == 1 && (    <>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                        <h3 className={styles.heading}>Your Booking has been received</h3>
                        <p className={styles.para}>Thank you for your Booking!</p>
                        <p className=" my-5">
                            Your Booking ID is&nbsp;:&nbsp;
                            <span className="green fw-semibold">{orderid}</span>
                          </p>
                    </div>
                </div>

               
          
       </>
           )}

      {  orderStatus  == 2 && (
                  <>
                  <h3>Payment Failed: Technical Issue Encountered during Booking Process</h3>
                  {/* <img src={images.party} alt="" className="mt-4 mb-5" /> */}
                  <h5>Please Contact Admin for Booking Problem</h5>
                  <p className=" my-5">
                    Your Order ID is&nbsp;:&nbsp;
                    <span className="green fw-semibold">{orderid}</span>
                  </p>
            
                  
                </>)}

                      
              {  orderStatus  == 0 && (
                  <h3>Please Wait</h3>
                )
                }
             </div>
        </div>

      
        
              </>

    );
}

export default Page;