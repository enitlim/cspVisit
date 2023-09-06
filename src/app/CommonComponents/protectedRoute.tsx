"use client"
import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {CspContext} from "../context/cspContext"

interface ProtectedRouteProps{
    children:React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {login}=useContext(CspContext);
    const route=useRouter();
    const [isloading, setIsLoading] = useState(true)
    useEffect(()=>{
        const checkLogin=async()=>{
        if (login==='notlogged') {
            route.replace("/login");
             
            setTimeout(() => {
                setIsLoading(false); 
            }, 1000);
        }
        else if (login==='logged') {       
            setIsLoading(false);            
        }
    }
    checkLogin();
    },[login, route])
console.log("Loading Status=>",isloading);

  return (
    <>{isloading?(<>Loading</>):(<>{children}</>)}</>
    // <>{login == "logged" ? <>{children}</>: null}</>
  );
}

export default ProtectedRoute;