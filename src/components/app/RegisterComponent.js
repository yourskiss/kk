"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
// import Cookies from 'js-cookie';
import ImageCropperWithPreview from "../core/ImageCropperWithPreview";
import Loader from "../shared/LoaderComponent";
import InputWrapperComponent from "../shared/InputWrapperComponent";
import HeaderComponent from "../shared/HeaderComponent";
import { registerOptions } from "@/locale/en-in";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setBearerToken } from "@/config/beararauth";
import { isUserToken, isValideUser } from "@/config/userauth";
import { ipaddress, osdetails, browserdetails  } from "../core/jio";

export default function RegisterComponent() {
  const[loading, setLoading] = useState(false);
  const [filedata, setFiledata] = useState('');
  const getFilePath = (data)=>{setFiledata(data);}
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleError = (errors) => { };
  const { push } = useRouter();
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stateID, setStateID] = useState('');
  const [statename, setStatename] = useState('');
 
  const ipInfo = ipaddress();
  const osInfo = osdetails();
  const browserInfo = browserdetails();

  const setBT = setBearerToken();
  const isUT = isUserToken();
  const isUser = isValideUser();
  useEffect(() => {
    if(isUT) { push("/dashboard"); return }
  }, [isUT]);
 
    useEffect(() => {
      setLoading(true); 
      axios({
        url: process.env.BASE_URL + "CommonUtility/State?countryId=1",
        method: "GET",
        headers: { 'authorization': 'Bearer '+ setBT  },
      }).then((res) => {
          setStateList(res.data);
          setLoading(false); 
      }).catch((err) => {
          setLoading(false); 
          console.log(err.message);
      });
       

      stateID !== '' ?
          axios({
            url: process.env.BASE_URL + "CommonUtility/City?stateId="+stateID,
            method: "GET",
            headers: { 'authorization': 'Bearer '+ setBT  },
          }).then((res) => {
            setCityList(res.data);
          }).catch((err) => {
              console.log(err.message);
          })
     : null;
    }, [stateID]);
 
 
  const handleRegistration = (data) => 
  {
    setLoading(true);
    const datafinal = {
      firstname: data.firstname,
      lastname: data.lastname,
      fullname: data.firstname + " " + data.lastname,
      gender: data.gender,
      phonenumber: data.mobilenumber,
      emailaddress:data.emailaddress,
      aadhaarinfo: data.aadhaarinfo,
      addressline1: "",
      city: data.city,
      state: statename,
      country: "India",
      postalcode: "",
      profilepictureurl: data.profilepic,
      dateofbirth: "",
      languagepreference: "English",
      locationpage: "/register",
      ipaddress: ipInfo,
      osdetails: osInfo,
      browserdetails: browserInfo
    }
     console.log(datafinal);
    
    axios({
          url: process.env.BASE_URL + "Customer/SaveUser",
          method: "POST",
          headers: { 'authorization': 'Bearer '+ setBT  },
          data: datafinal,
      }).then((res) => {
        console.log(res);
        setLoading(false);
        localStorage.setItem('userprofilepic', data.profilepic);
        localStorage.setItem('userprofilename',  data.firstname + " " + data.lastname);
        res.data.result ? push("/approval") : toast.warn(res.data.resultmessage);
      }).catch((err) => {
        toast.error(err.message);
        setLoading(false); 
      });
      
  }

  
  const onInputmaxLength = (e) => {
    if(e.target.value.length > e.target.maxLength)
    {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  }
  
 
  return (
  <>


    <HeaderComponent />
    <div className="screenmain">
      <div className="screencontainer">
        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
          <div className="registercontainer">
            <div className="registerHead">Setup your profile</div>
            <ImageCropperWithPreview filePath={getFilePath} />

            <div style={{ position:"absolute", top:"-99999px", left:"-99999px" }}>
              <input type="text" value={filedata} name="profilepic" {...register('profilepic', registerOptions.profilepic)} />
            </div>
            { filedata === '' ? <span className="registerError registerErrorCenter"> {errors?.profilepic && errors.profilepic.message} </span> : null }

              <InputWrapperComponent
                  type="number"
                  name="mobilenumber"
                  placeholder="Mobile Number"
                  maxLength={10}
                  onInput={onInputmaxLength}
                  {...register('mobilenumber', registerOptions.mobilenumber)}
                  errors={errors?.mobilenumber && errors.mobilenumber.message}
                />
 
              <InputWrapperComponent
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  maxLength={20}
                  onInput={onInputmaxLength}
                  {...register('firstname', registerOptions.firstname)}
                  errors={errors?.firstname && errors.firstname.message}
                />
                <InputWrapperComponent
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  maxLength={20}
                  onInput={onInputmaxLength}
                  {...register('lastname', registerOptions.lastname)}
                  errors={errors?.lastname && errors.lastname.message} 
                />

                <InputWrapperComponent
                  type="text"
                  name="emailaddress" 
                  placeholder="Email ID" 
                  onInput={onInputmaxLength}
                  maxLength={50} {...register('emailaddress', registerOptions.emailaddress)} 
                  errors={errors?.emailaddress && errors.emailaddress.message}
                />

                <div className="registerField">
                      <select name="gender" className="registerSelect" {...register('gender', registerOptions.gender)}  >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      <span className="registerError">{errors?.gender && errors.gender.message}  </span>
                </div>
                
                <div className="registerField">
                      <select  name="state" className="registerSelect" {...register('state',  registerOptions.state)}  onChange={ e => 
                        { setStatename(e.target.value);  setStateID(e.target.options[e.target.selectedIndex].title); } }> 
                        <option value="" title="">Select State</option>
                         {
                            stateList.map((val) => <option value={val.name} title={val.id} key={val.id}>{val.name}</option>)
                         }
                      </select>
                      <span className="registerError">{errors?.state && errors.state.message} </span>
                </div>
                { stateID !== '' ? 
                <div className="registerField">
                      <select name="city" className="registerSelect" {...register('city', registerOptions.city)}>
                        <option value="">Select City</option>
                         {
                            cityList.map((val) => <option value={val.name} key={val.id}>{val.name}</option>)
                         }  
                      </select>
                      <span className="registerError">{errors?.city && errors.city.message} </span>
                </div>
                : null }


                <InputWrapperComponent
                  type="number"
                  name="aadhaarinfo"
                  placeholder="Aadhaar Number"
                  maxLength={12}
                  onInput={onInputmaxLength}
                  {...register('aadhaarinfo', registerOptions.aadhaarinfo)}
                  errors={errors?.aadhaarinfo && errors.aadhaarinfo.message} 
                />
                <p>Profile details should match with Aadhaar</p>

 
                <div className="registerSubmit">
                  <button className="register_button">Submit</button>
                </div>

                <div className="registerBottomText">
                  Already have an account?  <Link href='/'>Sign in</Link>
                </div>
              </div>
          </form>
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
