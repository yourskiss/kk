import Cookies from 'js-cookie';
import axios from "axios";
import { decryptText } from "@/config/crypto";
import { useEffect, useState } from 'react';
import { setBearerToken } from './beararauth';


const getUserID = () => {
  const isToken = !!Cookies.get('usertoken');
  const isValue = Cookies.get('usertoken');
  if(isToken)
  {
    const decryptUserToken = decryptText(isValue)
    const userID = decryptUserToken.split("|")[0];
    return userID
  }
}

const getUserMobile = () => {
  const isToken = !!Cookies.get('usertoken');
  const isValue = Cookies.get('usertoken');
  if(isToken)
  {
    const decryptUserToken = decryptText(isValue)
    const userMobile = decryptUserToken.split("|")[1];
    return userMobile
  }
}


const setUserCookies = (name, val) => {
   return Cookies.set(name, val, { expires: new Date(new Date().getTime() + 3600000), secure: true });
}
const isUserToken = () => {
  const isToken = !!Cookies.get('usertoken');
  return isToken;
}
const getUserToken = () => {
  const isValue = Cookies.get('usertoken');
  return isValue;
}
 
const isValideUser = () => {
    const [profileuseid,setProfileuseid] = useState(0);
    const [profileusemobile,setProfileusemobile] = useState(0);
    const [userAuth,setUserAuth] = useState(false);
    const setBT  = setBearerToken();
    const isUT = isUserToken();
    const userID = getUserID();
    const userMobile = getUserMobile(); 

        useEffect(() => {
            if((isUT) && (userID !== undefined || userID !== null || userID !== '') && (userMobile !== undefined || userMobile !== null || userMobile !== ''))
            {
              axios({
                url: process.env.BASE_URL + "Customer/UserInfo?userid=0&phonenumber="+ userMobile,
                method: "GET",
                headers: { 'authorization': 'Bearer '+ setBT },
              }).then((res) => {
                  // console.log("auth res-", res);
                  setProfileuseid(res.data.result.userid);
                  setProfileusemobile(res.data.result.phonenumber);
              });
              userID === profileuseid &&  userMobile === profileusemobile ? setUserAuth(true) : setUserAuth(false);
            }
          }, [profileuseid, profileusemobile]);
      
 
      // console.log("outside ",userAuth, ", ", userID, "-", profileuseid,", ", userMobile, "-", profileusemobile);
    
      return userAuth;
}







export {  getUserID, getUserMobile, setUserCookies, getUserToken, isUserToken, isValideUser};