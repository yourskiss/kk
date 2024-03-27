export const registerOptions = {
    profilepic : { required: "Profile picture is required" },
    mobilenumber: {
      required: "Mobile number is required",
      minLength: { value: 10, message: "Mobile must have at least 10 Digit" },
      maxLength: { value: 10, message: "Mobile not more then 10 Digit" },
      pattern: { value: /^[6-9]{1}[0-9]{9}$/i, message: "Invalid Mobile Number" }
    },
    firstname: { required: "First name is required" },
    lastname: { required: "Last name is required" },
    emailaddress: {
      required: "Email is required",
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" }
    },
    gender: { required: "Gender is required" },
    state: { required: "State is required" },
    city: { required: "City is required" },
    aadhaarinfo: {
      required: "Aadhaar number is required",
      minLength: { value: 12, message: "Aadhaar must have at least 12 Digit" },
      maxLength: { value: 12, message: "Aadhaar not more then 12 Digit" },
      pattern: { value: /^[0-9]{12}$/i, message: "Invalid Aadhaar" }
    }
  }

  export const updateOptions = { 
    profilepic: { required: "Profile picture is required" },
    firstname: { required: "First name is required" },
    lastname: { required: "Last name is required" },
    emailaddress: {
      required: "Email is required",
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
    },
    state: { required: "State is required" },
    city: { required: "City is required" },
    aadhaarinfo: {
      required: "Aadhaar number is required",
      minLength: { value: 12, message: "Aadhaar must have at least 12 Digit" },
      maxLength: { value: 12, message: "Aadhaar not more then 12 Digit" },
      pattern: { value: /^[0-9]{12}$/i, message: "Invalid Aadhaar" }
    }
  }

 