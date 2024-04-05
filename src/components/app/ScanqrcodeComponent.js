"use client";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QrReader from '../core/QrReader';
import HeaderComponent from '../shared/HeaderComponent';
import { getUserID, isUserToken, isValideUser } from "@/config/userauth";
import { setBearerToken } from "@/config/beararauth";
import Loader from "../shared/LoaderComponent";
import { ipaddress, osdetails, browserdetails, geoLatitude, geoLongitude } from "../core/jio";
import { toast } from 'react-toastify';

export default function ScanqrcodeComponent() {
  const [loading, setLoading] = useState(false);
  const [qrcode, setQrcode] = useState(true);
  const [scandata, setScandata] = useState('');
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

 
 
  useEffect(() => {
    if(!isUT) { push("/"); return  }
  }, [isUT]);

  useEffect(() => {
      const sdURL = scandata.split("?") || '';
      if(sdURL[0] === process.env.COUPON_URL || sdURL[0] === process.env.COUPON_URL2 || sdURL[0] === process.env.COUPON_URL3)
      {
          const couponvalue = sdURL[1].split("=");
          setCouponecode(couponvalue[1]);
          toast.success("QR code scan successfully.")
      }
  }, [scandata]);


  const handalqrisvailable = (val) => { 
    setQrcode(val);
  }
  const getData =(val) =>{
    setScandata(val);
  }
 
  const handleSubmitCode = (e) => 
  {
    e.preventDefault();
    setLoading(true);
    const qrdata = {
      userid: userID,
      couponcode: couponecode,
      scanlocation: `{'Latitude':'${latInfo}', 'Longitude':'${lonInfo}'}`,
      ipaddress: ipInfo,
      osdetails: osInfo,
      browserdetails: browserInfo
    }
   // console.log(qrdata);
    if(couponecode !== '')
    {
        axios({
          url: process.env.BASE_URL + "Customer/ValidateCouponAndSave",
          method: "POST",
          headers: { 'authorization': 'Bearer '+ setBT  },
          data: qrdata,
        }).then((res) => {
          setLoading(false);
          // console.log(res)
          if(res.data.result === null)
          {
            toast.error(res.data.resultmessage);
            setQrcode(true);
           } 
           else
           {
            toast.success('Coupon Successfully Verify and Added');
            push("/rewards");
           }
        }).catch((err) => {
          setLoading(false); 
          toast.error(err.message);
          setQrcode(true);
          //push("/dashboard");
        });
    }
    else
    {
      setLoading(false); 
      toast.error("Invalide QR Code...")
      setQrcode(true);
    }

  }

  return (
    <>
      <HeaderComponent />
      <div className="screenmain" > 
        <div className="screencontainer">

          <div className="scanqrcodecontainer">
            <h2>Scan Data  <span>({scandata})</span> </h2>
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

      { qrcode ? <QrReader onData={handalqrisvailable} onSuccess={getData} /> : "" }

 

      { loading ? <Loader /> : null }
    </>
  )
}
