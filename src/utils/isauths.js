 "use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

export default function isauths(Component) {
  return function isauths(props) 
  {
    const { push } = useRouter();
    console.log(Cookies.get('usertoken'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    console.log("normal",isAuthenticated);
     Cookies.get('usertoken') !== undefined ? setIsAuthenticated(true) : setIsAuthenticated(false);
     console.log("after",isAuthenticated);
    useEffect(() => {
      if (isAuthenticated === false) { return push("/"); }
    }, []);
    
    if (isAuthenticated === false) { return null; }
    return <Component {...props} />;
  };
}

export const authentication = false;