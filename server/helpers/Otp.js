import axios from "axios";
import { CONFIG } from "./Config";
export const sendOtp = async (mobile,otp) => {

   try {
        if(mobile){
          
             let config = {
               method: "get",
               maxBodyLength: Infinity,
               url: `https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=z2kjIput60ijYj5x0ZzsuA&senderid=WSSTAY&channel=2&DCS=0&flashsms=0&number=${mobile}&text=Your OTP for Login/Registration for Wabi Sabi Stays is ${otp}. Please use this code to complete your verification. This OTP is valid for 5 minutes. -NVS HOSPITALITY PVT. LTD&route=1&EntityId=1201171990482676805&dlttemplateid=1207172536423666854`,
               headers: {},
             };

          
             let {data:res}  =  await  axios.request(config);
                console.log("sendOtp",res)
             if (res["ErrorCode"] && res["ErrorCode"]== "000") {
               return { status: true, message: "OTP Send Successfully" };
             }  
             return {status:false,message:'Please Try Again'}
        }


   } catch (error) {
        console.log(error);
    return {status:false,message:error}
   }
};

export const sendBooking = async (mobile, name,hotelName,date) => {
  try {
    if (mobile) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=z2kjIput60ijYj5x0ZzsuA&senderid=WSSTAY&channel=2&DCS=0&flashsms=0&number=${mobile}&text=Dear ${name}, Thank you for choosing Wabi Sabi Stays! Your booking for ${hotelName} is confirmed from ${date}. Your booking details are shared with you on the registered E-mail address. -NVS HOSPITALITY PVT. LTD&route=1&EntityId=1201171990482676805&dlttemplateid=1207172562424551255`,
        headers: {},
      };

      let { data: res } = await axios.request(config);
      console.log("sendOtp", res);
      if (res["ErrorCode"] && res["ErrorCode"] == "000") {
        return { status: true, message: "Message Send Successfully" };
      }
      return { status: false, message: "Please Try Again" };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: error };
  }
};


export const verifyOtp = async (mobile,otp) => {
    try {
        if(mobile && otp){
        //testotp
        // let config = {
        //     method: 'get',
        //     maxBodyLength: Infinity,
        //     url: `https://control.msg91.com/api/v5/otp/verify?mobile=91${mobile}&otp=${otp}`,
        //     headers: { 
        //       'accept': 'application/json', 
        //       'authkey': '402273ADCjESy6650c1c91P1', 
        //       'Cookie': 'PHPSESSID=tgrp9udsnphtkoqhnrjmfo5ha3'
        //     }
        //   };
        //   let {data:res}  =  await  axios.request(config);

        let ValidOtp = mobile.substring(4, mobile.length);
        console.log(ValidOtp,"ValidOtpValidOtp",otp)

        if(ValidOtp == otp){
            return {status:true,message:'OTP Matched Successfully'}

        }
        return {status:false,message:"OTP is Invalid"}

          console.log("VerifyOtp",res)
          if(res.type && res.type == 'success'){
            return {status:true,message:'OTP Matched Successfully'}
         }  
                  return {status:false,message:"OTP is Invalid"}
        
        }

     return {status:false,message:"Please Try Again"}
        
    } catch (error) {
         console.log(error);
     return {status:false,message:error}
    }
 };
 

 function generateOTP(limit) {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}