"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import HeaderComponent from "../shared/HeaderComponent";
import Loader from "../shared/LoaderComponent";
import {  setBearerToken } from "@/config/beararauth";
import { getUserID, getUserMobile, isUserToken, isValideUser } from "@/config/userauth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageCropperUpdate from "../core/ImageCropperUpdate";
import { ipaddress, osdetails, browserdetails  } from "../core/jio";
import { useForm } from "react-hook-form";
import { updateOptions } from "@/locale/en-in";

export default function UpdateprofileComponent() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleError = (errors) => { };
 
    const[loading, setLoading] = useState(false);
    const { push } = useRouter();
    const setBT = setBearerToken()
    const isUT = isUserToken();
    const isUser = isValideUser();
    const userID = getUserID();
    const userMobile = getUserMobile();
    
    const ipInfo = ipaddress();
    const osInfo = osdetails();
    const browserInfo = browserdetails();

    const [userdata, setUserdata] = useState({});
    const [stateList, setStateList] = useState([]);
    const [stateID, setStateID] = useState('');
    const [statename, setStatename] = useState('');
    const [cityList, setCityList] = useState([]);
    const [cityname, setCityname] = useState('');
    const [filedata, setFiledata] = useState('');
    const getFilePath = (data)=>{setFiledata(data);}
   
    useEffect(() => {
        if(!isUT) { push("/"); return  }
        setLoading(true);
        axios({
            url: process.env.BASE_URL + "Customer/UserInfo?userid=0&phonenumber="+ userMobile,
            method: "GET",
            headers: { 'authorization': 'Bearer '+ setBT },
        }).then((res) => {
          //  console.log(res.data.result);
            setLoading(false);
            setUserdata(res.data.result);
            setStatename(res.data.result.state);
            setCityname(res.data.result.city);
        }).catch((err) => {
            toast.warn(err.message);
            setLoading(false); 
        });

        axios({
            url: process.env.BASE_URL + "CommonUtility/State?countryId=1",
            method: "GET",
            headers: { 'authorization': 'Bearer '+ setBT  },
          }).then((res) => {
            // console.log(res.data);
              setStateList(res.data);
              setLoading(false); 
          }).catch((err) => {
              setLoading(false); 
              console.log(err.message);
          });

    }, [isUT]);

    useEffect(() => {
        const getstateID = stateList.filter((st) => st.name === statename);
        const getstate = getstateID.map(st => (st.id));
        setStateID(getstate.toString());
    }, [stateID, statename, stateList]);
        
    useEffect(() => {
            axios({
            url: process.env.BASE_URL + "CommonUtility/City?stateId="+stateID,
            method: "GET",
            headers: { 'authorization': 'Bearer '+ setBT  },
            }).then((res) => {
            setCityList(res.data);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [stateID]);
 
 
    const handleRegistration = (data) => 
    {
        setLoading(true);
        const datafinal = {
            userid: userID,
            firstname: data.firstname,
            lastname: data.lastname,
            fullname: data.firstname + " " + data.lastname,
            gender: userdata.gender,
            phonenumber: userMobile,
            emailaddress: data.emailaddress,
            aadhaarinfo: data.aadhaarinfo,
            addressline1: "",
            city: cityname,
            state: statename,
            country: "India",
            postalcode: "",
            profilepictureurl: data.profilepic,
            dateofbirth: "",
            languagepreference: "English",
            locationpage: "/update-profile",
            ipaddress: ipInfo,
            osdetails: osInfo,
            browserdetails: browserInfo
          }
          // console.log(datafinal);
    
        axios({
            url: process.env.BASE_URL + "Customer/SaveUser",
            method: "POST",
            headers: { 'authorization': 'Bearer '+ setBT  },
            data: datafinal,
        }).then((res) => {
           // console.log(res);
            setLoading(false);
            localStorage.setItem('userprofilepic', data.profilepic);
            localStorage.setItem('userprofilename',  data.firstname + " " + data.lastname);
            res.data.result ? push("/dashboard") : toast.warn(res.data.resultmessage);
        }).catch((err) => {
            setLoading(false); 
            toast.error(err.message);
        });
    }

  return (
    <>
    <HeaderComponent />
    <div className='screenmain'>
        <section className="screencontainer">
        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
            <div className="registercontainer">
                <div className="registerHead">Setup your profile</div>
                <ImageCropperUpdate picvalue={ filedata || userdata.profilepictureurl  } filePath={getFilePath} />
                <div style={{ position:"absolute", top:"-99999px", left:"-99999px" }}>
                    <input type="text" name="profilepic" defaultValue={ filedata || userdata.profilepictureurl } {...register('profilepic', updateOptions.profilepic)}  />
                    <span className="registerError">{ errors.profilepic ? errors.profilepic.message : '' }</span>
                </div>
                
                <div className="registerField">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        maxLength={25}
                        defaultValue={  userdata.firstname || '' }
                        {...register('firstname', updateOptions.firstname)}
                    />
                    <span className="registerError">{ errors.firstname  ?  errors.firstname.message : '' }</span>
                </div>

                <div className="registerField">
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        maxLength={25}
                        defaultValue={  userdata.lastname || '' }
                        {...register('lastname', updateOptions.lastname)}
                    />
                   <span className="registerError">{errors.lastname  ?  errors.lastname.message : '' }</span>
                </div>

                <div className="registerField">
                    <input
                        type="text"
                        name="emailaddress"
                        placeholder="Email ID"
                        maxLength={50}
                        defaultValue={ userdata.emailaddress || '' }
                        {...register('emailaddress', updateOptions.emailaddress)}
                    />
                    <span className="registerError">{errors.emailaddress  ?  errors.emailaddress.message : '' }</span>
                </div>

                <div className="registerField">
                      <select 
                        name="state" 
                        className="registerSelect" 
                        value={statename || userdata.state}  
                        {...register('state',  updateOptions.state)}  
                        onChange={ e => {  setStatename(e.target.value); setStateID(e.target.options[e.target.selectedIndex].title); } }
                      >
                        <option value="" title="">Select State</option>
                         {
                            stateList.map((val) => <option value={val.name} title={val.id} key={val.id}>{val.name}</option>)
                         }
                      </select>
                      <span className="registerError">{errors.state  ?  errors.state.message : '' }</span>
                </div>
                
                { stateID !== '' ? 
                <div className="registerField">
                      <select 
                        name="city" 
                        className="registerSelect" 
                        value={cityname || userdata.city}  
                        {...register('city', updateOptions.city)}  
                        onChange={ e => {  setCityname(e.target.value); } }
                       >
                        <option value="">Select City</option>
                         {
                            cityList.map((val) => <option value={val.name} key={val.id}>{val.name}</option>)
                         }  
                      </select>
                      <span className="registerError">{ errors.city  ?  errors.city.message : '' } </span>
                </div>
                : null }
                

                <div className="registerField">
                    <input
                        type="number"
                        name="aadhaarinfo"
                        placeholder="Aadhaar Number"
                        maxLength={12}
                        defaultValue={  userdata.aadhaarinfo || '' }
                        {...register('aadhaarinfo', updateOptions.aadhaarinfo)}
                    />
                    <span className="registerError">{ errors.aadhaarinfo  ?  errors.aadhaarinfo.message : '' }</span> 
                </div>
       
                <div className="registerSubmit">
                  <button className="register_button">Update</button>
                </div>
            </div>
        </form>
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