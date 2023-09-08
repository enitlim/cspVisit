"use client";
import TopNavBar from "@/app/CommonComponents/topNavBar";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../firebase/SettingFirebase";
import { getDoc, doc } from "firebase/firestore";

const CspParameter = () => {
  const [parameter, setParameter] = useState([]);
  useEffect(() => {
    const getPara = async () => {
      try {
        const snapshot = await getDoc(
          doc(
            db,
            "observational_parameters_collection",
            "observational_parameters_document"
          )
        );
        if (snapshot.exists()) {
          setParameter([...parameter,snapshot.data()]);
        } else {
          console.log("Not found");
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };
    getPara();
  }, []);
  return (
    <>
      <TopNavBar header="CSP Parameter" />
      {/* {JSON.stringify(parameter)} */}
      {parameter.map((parameter, index)=>{
        Object.keys(parameter).map((value, index)=>(
          <>
          {value}
          </>
        ))
      })}
    </>
  );
};

export default CspParameter;
