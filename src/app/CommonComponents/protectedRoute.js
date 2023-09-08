"use client"
import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {CspContext} from "../context/cspContext"
import {useSelector, useDispatch} from "react-redux";
import { listentoAuthChanges } from "../redux/actions/authAction";


const ProtectedRoute = ({children}) => {
    const dispatch=useDispatch();
    const login = useSelector((state) => state.auth.isLoading);
    const route=useRouter();
    useEffect(() => {
      dispatch(listentoAuthChanges());
    }, [dispatch]);
    const [IsLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const checkLogin=async()=>{
        if (login === "noLogged") {
          route.replace("/login");

          setTimeout(() => {
              setIsLoading(false);
          }, 1000);
        } 
        else if(login === "logged"){
            setIsLoading(false)
        }
        
    }
    checkLogin();
    },[login])

  return <>{IsLoading ? <>Loading</> : <>{children}</>}</>;
}

export default ProtectedRoute;