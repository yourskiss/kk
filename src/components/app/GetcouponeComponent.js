"use client";
import axios from "axios";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderComponent from '../shared/HeaderComponent';
import { getUserID, isUserToken, isValideUser } from "@/config/userauth";
import { setBearerToken } from "@/config/beararauth";
import Loader from "../shared/LoaderComponent";
import { ipaddress, osdetails, browserdetails, geoLatitude, geoLongitude } from "../core/jio";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isCouponeCode, getCouponeCode } from "@/config/validecoupone";

export default function GetcouponeComponent() {
 
  const [loading, setLoading] = useState(false);
  const [couponecode, setCouponecode] = useState('');
  const { push } = useRouter();
  const setBT = setBearerToken();
  const isUT = isUserToken();
  const isUser = isValideUser();
  const userID = getUserID();
  const latInfo = geoLatitude();
  const lonInfo = geoLongitude();
  const ipInfo = ipaddress();
  const osInfo = osdetails();
  const browserInfo = browserdetails();
  const isCC = isCouponeCode();
  const getCC = getCouponeCode();
  useEffect(() => {
    isCC ? setCouponecode(getCC)  : push("/rewards"); 
  }, [couponecode]);
 
  useEffect(() => {
    if(!isUT) { push("/"); return  }
  }, [isUT]);
  
  const handleSubmitCode = (e) => 
  {
    e.preventDefault();
    setLoading(true);
    const qrdata = {
      userid: userID,
      couponcode: couponecode,
      scanlocation: latInfo + " " + lonInfo,
      ipaddress: ipInfo,
      osdetails: osInfo,
      browserdetails: browserInfo
    }
   // console.log(qrdata);
        axios({
          url: process.env.BASE_URL + "Customer/ValidateCouponAndSave",
          method: "POST",
          headers: { 'authorization': 'Bearer '+ setBT  },
          data: qrdata,
        }).then((res) => {
          setLoading(false);
          // console.log(res)
          res.data.result === null ? (toast.error(res.data.resultmessage), Cookies.remove('couponecodecookies')) : push("/rewards");
        }).catch((err) => {
          setLoading(false); 
          toast.error(err.message);
          //push("/dashboard");
        });
  }

  return (
    <>
      <HeaderComponent />
      <div className="screenmain" > 
        <div className="screencontainer">

          <div className="scanqrcodecontainer">
            <h2>Scan Data </h2>
            <ul>
              <li>Latitude: {latInfo}</li>
              <li>Longitude: {lonInfo}</li>
              <li>IP Address: {ipInfo}</li>
              <li>OS Details: {osInfo}</li>
              <li>Browser Details: {browserInfo}</li>
              <li>Coupone Code: {couponecode}</li>
            </ul>
            <form className="scanqrcodeForm" onSubmit={handleSubmitCode} >
                <button>Validate and Save Coupon</button>
            </form>
          </div>
 
          
        </div>
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
