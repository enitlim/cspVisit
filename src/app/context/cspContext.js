"use client"
import React, {createContext, useState, useEffect} from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase/SettingFirebase";
import { query, getDocs, collection, where } from "firebase/firestore";


const CspContext=createContext();
const CspProvider = ({children}) => {
    const [login, setlogin] = useState("loading");
    const [currentUser, setcurrentUser] = useState("");
    const [userID, setuserID] = useState("");
    // console.log(login)
    // console.log("loginID: " + userID);
    useEffect(() => {
            const unsub = onAuthStateChanged(auth, (user) => {
              if (user) {
                setlogin("logged");
                setuserID(user.email.split("@")[0]);
              } else {
                setlogin("notlogged");
              }
            }); 
            return () => unsub();      
    },[login]);

    useEffect(() => {
      if (userID.length > 0) {
        console.log("User ID after await=>", userID);
        getCurrentUser();
      }
    }, [userID]);
    

     const getCurrentUser=async()=>{
        const q = query(
          collection(db, "employee_details_collection"),
          where("emp_id", "==", userID)
        );
        const querySnapshot=await getDocs(q)
        console.log("Data Fetched");
        if(querySnapshot.docs.length>0){
            const results= await Promise.all(querySnapshot.docs.map(data => {
                return data.data()
            }))
            setcurrentUser(results);
        }
    }
  return (
    <CspContext.Provider value={{login, currentUser}}>
        {children}
    </CspContext.Provider>
  )
}

export {CspContext, CspProvider};