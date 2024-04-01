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

export default function UpdateprofileComponent() {
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
    const [data, setData] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
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
          //  console.log("get---", res.data.result);
            setLoading(false);
            setData(true);
            setUserdata(res.data.result);
            setStatename(res.data.result.state);
            setCityname(res.data.result.city);
            setFiledata(res.data.result.profilepictureurl);
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
    useEffect(() => {
        setFormValue({
            'profilepictureurl': userdata.profilepictureurl,
            'firstname':  userdata.firstname,
            'lastname':  userdata.lastname,
            'emailaddress': userdata.emailaddress,
            'city':  userdata.city,
            'state':  userdata.state,
            'aadhaarinfo': userdata.aadhaarinfo
        });
    }, [data]);
    const validateHandler =(val) =>{
        const error = {};
        const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if(val.profilepictureurl===''){error.profilepictureurl = "Profile Picture is required"}
        if(val.firstname===''){error.firstname = "First name is required"}
        if(val.lastname===''){error.lastname = "Last name is required"}
        if(val.emailaddress===''){error.emailaddress = "Email address is required"}
        else if(!emailValidation.test(val.emailaddress)){error.emailaddress = "Invalid email address"}
        if(val.state===''){error.state = "State is required"}
        if(val.city===''){error.city = "City is required"}
        if(val.aadhaarinfo===''){error.aadhaarinfo = "Aadhaar number is required"}
        else if(val.aadhaarinfo.length < 12){error.aadhaarinfo = "Aadhaar must have at least 12 Digit"}
        return error;
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormError(validateHandler(formValue));
        setIsSubmit(true);
       // console.log("formValue on submit", formValue);
    }
    const onChangeField = (e) => { 
        setFormValue({ ...formValue, [e.target.name] : e.target.value }); 
        if(e.target.name === "state"){ setStatename(e.target.value); setStateID(e.target.options[e.target.selectedIndex].title); }
        if(e.target.name === "city"){ setCityname(e.target.value); }
        if(e.target.name === "profilepictureurl"){ setFiledata(e.target.value);  }
    }
    useEffect(()=>{
        if(Object.keys(formError).length === 0 && isSubmit)
        {
           const datafinal = 
           {
            userid: userID,
            firstname: formValue.firstname,
            lastname: formValue.lastname,
            fullname: formValue.firstname + " " + formValue.lastname,
            gender: "Male",
            phonenumber: userMobile,
            emailaddress: formValue.emailaddress,
            aadhaarinfo: formValue.aadhaarinfo,
            addressline1: "",
            city: cityname,
            state: statename,
            country: "India",
            postalcode: "",
            profilepictureurl: filedata,
            dateofbirth: "",
            languagepreference: "English",
            locationpage: "/update-profile",
            ipaddress: ipInfo,
            osdetails: osInfo,
            browserdetails: browserInfo
          }
         // console.log("datafinal - ",datafinal);
            setLoading(true);
            axios({
                url: process.env.BASE_URL + "Customer/SaveUser",
                method: "POST",
                headers: { 'authorization': 'Bearer '+ setBT  },
                data: datafinal,
            }).then((res) => {
               // console.log(res);
                setLoading(false);
                localStorage.setItem('userprofilepic', res.data.result.profilepictureurl);
                localStorage.setItem('userprofilename',  res.data.result.firstname + " " + res.data.result.lastname);
                res.data.result ? (toast.success("Profile Updated Successfully."),push("/dashboard")) : toast.warn(res.data.resultmessage);
            }).catch((err) => {
                setLoading(false); 
                toast.error(err.message);
            });
        }
    },[formError, isSubmit]);

    const onInputmaxLength = (e) => {
        if(e.target.value.length > e.target.maxLength)
        {
          e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    }
     
  return (
    <>
    <HeaderComponent />
    <div className='screenmain'>
        <section className="screencontainer">
        <form onSubmit={handleSubmit}>
            <div className="registercontainer">
                <div className="registerHead">Setup your profile</div>
                <ImageCropperUpdate picvalue={ filedata } filePath={getFilePath} />
                <div style={{   position:"absolute", top:"-99999px", left:"-99999px"  }}>
                    <input 
                        type="text" 
                        name="profilepictureurl" 
                        value={ filedata } 
                        onChange={onChangeField}  
                    />
                    <span className="registerError">{ formError.profilepictureurl ? formError.profilepictureurl : '' }</span>
                </div>
                
                <div className="registerField">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        maxLength={25}
                        onInput={onInputmaxLength}
                        value={ formValue.firstname  || ''  }
                        onChange={onChangeField}
                    />
                    <span className="registerError">{ formError.firstname  ?  formError.firstname : '' }</span>
                </div>

                <div className="registerField">
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        maxLength={25}
                        onInput={onInputmaxLength}
                        value={ formValue.lastname  || ''  }
                        onChange={onChangeField}
                    />
                   <span className="registerError">{formError.lastname  ?  formError.lastname : '' }</span>
                </div>

                <div className="registerField">
                    <input
                        type="text"
                        name="emailaddress"
                        placeholder="Email ID"
                        maxLength={50}
                        onInput={onInputmaxLength}
                        value={ formValue.emailaddress || ''  }
                        onChange={onChangeField}
                    />
                    <span className="registerError">{formError.emailaddress  ?  formError.emailaddress : '' }</span>
                </div>

                <div className="registerField">
                      <select 
                        name="state" 
                        className="registerSelect" 
                        value={ statename ||  formValue.state  || ''   }  
                        onChange={onChangeField}
                      >
                        <option value="" title="">Select State</option>
                         {
                            stateList.map((val) => <option value={val.name} title={val.id} key={val.id}>{val.name}</option>)
                         }
                      </select>
                      <span className="registerError">{formError.state  ?  formError.state : '' }</span>
                </div>
                
                { stateID !== '' ? 
                <div className="registerField">
                      <select 
                        name="city" 
                        className="registerSelect" 
                        value={ cityname || formValue.city  || ''  }  
                        onChange={onChangeField}
                       >
                        <option value="">Select City</option>
                         {
                            cityList.map((val) => <option value={val.name} key={val.id}>{val.name}</option>)
                         }  
                      </select>
                      <span className="registerError">{ formError.city  ?  formError.city : '' } </span>
                </div>
                : null }
                

                <div className="registerField">
                    <input
                        type="number"
                        name="aadhaarinfo"
                        placeholder="Aadhaar Number"
                        maxLength={12}
                        onInput={onInputmaxLength}
                        value={ formValue.aadhaarinfo || '' }
                        onChange={onChangeField}
                    />
                    <span className="registerError">{ formError.aadhaarinfo  ?  formError.aadhaarinfo : '' }</span> 
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

  
 
 