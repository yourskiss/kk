"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Loader from "../shared/LoaderComponent";
import HeaderComponent from "../shared/HeaderComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  setBearerToken } from "@/config/beararauth";
import { setUserCookies, isUserToken } from "@/config/userauth";
import { encryptText } from "@/config/crypto";
 
export default function LoginComponent() { 
    const[loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [mobileValues, setMobileValues] = useState('');
    const [otpValues, setOtpValues] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [isOTP, setIsOTP] = useState(false);
    const mobileChange = (e) =>{setMobileValues(e.target.value);}
    const otpChange = (e) =>{setOtpValues(e.target.value); }

    const mobileSubmit =(e) =>{
      e.preventDefault();
      const regexMobile = /^[6789][0-9]{9}$/i;
      if (!mobileValues){setMobileError("Mobile number is required!");}
      else if(mobileValues.length > 10){setMobileError("Mobile Number not more then 10 digit");}
      else if(mobileValues.length < 10){setMobileError("Mobile Number must have at least 10 digit");}
      else if(!regexMobile.test(mobileValues)){setMobileError("Invalid mobile number!");}
      else { setMobileError("");  setIsMobile(true); }
    }
    const otpSubmit =(e) =>{
      e.preventDefault();
      const regexOTP = /^[0-9]{6}$/i;
      if (!otpValues){setOtpError("OTP is required!");}
      else if(otpValues.length > 6){setOtpError("OTP not more then 6 digit");}
      else if(otpValues.length < 6){setOtpError("OTP must have at least 6 digit");}
      else if(!regexOTP.test(otpValues)){setOtpError("Invalid otp");}
      else{ setOtpError(''); setIsOTP(true); }
    }
    const changeNumber = (e) => {
      setIsDisabled(false);
      setIsOTP(false);
      setIsMobile(false)
    }
  const { push } = useRouter();
  const setBT = setBearerToken();
  const isUT = isUserToken();
 
  useEffect(() => {
    if(isUT) { push("/dashboard"); return }
   }, [isUT]);

   useEffect(() => {
    if(Object.keys(mobileError).length === 0 && isMobile)
    {
      setIsDisabled(true);
      toast.success('OTP Send to your mobile number.');
    }
  }, [mobileError, isMobile]);
 
  useEffect(() => {
    if(Object.keys(otpError).length === 0 && isOTP)
    {
      setLoading(true);
      axios({
         url: process.env.BASE_URL + "Customer/UserInfo?userid=0&phonenumber="+ mobileValues,
         method: "GET",
         headers: { 'authorization': 'Bearer '+ setBT },
      }).then((res) => {
        console.log("login success - ", res);
        
        sessionStorage.setItem("userprofilename",res.data.result.fullname);
        sessionStorage.setItem("userprofilepic",res.data.result.profilepictureurl);
        if(res.data.result.verificationstatus === "APPROVE")
        {
            const userinfo = res.data.result.userid + "|" + res.data.result.phonenumber
            setUserCookies('usertoken', encryptText(userinfo));
            res.data.result ? push("/dashboard") : toast.error(res.data.resultmessage);
        }
        else if(res.data.result.verificationstatus === "PENDING")
        {
           res.data.result ? push("/approval") : toast.error(res.data.resultmessage);
        }
        else
        {
           toast.warn("Your are not registered user. please register after login");
        }
        setLoading(false);
      }).catch((err) => {
        toast.error(err.message);
        setLoading(false); 
      });
    }
  }, [otpError, isOTP]);
 
  return (
  <>

    <HeaderComponent />
    <div className='screenmain'>
    <section className="screencontainer">


          <div className="registerHead">Welcome! Sign in here  </div>
          <div className="registercontainer">
              <div className="registerField">
                <input  type="number" name="mobile" placeholder="Mobile number" maxLength={10} minLength={10} value={mobileValues} onChange={mobileChange} disabled={isDisabled} />
                <span className='registerError'>{ mobileError }</span> 
                { isDisabled ? <em className="numberedit" onClick={changeNumber}>Change</em> : null }
              </div>
          </div>
 

        { mobileError === '' && isMobile ? (
        <>
            <div className="registercontainer">
              <div className="registerMsgOtp">Enter OTP </div>
              <div className="registerOtp">
                <div><aside>
                  <input type="number" name="otpnumber" maxLength={6} minLength={6}  value={otpValues} onChange={otpChange} />
                </aside></div> 
              </div>
              <span className='registerError registerErrorCenter'> { otpError }</span>  
              <div className="registerOtpText">Not reveived?  <span>Resend OTP</span></div>
            </div>
        </>
        ) : null }

            <div className="registerSubmit">
              { 
                !isMobile && !isOTP ?
                (<button className="register_button" onClick={mobileSubmit}>Sign In</button>) 
                :
                (<button className="register_button" onClick={otpSubmit}>Sign In</button>)
              }
            </div>

        
      
      <div className="registerBottomText">Do not have account <Link href="/register">Sign Up</Link></div>
    </section>
    </div>


    
<ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"  />

    { loading ? <Loader /> : null }
  </>
  )
}
