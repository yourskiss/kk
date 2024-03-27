"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import HeaderComponent from "../shared/HeaderComponent";
import { getUserID, isUserToken, isValideUser } from "@/config/userauth";
import { setBearerToken } from '@/config/beararauth';
import Loader from "../shared/LoaderComponent";
import TotalrewardpointsComponent from '../shared/TotalrewardpointsComponent';

export default function RewardshistoryComponent () {
  const [loading, setLoading] = useState(false);
  const [pointhistory, setPointhistory] = useState({});
  const [nodata, setNodata] = useState('');
  const { push } = useRouter();
  const isUT = isUserToken();
  const isUser = isValideUser();
  const setBT = setBearerToken();
  const userID = getUserID();
   
  
  useEffect(() => {
  if(!isUT) { push("/"); return  }
    setLoading(true);
    axios({
        url: process.env.BASE_URL + "Customer/UserRewardPointsHistory?userid="+ userID,
        method: "GET",
        headers: { 'authorization': 'Bearer '+ setBT },
    }).then((res) => {
       // console.log("UserRewardPointsHistory - response - ", res);
        setLoading(false);
        if(res.data.result.length !== 0)
        {
          setPointhistory(res.data.result)
        }
        else
        {
          setNodata('No rewards point available');
        }
    }).catch((error) => {
        setLoading(false);
       // console.log("UserRewardPointsHistory - error - ", error);
        setNodata(error.message);
    });

  }, [isUT]);

 const points = TotalrewardpointsComponent();
  return (
  <>
    <HeaderComponent />
    <div className="screenmain" > 
      <div className="screencontainer">
 


          <div className="rewardscontainer">
            <h2>Reward Points History</h2>
            <h3>(Total Rewards <span>{points}</span> <b>pt</b>)</h3>
            { nodata ? <div className="norewardsavailable">{nodata}</div> : (
            <ul>
              <li>
                <p><b>SN.</b></p>
                <p><b>Coupon Code</b></p>
                <p><b>Scan Datetime</b></p>
                <p><b>Earned Points</b></p>
              </li>
              {  pointhistory.map &&  pointhistory.map((val, index) => <li key={val.pointid}><p>{index+1}</p><p>{val.couponcode}</p><p>{ val.scandate }</p><p>{ val.earnedpoints }</p></li>) }
            </ul> 
            )}
          </div>
 
      </div>
    </div> 



    { loading ? <Loader /> : null }
  </>
  )
}
 

 
 

          
 
 